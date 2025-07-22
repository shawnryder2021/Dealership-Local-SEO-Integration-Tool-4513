import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiMapPin } = FiIcons;

const KeywordForm = ({ onSearch, loading }) => {
  const [formData, setFormData] = useState({
    keyword: '',
    location: '',
    language: 'English'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.keyword.trim()) {
      onSearch(formData);
    }
  };

  const popularKeywords = [
    'Honda dealer',
    'Toyota dealership',
    'Ford service',
    'Chevrolet parts',
    'used cars',
    'car financing'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <SafeIcon icon={FiSearch} className="text-blue-600" />
        <h3 className="font-semibold text-gray-900">Keyword Research</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seed Keyword
          </label>
          <input
            type="text"
            value={formData.keyword}
            onChange={(e) => setFormData({...formData, keyword: e.target.value})}
            placeholder="e.g., Honda dealer"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <SafeIcon icon={FiMapPin} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="e.g., Los Angeles, CA"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={formData.language}
            onChange={(e) => setFormData({...formData, language: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Researching...' : 'Research Keywords'}
        </motion.button>
      </form>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {popularKeywords.map((keyword) => (
            <button
              key={keyword}
              onClick={() => setFormData({...formData, keyword})}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default KeywordForm;