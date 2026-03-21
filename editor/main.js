let currentItems = [];
let editingIndex = -1;
let isNewMode = false;  // 标记是否为新增模式

const DATA_URL = "https://luckyy.qzz.io/TextsDataBase/ulrgo/values.json";
const WRITE_API = "https://gh-editor.luckyy.qzz.io/write";
const TARGET_FILE = "ulrgo/values.json";

const cardsGrid = document.getElementById('cardsGrid');
const refreshBtn = document.getElementById('refreshBtn');
const uploadBtn = document.getElementById('uploadBtn');
const apiKeyInput = document.getElementById('apiKeyInput');
const rememberKeyCheckbox = document.getElementById('rememberKeyCheckbox');
const liveStatusSpan = document.getElementById('liveStatus');    const globalMsgDiv = document.querySelector('#globalMessageContainer .global-message');
const themeToggleBtn = document.getElementById('themeToggleBtn');

const modal = document.getElementById('editModal');
const editNameInput = document.getElementById('editName');
const editValueInput = document.getElementById('editValue');
const editNoteTextarea = document.getElementById('editNote');
const saveModalBtn = document.getElementById('saveModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const modalErrorDiv = document.getElementById('modalError');
const nameErrorDiv = document.getElementById('nameError');
const valueErrorDiv = document.getElementById('valueError');

function showMessage(msg, isError = false) {
    if (globalMsgDiv) {
        globalMsgDiv.innerHTML = isError ? `⚠️ ${msg}` : `✓ ${msg}`;
        globalMsgDiv.style.background = isError ? 'rgba(220,107,92,0.2)' : 'rgba(112,192,0,0.15)';
        setTimeout(() => {
            if (globalMsgDiv.innerHTML === `✓ ${msg}` || globalMsgDiv.innerHTML === `⚠️ ${msg}`) {
                globalMsgDiv.innerHTML = `✨ 点击卡片编辑内容，然后上传保存`;
                globalMsgDiv.style.background = '';
            }
        }, 3200);
    }
    liveStatusSpan.innerHTML = isError ? `❌ ${msg.substring(0, 30)}` : `✔️ ${msg.substring(0, 30)}`;
    if (!isError) {
        setTimeout(() => {
            if (liveStatusSpan.innerHTML.includes(msg.substring(0,30))) liveStatusSpan.innerHTML = `💬 可以开始编辑了～`;
        }, 2800);
    }
}

function showLoading(loading = true) {
    liveStatusSpan.innerHTML = loading ? `<span class="loading-spinner"></span> 处理中...` : `💬 可以开始编辑了～`;
}

function normalizeNote(value) {
    if (value === undefined || value === null || value === "null" || value === "") return null;
    return String(value).trim() === "" ? null : String(value);
}

const trashIcon = `<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;

function renderCards() {
    if (!cardsGrid) return;
    cardsGrid.innerHTML = '';

    // 新增卡片
    const addCard = document.createElement('div');
    addCard.className = 'card add-card';        addCard.innerHTML = `<div class="add-content"><span>+</span><span>新增条目</span></div>`;
    addCard.addEventListener('click', () => {
        // ★ 新增模式：不立即添加条目，仅打开弹窗
        editingIndex = -1;
        isNewMode = true;
        openModalForEditing(-1);
    });
    cardsGrid.appendChild(addCard);

    // 普通卡片
    currentItems.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        const displayName = item.name?.trim() ? item.name : "未命名";
        const valueText = item.value || "";
        const isValueEmpty = valueText === "";
        const noteValue = normalizeNote(item.note);
        const hasNote = noteValue && noteValue.trim() !== "";

        card.innerHTML = `
            <div class="card-header">
                <div class="card-name">${escapeHtml(displayName)}</div>
                <button class="delete-btn-card" data-idx="${idx}" title="删除">${trashIcon}</button>
            </div>
            <div class="card-value" title="${escapeHtml(valueText)}">
                ${isValueEmpty ? '<span style="opacity:0.5;">— 无值 —</span>' : escapeHtml(truncateMiddle(valueText, 60))}
            </div>
            <div class="card-note" title="${hasNote ? escapeHtml(noteValue) : ''}">
                <span class="note-label">备注：</span>
                ${hasNote ? escapeHtml(noteValue) : '<span class="empty-note">无备注</span>'}
            </div>
        `;
        card.addEventListener('click', (e) => {
            if (e.target.closest('.delete-btn-card')) return;
            editingIndex = idx;
            isNewMode = false;
            openModalForEditing(idx);
        });
        card.querySelector('.delete-btn-card').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`确定删除"${displayName}"吗？`)) {
                currentItems.splice(idx, 1);
                renderCards();
                showMessage(`已删除条目`, false);
            }
        });
        cardsGrid.appendChild(card);
    });
}
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => ({'&':'&','<':'<','>':'>'}[m]));
}

function truncateMiddle(str, maxLen) {
    if (!str || str.length <= maxLen) return str;
    return str.slice(0, maxLen/2) + '…' + str.slice(-maxLen/2);
}

// ★ 打开弹窗：新增模式清空，编辑模式填充
function openModalForEditing(index) {
    clearErrors();
    if (index === -1) {
        // 新增模式
        editNameInput.value = '';
        editValueInput.value = '';
        editNoteTextarea.value = '';
        document.getElementById('modalTitle').textContent = '新增条目';
    } else {
        // 编辑模式
        const item = currentItems[index];
        if (!item) return;
        editNameInput.value = item.name ?? '';
        editValueInput.value = item.value ?? '';
        editNoteTextarea.value = (item.note === null || item.note === "null") ? "" : (item.note ?? "");
        document.getElementById('modalTitle').textContent = '编辑条目';
    }
    modal.classList.add('active');
    // 聚焦第一个必填项
    setTimeout(() => editNameInput.focus(), 100);
}

// ★ 清除所有错误提示
function clearErrors() {
    modalErrorDiv.classList.remove('show');
    modalErrorDiv.textContent = '';
    nameErrorDiv.classList.remove('show');
    nameErrorDiv.textContent = '';
    valueErrorDiv.classList.remove('show');
    valueErrorDiv.textContent = '';
    editNameInput.classList.remove('error');
    editValueInput.classList.remove('error');
}

// ★ 显示输入框错误
function showFieldError(inputEl, errorEl, message) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
    inputEl.classList.add('error');        inputEl.focus();
}

// ★ 保存校验：name 和 value 均为必填
function saveCurrentEdit() {
    clearErrors();
    
    const newName = editNameInput.value.trim();
    const newValue = editValueInput.value.trim();
    const newNote = editNoteTextarea.value.trim();
    
    let hasError = false;
    
    // 校验名称
    if (!newName) {
        showFieldError(editNameInput, nameErrorDiv, '名称为必填项');
        hasError = true;
    }
    // 校验值
    if (!newValue) {
        showFieldError(editValueInput, valueErrorDiv, '值为必填项');
        hasError = true;
    }
    
    // ★ 任一校验失败：显示顶部提示 + 阻止保存 + 不修改数据
    if (hasError) {
        modalErrorDiv.textContent = '请填写所有必填字段（带＊号）';
        modalErrorDiv.classList.add('show');
        return;  // 关键：不执行任何数据写入
    }
    
    const finalNote = newNote === "" ? null : newNote;
    
    if (isNewMode) {
        // ★ 新增模式：校验通过后才添加条目
        currentItems.push({ name: newName, value: newValue, note: finalNote });
    } else {
        // 编辑模式：更新现有条目
        if (editingIndex < 0 || editingIndex >= currentItems.length) {
            closeModal();
            return;
        }
        currentItems[editingIndex] = { name: newName, value: newValue, note: finalNote };
    }
    
    closeModal();
    renderCards();
    showMessage("修改已保存 (未上传)", false);
}
function closeModal() {
    modal.classList.remove('active');
    clearErrors();
    editingIndex = -1;
    isNewMode = false;
}

async function loadFromRemote() {
    showLoading(true);
    try {
        // ★ 简洁缓存破坏：仅添加时间戳，避免触发 CORS 预检
        const separator = DATA_URL.includes('?') ? '&' : '?';
        const cacheBustedUrl = `${DATA_URL}${separator}_t=${Date.now()}`;
        
        const resp = await fetch(cacheBustedUrl);  // ★ 不移除自定义头部，避免预检
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        let data = await resp.json();
        if (!Array.isArray(data)) throw new Error('数据格式不是数组');
        currentItems = data.map(item => ({
            name: item.name != null ? String(item.name) : "",
            value: item.value != null ? String(item.value) : "",
            note: normalizeNote(item.note)
        }));
        renderCards();
        showMessage(`加载成功，共 ${currentItems.length} 条`, false);
    } catch (err) {
        console.error('加载异常:', err);
        showMessage(`加载失败: ${err.message}`, true);
        currentItems = [];
        renderCards();
    } finally {
        showLoading(false);
    }
}

async function handleRefresh() {
    if (currentItems.length > 0 && !confirm("重新加载将覆盖本地未保存的更改，确定继续？")) return;
    await loadFromRemote();  // ★ 仅调用修复后的加载函数
}

async function uploadData() {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
        showMessage("请填写 API Key", true);
        apiKeyInput.focus();
        return;
    }
    if (rememberKeyCheckbox.checked) {
        localStorage.setItem('saved_api_key', apiKey);
    } else {
        localStorage.removeItem('saved_api_key');
    }
    const payload = { file: TARGET_FILE, content: JSON.stringify(currentItems, null, 2) };
    showLoading(true);        try {
        const response = await fetch(WRITE_API, {
            method: 'POST',
            headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        let result;
        const ct = response.headers.get('content-type');
        if (ct?.includes('application/json')) result = await response.json();
        else result = await response.text();
        if (!response.ok) throw new Error(`上传失败 (${response.status}): ${JSON.stringify(result)}`);
        showMessage(`上传成功！已同步 ${currentItems.length} 条数据`, false);
    } catch (err) {
        console.error(err);
        showMessage(`上传出错: ${err.message}`, true);
    } finally {
        showLoading(false);
    }
}

function initApiStorage() {
    const saved = localStorage.getItem('saved_api_key');
    if (saved) {
        apiKeyInput.value = saved;
        rememberKeyCheckbox.checked = true;
    }
    rememberKeyCheckbox.addEventListener('change', (e) => {
        if (!e.target.checked) localStorage.removeItem('saved_api_key');
        else if (apiKeyInput.value.trim()) localStorage.setItem('saved_api_key', apiKeyInput.value.trim());
    });
    apiKeyInput.addEventListener('input', () => {
        if (rememberKeyCheckbox.checked) {
            const val = apiKeyInput.value.trim();
            val ? localStorage.setItem('saved_api_key', val) : localStorage.removeItem('saved_api_key');
        }
    });
}

function initTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeToggleBtn.innerHTML = '🔆 浅色模式';
    }
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggleBtn.innerHTML = isDark ? '🔆 浅色模式' : '🌕 深色模式';
    });
}
function bindGlobalEvents() {
    refreshBtn.addEventListener('click', handleRefresh);
    uploadBtn.addEventListener('click', uploadData);
    saveModalBtn.addEventListener('click', saveCurrentEdit);
    cancelModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    // 回车保存
    editNameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveCurrentEdit(); });
    editValueInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveCurrentEdit(); });
    // ESC 取消
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}

async function init() {
    initApiStorage();
    initTheme();
    bindGlobalEvents();
    await loadFromRemote();
}

init();
