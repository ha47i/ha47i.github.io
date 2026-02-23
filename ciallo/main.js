// 获取地址栏中的各参数值
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Base64解码模块
function decodeBase64(content) {
  try {
    return atob(content);
  } catch (e) {
    console.error('解码失败:', e);
    return '';
  }
}

// base64跳转模块
function base64go() {
  var targetvalue = getUrlParameter('64');
  // 解码base64内容
  targetvalue2 = decodeBase64(targetvalue);
  // 解码失败?
  if (targetvalue2 === '') {
    targetvalue2 = './err/64err.html';
  }
  window.location.href = targetvalue2;
}

// 转发模块
function step2() {
  var tovalue = getUrlParameter('to');
  window.location.href = "./continue.html?code=" + tovalue
}

// 链接源判定（a为转发值，b为base64值，有值=非空）
function go() {
  var a = getUrlParameter('to');
  var b = getUrlParameter('64');
  if (a && !b) {
    // 只有 a 有值
    step2();
  } else if (!a && b) {
    // 只有 b 有值
    base64go();
  } else if (a && b) {
    // a 和 b 都有值
    window.location.href = "./err/berr.html";
  } else {
    // a 和 b 都无值
    window.location.href = "./err/aerr.html";
  }
}

// 主动跳转
document.getElementById('typewriter').addEventListener('click', function() {
    go();
});

// 被动跳转
function typedone() {
  setTimeout("go()",500);
}

// 纯黑背景与光标样式判定
// 获取当前页面地址
var currentURL = window.location.href;
// 检测地址中是否包含 &oy
if (currentURL.indexOf('&o') !== -1) {
  document.getElementById('darkmode').href = 'darklightOLED.css';
} else {
  // 否则什么都不做
}
// 检测地址中是否包含 &ci
if (currentURL.indexOf('&ci') !== -1) {
  document.getElementById('cursor').innerText = '|';
} else {
  // 否则什么都不做
}

// // 纯黑背景判定
// var oledvalue = getUrlParameter('o');
// if (oledvalue === 'y') {
  // document.getElementById('darkmode').href = 'darklightOLED.css';
// }

// // 光标样式判定（吾知其愚也，而仅三层无性能之损也。）
// var cvalue = getUrlParameter('c');
// if (cvalue === 'i') {
  // document.getElementById('cursor').innerText = '|';
// } else {
  // if (cvalue === 'ii') {
    // document.getElementById('cursor').innerText = 'i';
  // } else {
    // if (cvalue === '') {
    // } else {
      // document.getElementById('cursor').innerText = cvalue;
    // }
  // }
// }

// // ?oled=y&cursor=i&source=&to=g