// ============================
// 🌸 COMPRESSION (short links)
// ============================

function compress(data) {
    const c = {};

    if (data.title) c.t = data.title;
    if (data.author) c.a = data.author;
    if (data.youtube) c.y = data.youtube;
    if (data.yandex) c.m = data.yandex;
    if (data.image) c.i = data.image;
    if (data.text) c.x = data.text;

    return c;
}

function encode(data) {
    return btoa(encodeURIComponent(JSON.stringify(data)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function decode(str) {
    const pad = '='.repeat((4 - str.length % 4) % 4);
    return JSON.parse(
        decodeURIComponent(
            atob((str + pad).replace(/-/g, '+').replace(/_/g, '/'))
        )
    );
}

// ============================
// 🔗 CREATE LINK
// ============================

function createShareLink(data) {
    const clean = compress(data);
    const encoded = encode(clean);
    return `${location.origin}/gift.html#${encoded}`;
}

// ============================
// 🎁 LOAD GIFT PAGE
// ============================

function loadGift() {
    const hash = location.hash.slice(1);
    if (!hash) return;

    const data = decode(hash);

    const el = (id) => document.getElementById(id);

    if (el("greetingText")) el("greetingText").textContent = data.x || "";
    if (el("trackName")) el("trackName").textContent = data.t || "";
    if (el("authorText")) el("authorText").textContent = data.a || "";

    if (data.i && el("bouquetImage")) {
        el("bouquetImage").src = data.i;
    }

    const yt = el("youtubeBtn");
    const ym = el("yandexBtn");

    if (yt) {
        if (data.y) yt.href = data.y;
        else yt.style.display = "none";
    }

    if (ym) {
        if (data.m) ym.href = data.m;
        else ym.style.display = "none";
    }
}

window.addEventListener("load", loadGift);
