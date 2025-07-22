import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrendingUp, FiTrendingDown, FiMinus, FiPlus, FiStar } = FiIcons;

const KeywordResults = ({ keywords, filters }) => {
  const [savedKeywords, setSavedKeywords] = useState(new Set());
  const [sortBy, setSortBy] = useState('searchVolume');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredKeywords = keywords.filter(keyword => {
    if (keyword.searchVolume < filters.minSearchVolume) return false;
    if (keyword.difficulty > filters.maxDifficulty) return false;
    if (filters.intent !== 'all' && keyword.intent !== filters.intent) return false;
    return true;
  });

  const sortedKeywords = [...filteredKeywords].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    return (a[sortBy] - b[sortBy]) * multiplier;
  });

  const toggleSaveKeyword = (keyword) => {
    const newSaved = new Set(savedKeywords);
    if (newSaved.has(keyword)) {
      newSaved.delete(keyword);
    } else {
      newSaved.add(keyword);
    }
    setSavedKeywords(newSaved);
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty < 30) return 'text-green-600 bg-green-50';
    if (difficulty < 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return FiTrendingUp;
      case 'down': return FiTrendingDown;
      default: return FiMinus;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200"
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Keyword Results ({filteredKeywords.length})
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {savedKeywords.size} keywords saved for tracking
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="searchVolume">Search Volume</option>
              <option value="difficulty">Difficulty</option>
              <option value="cpc">CPC</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keyword</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPC</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Intent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedKeywords.map((keyword, index) => (
              <motion.tr
                key={keyword.keyword}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{keyword.keyword}</div>
                  <div className="text-xs text-gray-500 capitalize">{keyword.intent}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {keyword.searchVolume.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(keyword.difficulty)}`}>
                    {keyword.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  ${keyword.cpc.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full capitalize">
                    {keyword.intent}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <SafeIcon 
                    icon={getTrendIcon(keyword.trend)} 
                    className={`text-lg ${getTrendColor(keyword.trend)}`} 
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleSaveKeyword(keyword.keyword)}
                    className={`p-2 rounded-lg transition-colors ${
                      savedKeywords.has(keyword.keyword)
                        ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <SafeIcon icon={FiStar} className={savedKeywords.has(keyword.keyword) ? 'fill-current' : ''} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default KeywordResults;