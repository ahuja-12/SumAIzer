import React, { useState } from 'react';
import { FaLink, FaFileAlt, FaMagic, FaCopy, FaCheck } from 'react-icons/fa';

import { openaiApi } from '../services/api';
import Loader from './Loader';

const CustomSummarizer = () => {
  const [inputType, setInputType] = useState('text'); // 'text' or 'url'
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      setError('Please enter some content to summarize');
      return;
    }

    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      const payload = inputType === 'url' ? { url: input } : { content: input };
      const response = await openaiApi.summarizeArticle(payload.content, payload.url);
      setSummary(response.summary);
    } catch (err) {
      setError(err.message || 'Failed to summarize content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const clearAll = () => {
    setInput('');
    setSummary('');
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <FaMagic className="text-purple-500 mr-3 text-xl" />
        <h2 className="text-2xl font-bold text-gray-900">Custom Article Summarizer</h2>
      </div>

      {/* Input Type Toggle */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setInputType('text')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            inputType === 'text'
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FaFileText size={16} />
          <span>Paste Text</span>
        </button>
        <button
          onClick={() => setInputType('url')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            inputType === 'url'
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FaLink size={16} />
          <span>Article URL</span>
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {inputType === 'text' ? 'Article Text' : 'Article URL'}
          </label>
          {inputType === 'text' ? (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your article text here..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={isLoading}
            />
          ) : (
            <input
              type="url"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com/article"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          )}
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex items-center space-x-2 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader size="sm" text="" />
            ) : (
              <>
                <FaMagic size={16} />
                <span>Summarize</span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={clearAll}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Summary Result */}
      {summary && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FaMagic className="mr-2 text-purple-500" />
              AI Summary
            </h3>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              {copied ? (
                <>
                  <FaCheck size={14} />
                  <span className="text-sm">Copied!</span>
                </>
              ) : (
                <>
                  <FaCopy size={14} />
                  <span className="text-sm">Copy</span>
                </>
              )}
            </button>
          </div>
          
          <div className="text-gray-700 leading-relaxed">
            {summary.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSummarizer; 