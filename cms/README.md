# Marenka — Veritabanı Destekli Menü + Yönetim Paneli

Marenka dijital menüsünün **veritabanına bağlı**, **anlık güncellenebilen**
sürümü. Tek bir Node.js sunucusu hem müşteriye gösterilen menüyü hem de menünün
**her alanına** müdahale edebilen yönetim panelini sunar. Yönetim panelinden
“Yayınla” dediğiniz anda, açık olan tüm müşteri ekranları **sayfa yenilemeden**
güncellenir (Server-Sent Events).

- **Müşteri menüsü:** `http://SUNUCU/`
- **Yönetim paneli:** `http://SUNUCU/yonetim`

---

## Ne sunuyor?

- **Gerçek veritabanı (SQLite).** Yayınlanan menü, normalize edilmiş tablolarda
  saklanır (bölümler, kategoriler, ürünler, fiyatlar) — her alan ayrı bir
  sütundur, sorgulanabilir ve yedeklenebilir.
- **Anlık güncelleme.** Bir değişikliği yayınladığınızda açık menüler canlı
  güncellenir (SSE). Müşterinin bulunduğu bölüm ve seçtiği dil korunur.
- **Tüm alanlara müdahale.** Bölüm/kategori/ürün ekle-sil-sırala; iki dilli
  (TR/EN) başlık, açıklama, alerjen, kalori, hacim, tek/çoklu fiyat, üst başlık,
  notlar, bölüm altı notu, “uluslararası isim” seçeneği — hepsi düzenlenebilir.
- **Taslak + Yayınla.** Düzenlemeler otomatik olarak bir **taslağa** kaydedilir;
  hazır olunca **Yayınla** ile canlıya alınır. Yarım kalan değişiklikler
  müşteriye gitmez.
- **Sürüm geçmişi.** Her yayın saklanır; “Geçmiş”ten eski bir sürümü taslağa
  yükleyip yeniden yayınlayabilirsiniz.
- **Gerçek oturum güvenliği.** Giriş sunucuda doğrulanır (httpOnly imzalı çerez),
  şifre tarayıcıya gömülü değildir. Giriş denemeleri sınırlandırılır.
- **Yedek al / içe aktar.** Menüyü JSON olarak indirip geri yükleyebilirsiniz.

---

## Hızlı başlangıç (yerel)

Gereken: **Node.js 18+** (önerilen 20/22).

```bash
cd cms
cp .env.example .env          # şifreyi .env içinde değiştirin!
npm install
npm start
```

Açılış:

- Menü:           <http://localhost:3000/>
- Yönetim paneli: <http://localhost:3000/yonetim>

İlk açılışta veritabanı `data/menu.db` olarak oluşturulur ve mevcut Marenka
menüsüyle (kahvaltı, öğle, akşam, … şarap, alkolsüz) **otomatik doldurulur**.

> Varsayılan giriş: kullanıcı `admin`, şifre `marenka`. **Mutlaka değiştirin**
> (`.env` içindeki `ADMIN_PASSWORD`).

---

## Ortam ayarları (`.env`)

| Anahtar | Açıklama | Varsayılan |
|---|---|---|
| `ADMIN_USERNAME` | Yönetim paneli kullanıcı adı | `admin` |
| `ADMIN_PASSWORD` | Yönetim paneli şifresi (**değiştirin**) | `marenka` |
| `PORT` | Sunucu portu | `3000` |
| `SESSION_SECRET` | Oturum imzalama anahtarı (boşsa otomatik üretilip DB’ye yazılır) | — |
| `COOKIE_SECURE` | HTTPS arkasında çereze `Secure` ekler (`1`) | otomatik |
| `DB_PATH` | SQLite dosya yolu | `data/menu.db` |

---

## Yönetim panelini kullanma

1. `/yonetim` adresine gidin, kullanıcı adı + şifre ile girin.
2. Soldaki ağaçtan bir **bölüm / kategori / ürün** seçin ya da `+` ile ekleyin.
3. Sağdaki formdan istediğiniz alanı düzenleyin. Değişiklikler otomatik olarak
   **taslağa** kaydedilir (üst sağda “Taslak kaydedildi ✓”).
