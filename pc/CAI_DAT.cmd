@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Can cai Node.js LTS 22 hoac moi hon tu https://nodejs.org/
 start "" "https://nodejs.org/"
 pause
 exit /b 1
)
node -e "if(Number(process.versions.node.split('.')[0])<22)process.exit(1)"
if errorlevel 1 (
 echo Can Node.js 22 hoac moi hon.
 pause
 exit /b 1
)
call npm ci --ignore-scripts
if errorlevel 1 goto fail
call npx --no-install playwright install chromium
if errorlevel 1 goto fail
echo Da cai dat. Mo MO_VAN_PHONG.cmd de su dung.
pause
exit /b 0
:fail
echo Cai dat chua thanh cong. Kiem tra mang va chay lai.
pause
exit /b 1
