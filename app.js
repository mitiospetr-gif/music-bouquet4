
// ==========================
// 🔗 BASE ENCODE / DECODE
// ==========================

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

// ==========================
// 💐 CREATE SHARE DATA
// ==========================

function createShareLink(data) {
    const clean = {};

    if (data.title) clean.t = data.title;
    if (data.author) clean.a = data.author;
    if (data.text) clean.x = data.text;
    if (data.youtube) clean.y = data.youtube;
    if (data.yandex) clean.m = data.yandex;
    if (data.image) clean.i = data.image; // bouquet id

    const encoded = encode(clean);

    return location.origin + "/gift.html#" + encoded;
}

// ==========================
// 🎁 LOAD GIFT PAGE
// ==========================

function loadGift() {
    const hash = location.hash.slice(1);
    if (!hash) return;

    const data = decode(hash);

    const el = (id) => document.getElementById(id);

    if (el("greetingText")) el("greetingText").textContent = data.x || "";
    if (el("trackName")) el("trackName").textContent = data.t || "";
    if (el("authorText")) el("authorText").textContent = data.a || "";

    // 💐 bouquet image FIX
    if (data.i && el("bouquetImage")) {
        el("bouquetImage").src = `images/bouquets/${data.i}.webp`;
    }

    // 🔗 links
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

// ==========================
// 🚀 INIT
// ==========================

window.addEventListener("load", loadGift);
