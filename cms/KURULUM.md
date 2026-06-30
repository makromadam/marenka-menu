# Marenka — Kurulum (kolay anlatım)

Bu klasör, **tasarımlı menü** + **veritabanına bağlı yönetim panelini** içerir.
Panelden “Yayınla” dediğinizde menü **anında** güncellenir.

İki kullanım yolu var: (A) kendi bilgisayarınızda denemek, (B) internette yayınlamak.

---

## A) Kendi bilgisayarınızda (deneme / yerel)

1. **Node.js** kurun (bir kez): <https://nodejs.org> → yeşil **“LTS”** butonu.
2. Bu klasörde başlatıcıya **çift tıklayın**:
   - **Windows:** `baslat.bat`
   - **Mac:** `baslat.command` *(ilk seferde “Sistem Ayarları → Gizlilik ve
     Güvenlik”den izin vermeniz gerekebilir)*
3. Açılan siyah pencere kapanmadığı sürece:
   - Menü → <http://localhost:3000/>
   - Panel → <http://localhost:3000/yonetim>
4. Giriş: kullanıcı **admin**, şifre **marenka** → `.env` dosyasından değiştirin.

> Bu yöntem yalnızca bilgisayarınız açık ve pencere açıkken çalışır. Müşteriye
> QR vermek için (B) yolunu kullanın.

---

## B) İnternette yayınlama (kalıcı adres, QR’a uygun)

Uygulama tek bir Node sunucusudur; herhangi bir Node hostunda çalışır. En kolay
yol, kodu GitHub deposundan bir buluta bağlamaktır:

### Render (tek tıkla)
Deponun kök dizinindeki **`render.yaml`** her şeyi otomatik kurar:
1. <https://dashboard.render.com> → **New + → Blueprint** → bu depoyu seçin.
2. Render servisi + kalıcı diski kurar. **Environment** sekmesinden üretilen
   **ADMIN_PASSWORD**’ü not edin.
3. Size `https://...onrender.com/` (menü) ve `.../yonetim` (panel) adresi verilir.

> Menü verisinin kalıcı olması için disk gerekir (Render’da ücretli Starter plan).

### Railway / Fly.io / kendi sunucunuz (Docker)
`Dockerfile` hazırdır. Verinin kalıcı olması için `cms/data` klasörünü bir
**volume**’a bağlayın ve şu değişkenleri verin:
`ADMIN_PASSWORD`, `SESSION_SECRET`, gerekiyorsa `COOKIE_SECURE=1`.

```bash
docker build -t marenka-cms ./cms
docker run -p 3000:3000 \
  -e ADMIN_PASSWORD='güçlü-bir-şifre' -e SESSION_SECRET='uzun-rastgele' \
  -v marenka_data:/app/data marenka-cms
```

Ayrıntılar için `README.md` dosyasına bakın.

---

## Önemli notlar

- **Şifreyi mutlaka değiştirin** (`.env` veya hosting değişkenleri).
- Düzenli **yedek** alın: panelden “Yedek” (JSON) veya `data/menu.db` dosyası.
- İlk açılışta menü, mevcut Marenka içeriğiyle otomatik dolar; sonra panelden
  her alanı düzenleyebilirsiniz.
