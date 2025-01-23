// 弹窗链接定义方法 <div id="按钮id+v" style="display:none;">链接</div>

// 按钮点击时，创建弹窗
btn01.onclick = function() {
    popupCount++;
    openPopupWithUrl(popupCount, document.getElementById("btn01v").textContent);
};

btn02.onclick = function() {
    popupCount++;
    openPopupWithUrl(popupCount, document.getElementById("btn02v").textContent);
};
