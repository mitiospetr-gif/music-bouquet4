// ============================
// 🌸 БУКЕТЫ
// ============================

const bouquets = [
    {
        id: "roses",
        name: "🌹 Розы",
        img: "assets/roses.jpg"
    },
    {
        id: "tulips",
        name: "🌷 Тюльпаны",
        img: "assets/tulips.jpg"
    },
    {
        id: "peonies",
        name: "🌸 Пионы",
        img: "assets/peonies.jpg"
    }
];

// ============================
// 🌸 ИНИЦИАЛИЗАЦИЯ БУКЕТОВ
// ============================

document.addEventListener("DOMContentLoaded", () => {
    const wrap = document.getElementById("bouquets");
    if (!wrap) return;

    bouquets.forEach(b => {
        const card = document.createElement("div");
        card.className = "bouquet-card";

        card.innerHTML = `
            <img src="${b.img}" alt="${b.name}">
            <p>${b.name}</p>
        `;

        card.onclick = () => {
            document.getElementById("image").value = b.img;

            // визуальный выбор
            document.querySelectorAll(".bouquet-card")
                .forEach(el => el.classList.remove("active"));

            card.classList.add("active");
        };

        wrap.appendChild(card);
    });
});


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
