const textElement = document.getElementById('text');
const cursorElement = document.getElementById('cursor');
const texts = ["＊你好吖～", "*还在读取哦", "Ciallo～(∠・ω<)⌒★"];
let index = 0;

function type(text, callback) {
    let charIndex = 0;
    textElement.textContent = '';
    cursorElement.style.display = 'inline'; // 显示光标
    const typingInterval = setInterval(() => {
        if (charIndex < text.length) {
            textElement.textContent += text.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typingInterval);
            setTimeout(callback, 2000); // 等待2秒后调用下一个文本
        }
    }, 150); // 调整打字速度
}

function deleteText(callback) {
    let charIndex = textElement.textContent.length;
    const deletingInterval = setInterval(() => {
        if (charIndex > 0) {
            textElement.textContent = textElement.textContent.slice(0, charIndex - 1);
            charIndex--;
        } else {
            clearInterval(deletingInterval);
            setTimeout(callback, 1000); // 等待500毫秒后开始下一个文本
        }
    }, 80); // 删除速度
}

function startTyping() {
    if (index < texts.length) {
        type(texts[index], () => {
            index++;
            if (index < texts.length) {
                deleteText(() => startTyping());
            } else {
                cursorElement.style.display = 'none'; // 在所有文本输入完后隐藏光标
                typedone();
            }
        });
    }
}

// 启动打字效果
// startTyping();
setTimeout(startTyping, 500)