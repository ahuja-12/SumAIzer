import React, { useState } from 'react';
import { FaNewspaper, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { openaiApi } from '../services/api';
import Loader from './Loader';

const NewsCard = ({ article }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (summary) {
      setIsExpanded(!isExpanded);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Use description if available, otherwise try to get content from URL
      const content = article.content || article.description || '';
      
      if (!content && !article.url) {
        throw new Error('No content available for summarization');
      }

      const response = await openaiApi.summarizeArticle(content, article.url);
      setSummary(response.summary);
      setIsExpanded(true);
    } catch (err) {
      setError(err.message || 'Failed to summarize article');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden animate-fade-in">
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FaNewspaper className="text-indigo-500" />
            <span className="font-medium">{article.source?.name || 'Unknown Source'}</span>
          </div>
          <span className="text-xs text-gray-400">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        {/* Article Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          {article.title}
        </h3>

        {/* Article Description */}
        {article.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.description}
          </p>
        )}

        {/* Card Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSummarize}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader size="sm" text="" />
            ) : (
              <>
                <span>{summary ? (isExpanded ? 'Hide Summary' : 'Show Summary') : 'Summarize'}</span>
                {summary && (isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />)}
              </>
            )}
          </button>

          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              <span className="text-sm">Read Full</span>
              <FaExternalLinkAlt size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {isExpanded && summary && (
        <div className="border-t border-gray-100 bg-gray-50 p-6 animate-slide-up">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <FaNewspaper className="mr-2 text-indigo-500" />
            AI Summary
          </h4>
          <div className="text-gray-700 text-sm leading-relaxed">
            {summary.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="border-t border-red-100 bg-red-50 p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default NewsCard; 