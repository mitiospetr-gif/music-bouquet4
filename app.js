// ============================
// 🔐 СЖАТИЕ ДАННЫХ
// ============================

function compress(data) {
    const clean = {};

    // короткие ключи
    if (data.title) clean.t = data.title;
    if (data.author) clean.a = data.author;
    if (data.youtube) clean.y = data.youtube;
    if (data.yandex) clean.m = data.yandex;
    if (data.image) clean.i = data.image;
    if (data.text) clean.x = data.text;

    return clean;
}

function encode(data) {
    const json = JSON.stringify(data);
    return btoa(encodeURIComponent(json))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function decode(str) {
    const pad = '='.repeat((4 - str.length % 4) % 4);
    const base64 = (str + pad).replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(atob(base64)));
}

// ============================
// 🔗 СОЗДАНИЕ ССЫЛКИ
// ============================

function createShareLink(data) {
    const compressed = compress(data);
    const encoded = encode(compressed);
    return `${location.origin}/gift.html#${encoded}`;
}

// ============================
// 📥 ЗАГРУЗКА ПОДАРКА
// ============================

function loadGift() {
    const hash = location.hash.slice(1);
    if (!hash) return;

    const data = decode(hash);

    document.getElementById('greetingText').textContent = data.x || '';
    document.getElementById('trackName').textContent = data.t || '';
    document.getElementById('authorText').textContent = data.a ? `— ${data.a}` : '';

    // картинка
    if (data.i) {
        document.getElementById('bouquetImage').src = data.i;
    }

    // ссылки
    const yt = document.getElementById('youtubeBtn');
    const ym = document.getElementById('yandexBtn');

    if (data.y) {
        yt.href = data.y;
        yt.style.display = 'inline-flex';
    } else {
        yt.style.display = 'none';
    }

    if (data.m) {
        ym.href = data.m;
        ym.style.display = 'inline-flex';
    } else {
        ym.style.display = 'none';
    }
}

// запуск
loadGift();
