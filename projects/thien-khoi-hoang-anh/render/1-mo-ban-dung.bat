@echo off
chcp 65001 >nul
rem Mo Remotion Studio de xem va sua video (chu, vi tri, moc thoi gian).
cd /d "%~dp0.."
if not exist node_modules (
  echo Cai thu vien lan dau, vui long cho...
  call npm i || goto :loi
)
call npx remotion studio
goto :eof
:loi
echo Loi khi cai thu vien. Kiem tra da cai Node.js 22 chua.
pause
