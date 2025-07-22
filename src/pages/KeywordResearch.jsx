import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import KeywordForm from '../components/KeywordForm';
import KeywordResults from '../components/KeywordResults';
import LoadingSpinner from '../components/LoadingSpinner';

const { FiSearch, FiFilter, FiDownload } = FiIcons;

const KeywordResearch = () => {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    minSearchVolume: 100,
    maxDifficulty: 70,
    intent: 'all'
  });

  const handleSearch = async (searchData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockKeywords = [
        {
          keyword: `${searchData.keyword} near me`,
          searchVolume: 2400,
          difficulty: 45,
          cpc: 3.20,
          intent: 'local',
          trend: 'up'
        },
        {
          keyword: `${searchData.keyword} dealership`,
          searchVolume: 1800,
          difficulty: 52,
          cpc: 4.15,
          intent: 'commercial',
          trend: 'stable'
        },
        {
          keyword: `best ${searchData.keyword} dealer`,
          searchVolume: 1200,
          difficulty: 38,
          cpc: 2.85,
          intent: 'commercial',
          trend: 'up'
        },
        {
          keyword: `${searchData.keyword} service center`,
          searchVolume: 950,
          difficulty: 35,
          cpc: 2.50,
          intent: 'local',
          trend: 'stable'
        },
        {
          keyword: `used ${searchData.keyword}`,
          searchVolume: 3200,
          difficulty: 62,
          cpc: 1.95,
          intent: 'commercial',
          trend: 'up'
        }
      ];
      
      setKeywords(mockKeywords);
    } catch (error) {
      console.error('Error fetching keywords:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportKeywords = () => {
    const csv = [
      ['Keyword', 'Search Volume', 'Difficulty', 'CPC', 'Intent', 'Trend'],
      ...keywords.map(k => [k.keyword, k.searchVolume, k.difficulty, k.cpc, k.intent, k.trend])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keywords.csv';
    a.click();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Keyword Research</h1>
          <p className="text-gray-600 mt-2">Discover high-value local SEO keywords for your dealership</p>
        </div>
        {keywords.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={exportKeywords}
            className="mt-4 md:mt-0 flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <SafeIcon icon={FiDownload} />
            <span>Export Keywords</span>
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <KeywordForm onSearch={handleSearch} loading={loading} />
          
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <SafeIcon icon={FiFilter} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Filters</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Search Volume
                </label>
                <input
                  type="number"
                  value={filters.minSearchVolume}
                  onChange={(e) => setFilters({...filters, minSearchVolume: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Difficulty
                </label>
                <input
                  type="number"
                  value={filters.maxDifficulty}
                  onChange={(e) => setFilters({...filters, maxDifficulty: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Intent
                </label>
                <select
                  value={filters.intent}
                  onChange={(e) => setFilters({...filters, intent: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Intents</option>
                  <option value="local">Local</option>
                  <option value="commercial">Commercial</option>
                  <option value="informational">Informational</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner />
            </div>
          ) : keywords.length > 0 ? (
            <KeywordResults keywords={keywords} filters={filters} />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <SafeIcon icon={FiSearch} className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Keyword Research</h3>
              <p className="text-gray-600">Enter a seed keyword to discover local SEO opportunities</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeywordResearch;