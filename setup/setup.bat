@echo off
title NC-ASSET Server
cd /d "%~dp0.."
where python >nul 2>&1 || (echo Python fehlt. Bitte Python installieren. & pause & exit /b 1)
echo NC-ASSET Server: http://localhost:8000/index.html
echo Zum Beenden dieses Fenster schliessen.
python -m http.server 8000
