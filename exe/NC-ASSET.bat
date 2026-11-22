@echo off
cd /d "%~dp0.."
start "NC-ASSET Server" /min cmd /c "setup\setup.bat"
timeout /t 2 /nobreak >nul
start "" "http://localhost:8000/index.html"
