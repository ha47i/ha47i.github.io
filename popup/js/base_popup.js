// 弹窗相关逻辑
// const openIframeBtn = document.getElementById("openIframeBtn");
const popupContainer = document.getElementById("popupContainer");
let popupCount = 0; // 弹窗的计数器

// 监听来自 iframe 的消息
window.addEventListener("message", function(event) {
    // 安全性检查：确保消息来自合法的iframe
    if (event.origin !== window.location.origin) return;

    const data = event.data;

    // 如果是请求打开新弹窗的消息
    if (data.action === "openPopupWithUrl") {
        openPopupWithUrl(data.popupId, data.targetUrl);
    }
});

// 关闭弹窗的函数
function closePopup(popupIdSuffix) {
    const popupOverlay = document.getElementById(`popupOverlay-${popupIdSuffix}`);
    const popupContent = document.getElementById(`popupContent-${popupIdSuffix}`);

    // 添加 hide 类，触发关闭时的动画
    popupContent.classList.add("hide");

    popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';

    // 监听关闭动画完成后，再从 DOM 中移除元素
    popupContent.addEventListener("transitionend", function() {
        // 移除动画类
        popupContent.classList.remove("show", "hide");
        
        // 隐藏弹窗遮罩并移除 DOM
        popupOverlay.style.display = "none";
        popupOverlay.remove();
    }, { once: true }); // 确保只执行一次事件

}

// 打开弹窗的函数（基于目标链接）
function openPopupWithUrl(popupId, targetUrl) {
    // 生成唯一的弹窗ID
    const popupIdSuffix = popupId || ++popupCount;
    const popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popup-overlay");
    popupOverlay.id = `popupOverlay-${popupIdSuffix}`;

    const popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");
    popupContent.id = `popupContent-${popupIdSuffix}`;

    // 创建 iframe，加载指定的链接
    const iframe = document.createElement("iframe");
    iframe.classList.add("popup-iframe");
    iframe.src = targetUrl; // 使用从 iframe 页面传递来的 targetUrl
    popupContent.appendChild(iframe);

    popupOverlay.appendChild(popupContent);
    popupContainer.appendChild(popupOverlay);

    // 点击遮罩区域关闭弹窗
    popupOverlay.onclick = function(e) {
        // 如果点击的是遮罩层（即非弹窗内容部分），关闭弹窗
        if (e.target === popupOverlay) {
            closePopup(popupIdSuffix);
        }
    };

    // 显示弹窗并添加动画效果
    setTimeout(() => {
        popupContent.classList.add("show");
        // 显示遮罩层并过渡到半透明背景
        popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    }, 10); // 在 DOM 更新后稍微延迟，触发动画

    // 弹窗显示
    popupOverlay.style.display = "block";
}
