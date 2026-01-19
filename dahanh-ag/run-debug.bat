@echo off
SETLOCAL EnableDelayedExpansion

echo ==========================================
echo    DA HANH AG - STARTUP DEBUG SCRIPT
echo ==========================================
echo.

:: 1. Check if node_modules exists
if not exist "node_modules\" (
    echo [!] Missing node_modules, installing...
    call npm install
    if !errorlevel! neq 0 (
        echo [X] Installation failed. Please check your internet connection.
        pause
        exit /b 1
    )
)

:: 2. Ensure .dahanh exists
if not exist ".dahanh\" (
    echo [!] Initializing .dahanh directory...
    mkdir .dahanh
    mkdir .dahanh\docs
    mkdir .dahanh\tasks
)

:: 3. Build the project
echo [^>] Building project...
call npm run build
if !errorlevel! neq 0 (
    echo [X] Build failed.
    pause
    exit /b 1
)

:: 4. Start the dev server
echo.
echo [^>] Starting Da Hanh AG in DEV mode...
echo [^>] Port: 3456
echo [^>] URL: http://localhost:3456
echo.
echo Press Ctrl+C to stop the server later.
echo.

npm run dev

pause
