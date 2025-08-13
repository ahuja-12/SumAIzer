@echo off
echo 🤖 Starting AI News Summarizer...
echo.

echo 📦 Installing dependencies...
call npm run install-all

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