@echo off
title NC-ASSET
cd /d "%~dp0.."

echo NC-ASSET wird gestartet ...
start "NC-ASSET Server" /min cmd /c "call setup\setup.bat"

set "URL=http://localhost:8000/index.html"
set /a versuche=0

:warte
timeout /t 1 /nobreak >nul
curl --silent --fail "%URL%" >nul 2>&1
if not errorlevel 1 goto browser

set /a versuche+=1
if %versuche% lss 20 goto warte

echo Der Server konnte nicht gestartet werden.
echo Bitte pruefe, ob Python installiert ist und Port 8000 frei ist.
pause
exit /b 1

:browser
start "" "%URL%"
exit /b 0
