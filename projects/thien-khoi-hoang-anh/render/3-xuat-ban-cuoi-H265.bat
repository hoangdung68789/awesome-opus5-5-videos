@echo off
chcp 65001 >nul
rem Xuat ban cuoi 1080x1920 H.265, am luong -14 LUFS, luu vao thu muc video cua Dung.
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
set "DICH=C:\Users\Admin\HDRE AI\Videos"
if not exist "%DICH%" mkdir "%DICH%"
if not exist "render\_tmp" mkdir "render\_tmp"
set "TAM=render\_tmp\master.mp4"
set "FILE=%DICH%\HDRE_ThienKhoi-HoangAnh_9x16_30fps_H265_v01.mp4"
call npx remotion render ThienKhoi-HoangAnh-9x16 "%TAM%" --codec=h265 --crf=19 --gl=angle || call npx remotion render ThienKhoi-HoangAnh-9x16 "%TAM%" --codec=h265 --crf=19 --gl=swangle || goto :loi
call npx remotion ffmpeg -y -i "%TAM%" -c:v copy -tag:v hvc1 -af loudnorm=I=-14:TP=-1:LRA=11 -c:a aac -b:a 320k -ar 48000 -movflags +faststart "%FILE%" || goto :loi
echo Xong: %FILE%
start "" "%DICH%"
pause
goto :eof
:loi
echo Xuat ban loi. Chup man hinh loi gui Claude.
pause
