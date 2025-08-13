// Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { OpenAI } = require('openai');

// API Keys from .env
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// OpenAI setup
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// App setup
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI News Summarizer API is running' });
});

// Get top headlines from NewsAPI
app.get('/api/news', async (req, res) => {
  try {
    if (!NEWS_API_KEY) {
      return res.status(500).json({ error: 'News API key not configured' });
    }

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: NEWS_API_KEY,
        pageSize: 20
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('News API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch news',
      details: error.response?.data || error.message 
    });
  }
});

// Summarize article using OpenAI API
app.post('/api/summarize', async (req, res) => {
  try {
    const { content, url } = req.body;

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    if (!content && !url) {
      return res.status(400).json({ error: 'Content or URL is required' });
    }

    let textToSummarize = content;

    // If URL is provided but content is missing
    if (url && !content) {
      try {
        const response = await axios.get(url);
        textToSummarize = response.data;
      } catch (urlError) {
        return res.status(400).json({ error: 'Failed to fetch content from URL' });
      }
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4" if available and preferred
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes news articles.",
        },
        {
          role: "user",
          content: `Summarize this article in 2-3 concise paragraphs:\n\n${textToSummarize}`
        }
      ],
      temperature: 0.7
    });

    const summary = response.choices[0].message.content;
    res.json({ summary });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      error: 'Failed to summarize article',
      details: error.message || error
    });
  }
});

// Get full article content
app.get('/api/article-content', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const response = await axios.get(url);
    res.json({ content: response.data });
  } catch (error) {
    console.error('Article content fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch article content' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI News Summarizer Backend running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
