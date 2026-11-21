import React, { useState, useEffect } from 'react';
import { FaNewspaper, FaRocket, FaExclamationTriangle } from 'react-icons/fa';
import { newsApi, healthCheck } from '../services/api';
import NewsCard from '../components/NewsCard';
import Loader, { CardSkeleton } from '../components/Loader';

const LandingPage = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking');

  // Retry while the backend is starting or temporarily unavailable.
  useEffect(() => {
    let isMounted = true;
    let retryTimeout;

    const checkBackendConnection = async () => {
      try {
        await healthCheck();
        if (isMounted) {
          setBackendStatus('connected');
        }
      } catch {
        if (isMounted) {
          setBackendStatus('offline');
          retryTimeout = setTimeout(checkBackendConnection, 1500);
        }
      }
    };

    checkBackendConnection();

    return () => {
      isMounted = false;
      clearTimeout(retryTimeout);
    };
  }, []);

  const fetchNews = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await newsApi.getTopHeadlines();
      setNews(response.articles || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch news');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-lg font-bold text-gray-900">AI News Summarizer</h1>
                <p className="text-sm text-gray-600">Stay informed with AI-powered summaries</p>
              </div>
            </div>

            {/* Backend Status */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  backendStatus === 'connected'
                    ? 'bg-green-500'
                    : backendStatus === 'checking'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
              ></div>
              <span className="text-sm text-gray-600">
                {backendStatus === 'connected'
                  ? 'Backend Connected'
                  : backendStatus === 'checking'
                    ? 'Checking Backend...'
                    : 'Backend Offline'}
              </span>
            </div>
          </div>
        </div>
      </header>


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 bg-gradient-to-b from-blue-100 to-indigo-100 py-16 rounded-lg shadow-sm">

          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transform News Reading with AI
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get instant, intelligent summaries of the latest news articles.
              Save time while staying informed with our AI-powered summarization technology.
            </p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={fetchNews}
          disabled={isLoading || backendStatus !== 'connected'}
          className="flex items-center space-x-2 mx-auto px-8 py-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <Loader size="sm" text="Fetching News..." />
          ) : (
            <>
              <FaRocket size={20} />
              <span className="text-lg font-semibold">Fetch Latest News</span>
            </>
          )}
        </button>




        {/* Backend Connection Warning */}
        {
          backendStatus === 'offline' && (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <FaExclamationTriangle className="text-yellow-500" />
                <p className="text-yellow-800">
                  Backend server is unavailable. It may still be starting; reconnecting automatically.
                </p>
              </div>
            </div>
          )
        }

        {/* Error Message */}
        {
          error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <FaExclamationTriangle className="text-red-500" />
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )
        }

        {/* News Grid */}
        {isLoading && <CardSkeleton count={6} />}

        {
          !isLoading && news.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                  Latest News ({news.length} articles)
                </h3>
                <button
                  onClick={fetchNews}
                  className="text-indigo-500 hover:text-indigo-600 transition-colors"
                >
                  Refresh
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((article, index) => (
                  <NewsCard key={index} article={article} />
                ))}
              </div>
            </div>
          )
        }

        {/* Empty State */}
        {
          !isLoading && news.length === 0 && !error && (
            <div className="text-center py-12">
              <FaNewspaper className="mx-auto text-gray-400 text-6xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No News Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Click the button above to fetch the latest news headlines
              </p>
            </div>
          )
        }
      </main>
    </div >
  );
};


export default LandingPage; 