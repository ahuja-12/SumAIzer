# 🚀 Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- NewsAPI key (free at [newsapi.org](https://newsapi.org))
- OpenAI API key (get at [platform.openai.com](https://platform.openai.com))

## ⚡ Quick Start (Windows)

1. **Run the start script:**
   ```bash
   start.bat
   ```

2. **Set up API keys:**
   - Copy `backend/env.example` to `backend/.env`
   - Add your API keys to `backend/.env`

3. **Access the app:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 🔧 Manual Setup

### Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your API keys
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔑 API Keys Required

### NewsAPI
1. Go to [newsapi.org](https://newsapi.org)
2. Sign up for a free account
3. Get your API key
4. Add to `backend/.env`: `NEWS_API_KEY=your_key_here`

### OpenAI
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an account and add billing
3. Get your API key
4. Add to `backend/.env`: `OPENAI_API_KEY=your_key_here`

## 🎯 Features to Try

1. **Fetch Latest News** - Click the button to get headlines
2. **Summarize Articles** - Click "Summarize" on any article
3. **Custom Summarizer** - Paste URLs or text for summarization
4. **Responsive Design** - Test on mobile and desktop

## 🐛 Troubleshooting

- **Backend not connecting**: Check if port 5000 is available
- **API errors**: Verify your API keys are correct
- **CORS errors**: Ensure backend is running on port 5000

**Happy coding! 🎉** 