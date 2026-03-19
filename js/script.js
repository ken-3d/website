let currentLang = 'en';

function buildGallery() {
    const g = document.getElementById('gallery');
    g.innerHTML = '';
    POSTS.forEach(post => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
        <img src="${post.thumb}" alt="${post.title[currentLang]}" loading="lazy" oncontextmenu="return false;" draggable="false"/>
      `;
        item.addEventListener('click', () => openModal(post));
        g.appendChild(item);
    });
}

function openModal(post) {
    document.getElementById('modal-hero').src = post.hero;
    document.getElementById('modal-hero').alt = post.title[currentLang];
    document.getElementById('modal-tag').textContent = post.tag[currentLang];
    document.getElementById('modal-title').textContent = post.title[currentLang];
    document.getElementById('modal-date').textContent = post.date[currentLang];
    document.getElementById('modal-text').textContent = post.text[currentLang];

    const imgStack = document.getElementById('modal-images');
    imgStack.innerHTML = '';
    post.images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.loading = 'lazy';
        imgStack.appendChild(img);
    });

    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal(e, force) {
    if (force || (e && e.target === document.getElementById('modal'))) {
        document.getElementById('modal').classList.remove('open');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal(null, true);
});

function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('visible'));
    document.getElementById('page-' + name).classList.add('visible');
    window.scrollTo(0, 0);
}

function toggleDark() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    const btn = document.getElementById('btn-dark');
    const span = btn.querySelector('span');
    if (isDark) {
        span.setAttribute('data-en', 'Dark');
        span.setAttribute('data-ja', 'ダーク');
        span.textContent = currentLang === 'en' ? 'Dark' : 'ダーク';
    } else {
        span.setAttribute('data-en', 'Light');
        span.setAttribute('data-ja', 'ライト');
        span.textContent = currentLang === 'en' ? 'Light' : 'ライト';
    }
    btn.classList.toggle('active', !isDark);
}

function toggleLang() {
    currentLang = currentLang === 'en' ? 'ja' : 'en';
    document.documentElement.setAttribute('data-lang', currentLang);
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerHTML = el.getAttribute('data-' + currentLang);
    });
    buildGallery();
    document.querySelector('.modal-close-btn').textContent = currentLang === 'en' ? '✕ Close' : '✕ 閉じる';
    document.getElementById('btn-lang').querySelector('span').textContent = currentLang === 'en' ? '日本語' : 'English';
    document.getElementById('btn-lang').classList.toggle('active', currentLang === 'ja');
}

function applySystemTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    const btn = document.getElementById('btn-dark');
    const span = btn.querySelector('span');
    span.setAttribute('data-en', dark ? 'Light' : 'Dark');
    span.setAttribute('data-ja', dark ? 'ライト' : 'ダーク');
    span.textContent = currentLang === 'en' ? (dark ? 'Light' : 'Dark') : (dark ? 'ライト' : 'ダーク');
    btn.classList.toggle('active', dark);
}

const darkMQ = window.matchMedia('(prefers-color-scheme: dark)');
applySystemTheme(darkMQ.matches);
darkMQ.addEventListener('change', e => applySystemTheme(e.matches));

const POSTS = [
    {
        id: 1,
        tag: { en: "Illustration", ja: "イラスト" },
        title: { en: "Crimson Flower", ja: "真紅の花" },
        date: { en: "March 2026", ja: "2026年3月" },
        thumb: "images/20260316/image_01.webp",
        hero: "images/20260316/image_01.webp",
        text: { en: "Bi-weekly challenge prompt 'Flower'.", ja: "2026隔週イラストチャレンジ。題材は「花」。" },
        images: []
    },
    {
        id: 2,
        tag: { en: "Illustration", ja: "イラスト" },
        title: { en: "Tsukuyomi", ja: "ツクヨミ" },
        date: { en: "January 2026", ja: "2026年1月" },
        thumb: "images/20260119/image_01.webp",
        hero: "images/20260119/image_01.webp",
        text: { en: "Bi-weekly challenge prompt'New Year'.", ja: "2026隔週イラストチャレンジ。題材は「新年」。" },
        images: []
    },
    {
        id: 3,
        tag: { en: "Illustration", ja: "イラスト" },
        title: { en: "Tree House", ja: "木の家" },
        date: { en: "December 2025", ja: "2025年12月" },
        thumb: "images/20251230/image_01.webp",
        hero: "images/20251230/image_01.webp",
        text: { en: "Bi-weekly challenge prompt 'Wings'.", ja: "2026隔週イラストチャレンジ。題材は「翼」。" },
        images: ["images/20251230/image_02.webp", "images/20251230/image_03.webp", "images/20251230/image_04.webp", "images/20251230/image_05.webp", "images/20251230/image_06.webp", "images/20251230/image_07.webp", "images/20251230/image_08.webp", "images/20251230/image_09.webp"]
    },
    {
        id: 4,
        tag: { en: "Illustration", ja: "イラスト" },
        title: { en: "Duel", ja: "決闘" },
        date: { en: "October 2025", ja: "2025年10月" },
        thumb: "images/20251024/image_01.webp",
        hero: "images/20251024/image_01.webp",
        text: { en: "Sketchtober Day 24 Prompt 'Duel'.", ja: "2025スケッチトーバーチャレンジ24日目作品。題材は「決闘」。" },
        images: []
    },
    {
        id: 5,
        tag: { en: "Illustration", ja: "イラスト" },
        title: { en: "Dragon", ja: "ドラゴン" },
        date: { en: "October 2025", ja: "2025年10月" },
        thumb: "images/20251023/image_01.webp",
        hero: "images/20251023/image_01.webp",
        text: { en: "Sketchtober Day 23 Prompt'Dragon'.", ja: "2025スケッチトーバーチャレンジ23日目作品。題材は「ドラゴン」。" },
        images: []
    },
    {
        id: 6,
        tag: { en: "Illustration", ja: "イラスト" },
        title: { en: "Asuka / Air", ja: "アスカ / Air" },
        date: { en: "December 2023", ja: "2023年12月" },
        thumb: "images/20231225/image_01.webp",
        hero: "images/20231225/image_01.webp",
        text: { en: "Christmas secret santa event for r/AnimeSketch. Fan art of Asuka.", ja: "2023クリスマスイラスト交換イベント作品。アスカのファンアートリクエスト作品。" },
        images: ["images/20231225/image_02.webp", "images/20231225/image_03.webp"]
    },
    {
        id: 7,
        tag: { en: "Illustration", ja: "イラスト" },
        title: { en: "Floating Ruin", ja: "浮かぶ廃墟" },
        date: { en: "February 2023", ja: "2023年2月" },
        thumb: "images/20230213/image_01.webp",
        hero: "images/20230213/image_01.webp",
        text: { en: "Valentine illustration event. OG character of recipient.", ja: "2023バレンタインイラスト交換イベント作品。交換相手のオリジナルキャラのリクエスト作品。" },
        images: ["images/20230213/image_02.webp"]
    },
    {
        id: 8,
        tag: { en: "Illustration", ja: "イラスト" },
        title: { en: "Santa in Chaldea", ja: "カルデアのサンタ" },
        date: { en: "December 2022", ja: "2022年12月" },
        thumb: "images/20221223/image_01.webp",
        hero: "images/20221223/image_01.webp",
        text: { en: "Valentine illustration exchange event. Fan art of Gudako and Lanling Wang.", ja: "2022クリスマスイラスト交換イベント作品。グダ子と蘭陵王のファンアートリクエスト作品。" },
        images: ["images/20221223/image_02.webp"]
    },
    {
        id: 9,
        tag: { en: "Illustration", ja: "イラスト" },
        title: { en: "Lament of The Fallen", ja: "罪人の挽歌" },
        date: { en: "September 2022", ja: "2022年9月" },
        thumb: "images/20220919/image_01.webp",
        hero: "images/20220919/image_01.webp",
        text: { en: "2022 Honkai3rd Fanart Contest Submission.", ja: "2022年『崩壊3rd』同人創作コンテスト投稿作品。" },
        images: ["images/20220919/image_02.webp"]
    },
    {
        id: 10,
        tag: { en: "Illustration", ja: "イラスト" },
        title: { en: "TEUTHIS", ja: "テウティス" },
        date: { en: "October 2021", ja: "2021年10月" },
        thumb: "images/20211031/image_01.webp",
        hero: "images/20211031/image_01.webp",
        text: { en: "Made for a Halloween illustration exchange event. OG character of recipient.", ja: "2021ハロウィンイラスト交換イベント作品。交換相手のオリジナルキャラ。" },
        images: ["images/20211031/image_02.webp", "images/20211031/image_03.webp"]
    },
];

buildGallery();
