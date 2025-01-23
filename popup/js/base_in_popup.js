const clickButton = document.getElementById("clickButton");

// 按钮点击事件，发送消息给父页面
clickButton.onclick = function() {
	// 获取popuphref元素的内容（即要打开的链接）
	const targetUrl = document.getElementById("popuphref").textContent;

	// 获取当前 iframe 的 popupId（通过 URL 参数传递）
	const urlParams = new URLSearchParams(window.location.search);
	const popupId = urlParams.get("popupId");

	// 发送消息给父页面，要求打开新弹窗，并传递目标链接
	parent.postMessage({
		action: "openPopupWithUrl",
		popupId: parseInt(popupId, 10) + 1,  // 新弹窗ID（递增）
		targetUrl: targetUrl  // 传递目标链接
	}, window.location.origin);
};