function astart(){
    setTimeout('document.getElementById("atext").innerText = "获取信息&样式......";',300);
    setTimeout('document.getElementById("atext").innerText = "填装样式：页面背景";',600);
    setTimeout("i01()",900);
}

function i01(){
    document.getElementById("aib").className = "aib_";
    document.getElementById("apage").className = "apage_1";
    setTimeout('document.getElementById("atext").innerText = "填装样式：全局字体&样式";',400);
    setTimeout("b01()",600);
}

function b01(){
    document.getElementById("apage").className = "apage_2";
    setTimeout("b02()",90);
}

function b02(){
    document.getElementById("apage").className = "apage_3";
    setTimeout('document.getElementById("atext").innerText = "填装样式：整体布局";',400);
    setTimeout("i02()",700);
}

function i02(){
    document.getElementById("abody").className = "abody01_";
    imageElement.src = "./../icons/14.svg";
    setTimeout("i03()",200);
}

function i03(){
    document.getElementById("abody").className = "abody02_";
    setTimeout('document.getElementById("atext").innerText = "填装样式：链接 Links";',400);
    setTimeout("a01()",700);
}

function a01(){
    document.getElementById("ahref1").className = "ahref_1";
    setTimeout("a02()",300);
}

function a02(){
    document.getElementById("ahref1").className = "ahref_2";
    document.getElementById("go1").className = "ago_1";
    setTimeout('document.getElementById("atext").innerText = "填装样式：标题 Title";',400);
    setTimeout("i04()",400);
}

function i04(){
    document.getElementById("ah3").className = "ah3_1";
    setTimeout("i05()",200);
}

function i05(){
    document.getElementById("ah3").className = "ah3_2";
    setTimeout("i06()",200);
}

function i06(){
    document.getElementById("ah3").className = "ah3_3";
    setTimeout("i07()",200);
}

function i07(){
    document.getElementById("ah3").className = "ah3_4";
    imageElement.src = "./../icons/24.svg";
    setTimeout("e01()",200);
}

function e01(){
    document.getElementById("ah3").className = "ah3_5";
    setTimeout('document.getElementById("atext").innerText = "标题内容覆写......";',200);
    setTimeout("e02()",400);
}

function e02(){
    document.getElementById("atitle").innerHTML = '<h3 id="ah3" class="ah3_5"><img src="./../icon.svg" class="aicon">IceLiuliの小站.</h3>';
    setTimeout('document.getElementById("atext").innerText = "填装样式：分界线 Line";',400);
    setTimeout("i08()",800);
}

function i08(){
    document.getElementById("ahr").style.display = "block";
    imageElement.src = "./../icons/34.svg";
    setTimeout("i09()",400);
}

function i09(){
    document.getElementById("ahr").className = "ahr_";
    setTimeout('document.getElementById("atext").innerText = "然后署名......";',300);
    setTimeout("i15()",600);
}

function i15(){
    document.getElementById("aby1").className = "aby_n";
    setTimeout("i16()",200);
}

function i16(){
    document.getElementById("aby2").className = "aby_n";
    setTimeout("i17()",400);
}

function i17(){
    document.getElementById("aby3").className = "aby_n";
    imageElement.src = "./../icons/44.svg";
    setTimeout('document.getElementById("atext").innerText = "完成! 🥳 3s后重载页面......";',500);
    setTimeout("aurl()",500);
}