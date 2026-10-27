@echo off
chcp 65001 >nul
rem Xuat ban xem truoc 720p vao render\xem-truoc (nhanh, de duyet).
cd /d "%~dp0.."
if not exist node_modules (
  echo Cai thu vien lan dau, vui long cho...
  call npm i || goto :loi
)
for %%F in ("public\assets\hoang-dung-chan-dung.jpg" "public\assets\khoi-hoang-anh-giam-doc-khoi.jpg" "public\assets\phong-hoang-anh-1-tuoi.jpg" "public\assets\phong-hoang-anh-1-tuoi-2.jpg" "public\audio\nhac-nen-tiktok.mp3") do (
  if not exist %%F (
    echo Thieu file %%~F
    echo Xem huong dan trong public\assets\README.md va public\audio\README.md
    pause
    exit /b 1
  )
)
set "OUT=render\xem-truoc\HDRE_ThienKhoi-HoangAnh_9x16_XEM-TRUOC.mp4"
call npx remotion render ThienKhoi-HoangAnh-9x16 "%OUT%" --codec=h264 --crf=22 --scale=0.6667 --gl=angle || call npx remotion render ThienKhoi-HoangAnh-9x16 "%OUT%" --codec=h264 --crf=22 --scale=0.6667 --gl=swangle || goto :loi
echo Xong: %OUT%
start "" "render\xem-truoc"
pause
goto :eof
:loi
echo Render loi. Chup man hinh loi gui Claude.
pause
