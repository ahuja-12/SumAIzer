@echo off
cd /d "%~dp0"
echo 🤖 Starting AI News Summarizer...
echo.

if not exist "node_modules\.bin\concurrently.cmd" (
    echo 📦 Installing root dependencies...
    call npm install
    if errorlevel 1 exit /b 1
)

if not exist "backend\node_modules\.bin\nodemon.cmd" (
    echo 📦 Installing backend dependencies...
    call npm install --prefix backend
    if errorlevel 1 exit /b 1
)

if not exist "frontend\node_modules\.bin\vite.cmd" (
    echo 📦 Installing frontend dependencies...
    call npm install --prefix frontend
    if errorlevel 1 exit /b 1
)

echo.
echo 🔧 Setting up environment...
if not exist "backend\.env" (
    echo ⚠️  Please create backend\.env file with your API keys
    echo    Copy from backend\env.example
    pause
)

echo.
echo 🚀 Starting development servers...
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:5000
echo.
echo Press Ctrl+C to stop both servers
echo.

call npm run dev 