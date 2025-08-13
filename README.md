# 🤖 AI News Summarizer

A modern, full-stack web application that uses AI to summarize news articles. Built with React, Node.js, and powered by NewsAPI and OpenAI GPT.

## ✨ Features

- **📰 Live News Fetching**: Get the latest headlines from NewsAPI
- **🧠 AI-Powered Summaries**: Intelligent article summarization using OpenAI GPT
- **🎨 Modern UI**: Beautiful, responsive design with Tailwind CSS
- **📱 Mobile-First**: Fully responsive design that works on all devices
- **🔒 Secure**: API keys are protected on the backend
- **⚡ Fast**: Built with Vite for lightning-fast development
- **🎯 Custom Summarizer**: Paste URLs or text for instant summarization

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Icons** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### APIs
- **NewsAPI** - News headlines and articles
- **OpenAI GPT** - AI-powered text summarization

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- NewsAPI key (free at [newsapi.org](https://newsapi.org))
- OpenAI API key (get at [platform.openai.com](https://platform.openai.com))

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd news
```

### 2. Backend Setup
```bash
cd backend
npm install
cp env.example .env
```

Edit `.env` file with your API keys:
```env
NEWS_API_KEY=your_news_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

Start the backend:
```bash
npm start
# or for development with auto-restart:
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Start the frontend:
```bash
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
news/
├── backend/                 # Express.js server
│   ├── index.js            # Main server file
│   ├── package.json        # Backend dependencies
│   └── env.example         # Environment variables template
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Loader.jsx
│   │   │   ├── NewsCard.jsx
│   │   │   └── CustomSummarizer.jsx
│   │   ├── pages/          # Page components
│   │   │   └── LandingPage.jsx
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── App.jsx         # Main app component
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind configuration
└── README.md
```

## 🎯 Core Features Explained

### 1. News Fetching
- Fetches top headlines from NewsAPI
- Displays articles in responsive cards
- Shows source, date, and description

### 2. AI Summarization
- Click "Summarize" on any article
- Uses OpenAI GPT to generate intelligent summaries
- Expandable summary sections with smooth animations

### 3. Custom Summarizer
- Paste article URLs or raw text
- Instant AI-powered summarization
- Copy summaries to clipboard

### 4. Responsive Design
- Mobile-first approach
- Beautiful animations and transitions
- Loading states and error handling

## 🔧 API Endpoints

### Backend Routes
- `GET /api/health` - Health check
- `GET /api/news` - Fetch top headlines
- `POST /api/summarize` - Summarize article content
- `GET /api/article-content` - Get article content from URL

## 🎨 UI Components

### NewsCard
- Displays article information
- Summarize button with loading states
- Expandable summary section
- External link to full article

### CustomSummarizer
- Toggle between URL and text input
- Real-time validation
- Copy-to-clipboard functionality
- Clear form option

### Loader
- Multiple loading states (spinner, shimmer)
- Card skeleton for news grid
- Customizable sizes and types

## 🚀 Deployment

### Backend Deployment
1. Deploy to platforms like Heroku, Railway, or Vercel
2. Set environment variables in your hosting platform
3. Update CORS settings if needed

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or any static hosting
3. Update API base URL in production

## 🔒 Security Features

- API keys stored securely on backend
- CORS configured for security
- Input validation and sanitization
- Error handling without exposing sensitive data

## 🎓 Learning Features

This project demonstrates:
- Modern React patterns with hooks
- Full-stack JavaScript development
- API integration and error handling
- Responsive design with Tailwind CSS
- State management without Redux
- Clean code organization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [NewsAPI](https://newsapi.org) for news data
- [OpenAI](https://openai.com) for AI capabilities
- [Tailwind CSS](https://tailwindcss.com) for styling
- [React Icons](https://react-icons.github.io/react-icons/) for icons

---

**Built with ❤️ for modern news consumption** 