4. **Önizle** ile taslağı yeni sekmede görün.
5. Hazırsanız **Yayınla** deyin — canlı menü ve açık tüm müşteri ekranları
   anında güncellenir.
6. **Geçmiş**ten eski sürümleri, **Yedek**ten JSON yedeği alabilirsiniz.
7. **Yayına dön**: taslaktaki kaydedilmemiş değişiklikleri atıp son yayınlanan
   sürüme döner.

---

## Sunucuya kurulum (production)

Uygulama tek bir Node sürecidir; herhangi bir Node hostunda çalışır
(Render, Railway, Fly.io, bir VPS, vb.).

**Genel adımlar**

```bash
npm install --omit=dev
ADMIN_PASSWORD='güçlü-bir-şifre' SESSION_SECRET='uzun-rastgele' PORT=3000 node server.js
```

Bir ters proxy (Nginx/Caddy) arkasında HTTPS sonlandırması önerilir. Proxy
`X-Forwarded-Proto` gönterirse çerez otomatik `Secure` olur; göndermiyorsa
`COOKIE_SECURE=1` verin. **`/api/events` SSE uç noktası için tamponlamayı
kapatın** (Nginx: `proxy_buffering off;`).

**Docker**

```bash
docker build -t marenka-cms ./cms
docker run -p 3000:3000 \
  -e ADMIN_PASSWORD='güçlü-bir-şifre' \
  -e SESSION_SECRET='uzun-rastgele' \
  -v marenka_data:/app/data \
  marenka-cms
```

`-v marenka_data:/app/data` veritabanını kalıcı kılar (kapsayıcı yeniden
oluşturulsa bile menü korunur). **Yedek almayı unutmayın** (`data/menu.db`
dosyası veya panelden JSON yedek).

---

## Mimari

```
cms/
├── server.js              Express sunucusu (menü + panel + API)
├── lib/
│   ├── db.js              SQLite şeması (normalize edilmiş tablolar)
│   ├── menu-repo.js       veri ↔ tablolar eşleme, temizleme/doğrulama, taslak/yayın/sürüm
│   ├── auth.js            imzalı oturum çerezi, giriş sınırlama
│   └── sse.js             canlı güncelleme yayını (Server-Sent Events)
├── data/
│   ├── seed.js            ilk kurulum menüsü (boş veritabanını doldurur)
│   └── menu.db            SQLite (çalışınca oluşur; .gitignore’da)
├── public/               Müşteri menüsü (API’den okur, SSE ile canlı yenilenir)
├── admin/                Yönetim paneli (tüm alanları düzenler, anında yayınlar)
└── test/smoke.test.js    uçtan uca duman testi (npm test)
```

**API (özet)**

| Yöntem | Yol | Erişim | İş |
|---|---|---|---|
| GET | `/api/menu` | herkes | yayınlanan menü |
| GET | `/api/events` | herkes | canlı güncelleme akışı (SSE) |
| POST | `/api/login` / `/api/logout` | — | oturum |
| GET/PUT | `/api/draft` | giriş | taslağı oku / kaydet |
| POST | `/api/publish` | giriş | taslağı canlıya al |
| POST | `/api/revert-draft` | giriş | taslağı son yayına döndür |
| GET | `/api/revisions` | giriş | yayın geçmişi |
| POST | `/api/revisions/:id/restore` | giriş | eski sürümü taslağa yükle |

---

## Test

```bash
npm test
```

Geçici bir veritabanı ve port üzerinde tüm yaşam döngüsünü doğrular: tohumlama →
giriş → taslak düzenleme → yayın → müşteri okuma → normalize edilmiş veri
kayıpsız mı (round-trip) → geçersiz veri reddi → sürümler.

---

## Notlar

- Şifreyi mutlaka değiştirin ve `data/menu.db` dosyasını düzenli yedekleyin.
- Eski statik dosyalar (kök dizindeki `index.html`, `marenka-menu.html`,
  `marenka-admin.html`) olduğu gibi durur; bu klasör (`cms/`) bağımsız çalışır.
