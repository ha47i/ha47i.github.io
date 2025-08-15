// https://ha47i.github.io/ciallo/index.html?64=
var vv = './../index.html';
var vo = 'x';
var vc = 'x';
var v64code = 'x';
var v64 = '';
var vcode1 = 'x';
var vcode2 = 'x';
function o() {
	document.getElementById("qo").innerText = "请选择暗色模式背景：o";
	vo = 'n';
}
function oy() {
	document.getElementById("qo").innerText = "请选择暗色模式背景：oy";
	vo = 'y';
}
function c() {
	document.getElementById("qc").innerText = "请选择输入光标样式：c";
	vc = 'n';
}
function ci() {
	document.getElementById("qc").innerText = "请选择输入光标样式：ci";
	vc = 'y';
}
function b64() {
	document.getElementById("q64code").innerText = "请选择目标地址格式：64";
	v64code = '64';
	var element1 = document.getElementById("css64");
	element1.style.display = "block";
	var element2 = document.getElementById("csscode");
	element2.style.display = "none";
}
function code() {
	document.getElementById("q64code").innerText = "请选择目标地址格式：code";
	v64code = 'code';
	var element1 = document.getElementById("css64");
	element1.style.display = "none";
	var element2 = document.getElementById("csscode");
	element2.style.display = "block";
}
function b64y() {
	v64 = document.getElementById('641').value;
}
function codey() {
	vcode1 = document.getElementById('code1').value;
	vcode2 = document.getElementById('code2').value;
}

function encodeText() {
	var inputText = v64;
	var encodedText = btoa(inputText); // Base64 编码
	var prefixedText = vv + "?64=" + encodedText; // 添加前缀
	if (vo === 'y') {
		prefixedText += "&oy";
	}
	if (vc === 'y') {
		prefixedText += "&ci";
	}
	document.getElementById('rv1').innerText = prefixedText;
	document.getElementById('rv2').innerText = prefixedText;
}
function codego() {
	var inputText1 = vcode1;
	var inputText2 = vcode2;
	var prefixedText2 = vv + "?to=" + inputText1 + "." + inputText2; // 添加前缀
	if (vo === 'y') {
		prefixedText2 += "&oy";
	}
	if (vc === 'y') {
		prefixedText2 += "&ci";
	}
	document.getElementById('rv1').innerText = prefixedText2;
	document.getElementById('rv2').innerText = prefixedText2;
}
function nothing() {
	var prefixedText3 = vv
	if (vo === 'y') {
		prefixedText3 += "&oy";
	}
	if (vc === 'y') {
		prefixedText3 += "&ci";
	}
	document.getElementById('rv1').innerText = prefixedText3;
	document.getElementById('rv2').innerText = prefixedText3;
}
function start() {
	// document.getElementById("qstart").innerText = "制作中转页：" + vo + vc + v64code + v64 + vcode1 + vcode2;
	if (v64code === '64') {
		encodeText();
	} else {
		if (v64code === 'code') {
			codego();
		} else {
			nothing();
		}
	}
}
function copyText() {
    var textField = document.getElementById("rv1");
    textField.select();
    document.execCommand("copy");
    document.getElementById("copyb").innerText = "--「复制成功」--";
    setTimeout(function() {
        document.getElementById("copyb").innerText = "复制文本";
    }, 1500);
}
function lhref() {
	var lhref = document.getElementById("rv2").innerText;
	window.open(lhref, '_blank');
}