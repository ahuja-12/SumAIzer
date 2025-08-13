import axios from 'axios';

// API base URL - change this to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// News API functions
export const newsApi = {
  // Get top headlines
  getTopHeadlines: async () => {
    try {
      const response = await api.get('/news');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch news');
    }
  },

  // Get article content from URL
  getArticleContent: async (url) => {
    try {
      const response = await api.get('/article-content', { params: { url } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch article content');
    }
  },
};

// OpenAI API functions
export const openaiApi = {
  // Summarize article content
  summarizeArticle: async (content, url = null) => {
    try {
      const payload = { content };
      if (url) payload.url = url;
      
      const response = await api.post('/summarize', payload);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to summarize article');
    }
  },
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend server is not responding');
  }
};

export default api; 