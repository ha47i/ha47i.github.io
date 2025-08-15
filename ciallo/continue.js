// 获取地址栏中的各参数值
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// 文本文件跳转模块
function txtfilego() {
  // 获取文件名
  // var txtname = getUrlParameter('source');
  var a = getUrlParameter('code');
  // 使用 split 方法分割字符串
  var parts = a.split('.');
  // 提取第1部分和第3部分
  var txtname = parts[0]; // 第1部分
  var tocode = parts[1]; // 第3部分
  // 定义路径
  var txturl = 'https://ha47i.github.io/ciallo-href/sourcetxts/' + txtname + '.txt';
  // 生成一个随机数作为查询参数
  var randomParam = '?' + Math.random().toString(36).substring(7);
  // 获取跳转码
  // var tocode = getUrlParameter('to');
  // 处理txt文本文件
  fetch(txturl + randomParam)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      // 将每行文本分割成数组
      var lines = data.split('\n');
      var found = false; // 用于标记是否找到匹配的行
      var redirectUrl = "./err/coderr.html"; // 默认跳转地址
      // 遍历每行
      for (var i = 0; i < lines.length; i++) {
        // 去掉行首尾空格并检查空行
        var line = lines[i].trim();
        if (line === '') continue; // 跳过空行
        // 分割每行的内容和网址
        var parts = line.split(' ');
        if (parts.length < 2) continue; // 确保有足够的部分
        var content = parts[0].toLowerCase();
        var url = parts[1];
        // 找到匹配的行并设置跳转链接
        if (content === tocode) {
          redirectUrl = url;
          found = true;
          break; // 找到后可以跳出循环
        }
      }
      // 跳转到找到的链接或默认链接
      window.location.href = redirectUrl;
    })
    .catch(error => {
      console.error('Fetch error:', error);
      window.location.href = "./err/coderr.html"; // 错误处理时跳转
    });
}

// 反馈提示
function change() {
  document.getElementById("press").innerHTML = '<svg class="aarrow" viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" fill="#0080ff"/></svg>函数运行中...';
}

// 点击跳转
document.getElementById('press').addEventListener('click', function() {
  txtfilego();
  change();
});
