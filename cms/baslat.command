#!/bin/bash
# Marenka — Mac için tek tıkla başlatıcı. Çift tıklayın.
cd "$(dirname "$0")" || exit 1
echo "============================================"
echo "   MARENKA - Menü ve Yönetim Paneli"
echo "============================================"
echo

if ! command -v node >/dev/null 2>&1; then
  echo "[!] Node.js kurulu değil."
  echo "    1) https://nodejs.org adresine gidin"
  echo "    2) 'LTS' sürümünü indirip kurun"
  echo "    3) Bu dosyaya (baslat.command) tekrar çift tıklayın"
  echo
  read -n 1 -s -r -p "Çıkmak için bir tuşa basın..."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "İlk kurulum yapılıyor... (1-2 dakika sürebilir)"
  npm install || { echo "[!] Kurulum başarısız. İnternet bağlantınızı kontrol edin."; read -n 1 -s -r; exit 1; }
fi

[ -f .env ] || cp .env.example .env

echo
echo "--------------------------------------------"
echo "  Menü  :  http://localhost:3000/"
echo "  Panel :  http://localhost:3000/yonetim"
echo "  Giriş :  kullanıcı 'admin'  şifre 'marenka'"
echo
echo "  *** BU PENCEREYİ KAPATMAYIN ***"
echo "--------------------------------------------"
echo

( sleep 2; open "http://localhost:3000/yonetim" ) &
node server.js
