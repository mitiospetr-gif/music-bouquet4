// ==========================
// 💐 выбор букета
// ==========================
let selectedBouquet = null;

document.querySelectorAll(".bouquet").forEach(el => {
    el.addEventListener("click", () => {

        document.querySelectorAll(".bouquet")
            .forEach(b => b.classList.remove("active"));

        el.classList.add("active");
        selectedBouquet = el.dataset.bouquet;
    });
});


// ==========================
// 🔗 генерация ссылки
// ==========================
document.getElementById("createBtn").onclick = () => {

    const data = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        text: document.getElementById("text").value,
        youtube: document.getElementById("youtube").value,
        yandex: document.getElementById("yandex").value,
        image: selectedBouquet
    };

    const link = createShareLink(data);

    document.getElementById("result").textContent = link;
    window.generatedLink = link;
};


// ==========================
// 📋 копирование ссылки
// ==========================
document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(window.generatedLink || "");
    alert("Ссылка скопирована ✨");
};


// ==========================
// 🔧 СОЗДАНИЕ ССЫЛКИ (ЕСЛИ НЕТ ЛОГИКИ)
// ==========================
function createShareLink(data) {

    const encoded = btoa(encodeURIComponent(JSON.stringify(data)));

    return `${window.location.origin}/gift.html#${encoded}`;
}﻿
