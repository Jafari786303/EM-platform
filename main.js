const timelineData = [
  {
    title: 'Android PWA پیکجنگ',
    detail: 'ہر اپ ڈیٹ ایک نئے انوکھے ورژن کے ساتھ، APK فیچر پلیس سے فوری انسٹالیشن کے لئے تیار ہے۔',
    date: 'مارچ 2026'
  },
  {
    title: 'کمیونٹی انٹریکشن',
    detail: 'ٹیلیگرام ویوز، ووائس آف نیشن فیڈ، اور سوشل گفتگو کے لئے ایک نیا لاؤنج سیکشن لانچ کیا جائے گا۔',
    date: 'اپریل 2026'
  },
  {
    title: 'ریسرچ ہब توسیع',
    detail: 'بلاگ کی تمام خصوصی رپورٹس، ڈیٹا سیٹس، اور تجزیاتی ویڈیوز ایک لوکل فائل اسٹور میں سیو ہوں گی۔',
    date: 'مئی 2026'
  }
];

const articlesData = [
  {
    title: 'پاکستانی اقتصادی منظرنامہ • خاص رپورٹ',
    excerpt: 'اب تک کے بہترین تجزیے، ووائس آف نیشن بڑے تجزیاتی مرکز سے ترجمہ کردہ اور موبائل کے لئے ری ڈیزائن کیا گیا۔',
    accent: 'رپورٹ'
  },
  {
    title: 'صحت مند میڈیا اکاؤنٹس کا لیول اپ',
    excerpt: 'روزانہ رپورٹس، انسائٹس، اور ریئل ٹائم اسٹریم کے ساتھ خودکار نوٹیف کیشن بھیجنے کا پلان۔',
    accent: 'نیوز'
  },
  {
    title: 'کمیونٹی ڈائنامکس • اپڈیٹ',
    excerpt: 'جو لوگ بلاگ پر مسلسل حصّہ لیتے ہیں انہیں ہفتہ وار ویژن کالز، پیپر فالو اپز، اور فیڈ بیک سیشنز ملتے ہیں۔',
    accent: 'کمیونٹی'
  }
];

function renderTimeline() {
  const container = document.getElementById('timeline-list');
  container.innerHTML = timelineData
    .map(
      (item) => `
        <div class="timeline-entry">
          <span>${item.date}</span>
          <h3>${item.title}</h3>
          <p>${item.detail}</p>
        </div>
      `
    )
    .join('');
}

function renderArticles() {
  const container = document.getElementById('article-grid');
  container.innerHTML = articlesData
    .map(
      (article) => `
        <article class="article-card">
          <h3>${article.title}</h3>
          <p>${article.excerpt}</p>
          <button type="button">مزید پڑھیں →</button>
        </article>
      `
    )
    .join('');
}

function animateEntries() {
  const entries = document.querySelectorAll('.timeline-entry, .article-card');
  const observer = new IntersectionObserver(
    (items) => {
      items.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  entries.forEach((el) => observer.observe(el));
}

function updateLiveUsers() {
  const el = document.getElementById('live-count');
  if (!el) {
    return;
  }
  const base = 420;
  const now = Date.now();
  const variance = Math.round((Math.sin(now / 60000) + 1) * 30);
  const jitter = Math.floor(Math.random() * 10);
  const count = base + variance + jitter;
  el.textContent = String(count);
}

document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  renderArticles();
  setTimeout(animateEntries, 400);
  updateLiveUsers();
  setInterval(updateLiveUsers, 6000);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .catch(() => console.warn('Service worker registration failed'));
}
