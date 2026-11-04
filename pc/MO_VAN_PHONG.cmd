@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Hay chay CAI_DAT.cmd truoc.
 pause
 exit /b 1
)
if not exist "node_modules\playwright\package.json" (
 echo Hay chay CAI_DAT.cmd truoc.
 pause
 exit /b 1
)
set OFFICE_OPEN=1
node server.cjs
pause
