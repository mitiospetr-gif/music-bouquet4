// ==========================
// 🌸 v6 CORE (SHORT LINKS + GIFT LOADER)
// ==========================

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

// 🔗 СОЗДАНИЕ ССЫЛКИ (ИСПОЛЬЗУЕТСЯ В index.html)
function createShareLink(data) {
    const clean = compress(data);
    return location.origin + "/gift.html#" + encode(clean);
}

// 🎁 ЗАГРУЗКА ПОДАРКА (gift.html)
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
```

---

# 💛 2. `gift.html` (ЗАМЕНИ ПОЛНОСТЬЮ)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Подарок</title>

<link rel="stylesheet" href="style.css">
</head>

<body class="dark-theme">

<div class="gift-container">

    <img id="bouquetImage" class="bouquet-image" src="" alt="bouquet">

    <h2>Для тебя 💛</h2>

    <p id="greetingText"></p>
    <h3 id="trackName"></h3>

    <div class="links">
        <a id="youtubeBtn" target="_blank">YouTube</a>
        <a id="yandexBtn" target="_blank">Яндекс Музыка</a>
    </div>

    <p id="authorText"></p>

</div>

<script src="app.js"></script>

</body>
</html>
