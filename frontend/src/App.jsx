import React, { useState } from 'react';
import { FaNewspaper, FaMagic, FaBars, FaTimes } from 'react-icons/fa';
import LandingPage from './pages/LandingPage';
import CustomSummarizer from './components/CustomSummarizer';

const App = () => {
  const [currentPage, setCurrentPage] = useState('news'); // 'news' or 'custom'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    {
      name: 'Latest News',
      id: 'news',
      icon: FaNewspaper,
      description: 'Fetch and summarize latest headlines'
    },
    {
      name: 'Custom Summarizer',
      id: 'custom',
      icon: FaMagic,
      description: 'Summarize your own articles'
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img
                src="/newfavicon.png"
                alt="SummAIzer logo"
                className="w-9 h-9 object-contain"
              />
              <span className="text-2xl font-bold text-gray-900">SummAIzer</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${currentPage === item.id
                        ? 'bg-indigo-500 text-white'
                        : 'text-gray-600 hover:text-indigo-500 hover:bg-indigo-50'
                      }`}
                  >
                    <Icon size={16} />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${currentPage === item.id
                          ? 'bg-indigo-500 text-white'
                          : 'text-gray-600 hover:text-indigo-500 hover:bg-indigo-50'
                        }`}
                    >
                      <Icon size={18} />
                      <div className="text-left">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm opacity-75">{item.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {currentPage === 'news' ? (
          <LandingPage />
        ) : (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CustomSummarizer />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FaNewspaper className="text-indigo-500 text-xl" />
              <span className="text-lg font-semibold text-gray-900">SummAIzer-AI News Summarizer</span>
            </div>
            <p className="text-gray-600 text-sm">
              Powered by NewsAPI and OpenAI GPT.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              © 2025 AI News Summarizer. A modern news reading experience.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
