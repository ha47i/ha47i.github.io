// 执行指令
function script() {}

function nav() {
    document.getElementById('navbox').classList.toggle('box-hide');
    document.getElementById('box-overlay-onff').classList.toggle('box-overlay-hide');
}

function scroll_down_wallpaper() {
    window.scrollTo(0, window.innerHeight);
}

function scroll_up_top() {
    window.scrollTo(0, 0);
}

function scroll_to_works() {
    document.getElementById('work').scrollIntoView();
}

// 元素点击（事件监听器）
document.getElementById('box-close-btn-js').addEventListener('click', nav);

document.getElementById('box-list-txt-1').addEventListener('click', () => { scroll_up_top(); setTimeout(nav, 300); });
document.getElementById('box-list-txt-2').addEventListener('click', () => { scroll_down_wallpaper(); setTimeout(nav, 300); });
document.getElementById('box-list-txt-3').addEventListener('click', () => { scroll_to_works(); setTimeout(nav, 300); });
document.getElementById('box-list-txt-4').addEventListener('click', () => { script(); setTimeout(nav, 300); });

document.getElementById('nav-list-txt-1').addEventListener('click', () => { scroll_up_top(); });
document.getElementById('nav-list-txt-2').addEventListener('click', () => { scroll_down_wallpaper(); });
document.getElementById('nav-list-txt-3').addEventListener('click', () => { scroll_to_works(); });
document.getElementById('nav-list-txt-4').addEventListener('click', () => { script(); });

document.getElementById('box-open').addEventListener('click', nav);
document.getElementById('box-overlay-onff').addEventListener('click', nav);
document.getElementById('scroll-down-wrapper').addEventListener('click', scroll_down_wallpaper);

// 巨型监听器
window.addEventListener("scroll", function(){
    let contextheight = window.innerHeight - 50;
    if(window.scrollY > contextheight){
        document.getElementById("welcome").classList.add("welcome-hide");
        document.getElementById("nav-bar").classList.add("nav-bar-blur");
        document.getElementById("nav-link-logo-id").classList.add("nav-link-logo-blur");
        document.getElementById("nav-logo-container").classList.add("nav-link-logo-blur");
        document.getElementById("nav-link-container").classList.add("nav-link-all-blur");
        document.getElementById("box-open").classList.add("btn-menu-blur");
        document.getElementById('nav-link-container').querySelectorAll('*').forEach(element => element.classList.add('nav-link-blur'));
    } else {
        document.getElementById("welcome").classList.remove("welcome-hide");
        document.getElementById("nav-bar").classList.remove("nav-bar-blur");
        document.getElementById("nav-link-logo-id").classList.remove("nav-link-logo-blur");
        document.getElementById("nav-logo-container").classList.remove("nav-link-logo-blur");
        document.getElementById("nav-link-container").classList.remove("nav-link-all-blur");
        document.getElementById("box-open").classList.remove("btn-menu-blur");
        document.getElementById('nav-link-container').querySelectorAll('*').forEach(element => element.classList.remove('nav-link-blur'));
    }
});

// 自动执行
setTimeout(function() {document.getElementById('page-bg').classList.add('page-bg-on');}, 100);
