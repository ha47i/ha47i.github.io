// 检查系统的主题设置
function applyThemeBasedOnPreference() {
	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
	if (prefersDarkScheme) {
		document.documentElement.classList.add('dark');
		document.getElementById("box-li-text-current-theme").classList.add('current-dark');
		document.getElementById("nav-li-current-theme").classList.add('current-dark-b');
	} else {
		document.documentElement.classList.remove('dark');
		document.getElementById("box-li-text-current-theme").classList.remove('current-dark');
		document.getElementById("nav-li-current-theme").classList.remove('current-dark-b');
	}
}

function btnchange() {
	document.documentElement.classList.toggle('dark');
	document.getElementById("box-li-text-current-theme").classList.toggle('current-dark');
	document.getElementById("nav-li-current-theme").classList.toggle('current-dark-b');
}

// 切换主题的按钮点击事件
document.getElementById('toggle-theme').addEventListener('click', btnchange);
document.getElementById('nav-li-current-theme').addEventListener('click', btnchange);

// 初始加载时应用系统主题
applyThemeBasedOnPreference();

// 监听主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyThemeBasedOnPreference);