@echo off
title NC-ASSET Server
cd /d "%~dp0.."

where python >nul 2>&1
if errorlevel 1 (
  echo Python fehlt. Bitte Python installieren und zum PATH hinzufuegen.
  pause
  exit /b 1
)

echo NC-ASSET Server: http://localhost:8000/index.html
echo Zum Beenden Strg+C druecken.
python -m http.server 8000

if errorlevel 1 (
  echo.
  echo Serverstart fehlgeschlagen. Ist Port 8000 bereits belegt?
  pause
)
