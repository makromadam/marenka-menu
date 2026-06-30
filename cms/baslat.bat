@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Marenka Yonetim Paneli
echo ============================================
echo    MARENKA - Menu ve Yonetim Paneli
echo ============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [!] Node.js kurulu degil.
  echo.
  echo     1^) https://nodejs.org adresine gidin
  echo     2^) Yesil "LTS" butonuyla indirip kurun
  echo     3^) Bu dosyaya ^(baslat.bat^) tekrar cift tiklayin
  echo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Ilk kurulum yapiliyor... ^(1-2 dakika surebilir, lutfen bekleyin^)
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo [!] Kurulum basarisiz oldu. Internet baglantinizi kontrol edip tekrar deneyin.
    pause
    exit /b 1
  )
)

if not exist .env copy .env.example .env >nul

echo.
echo --------------------------------------------
echo  Menu  :  http://localhost:3000/
echo  Panel :  http://localhost:3000/yonetim
echo.
echo  Giris :  kullanici "admin"  sifre "marenka"
echo           ^(sifreyi .env dosyasindan degistirin^)
echo.
echo  *** BU PENCEREYI KAPATMAYIN ***
echo  Kapatirsaniz menu ve panel kapanir.
echo --------------------------------------------
echo.

timeout /t 2 >nul
start "" http://localhost:3000/yonetim
node server.js
pause
