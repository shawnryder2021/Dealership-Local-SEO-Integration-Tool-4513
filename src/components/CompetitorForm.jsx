import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUsers, FiPlus, FiX } = FiIcons;

const CompetitorForm = ({ onAnalyze, loading }) => {
  const [domains, setDomains] = useState(['']);

  const addDomain = () => {
    setDomains([...domains, '']);
  };

  const removeDomain = (index) => {
    setDomains(domains.filter((_, i) => i !== index));
  };

  const updateDomain = (index, value) => {
    const newDomains = [...domains];
    newDomains[index] = value;
    setDomains(newDomains);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validDomains = domains.filter(domain => domain.trim());
    if (validDomains.length > 0) {
      onAnalyze(validDomains);
    }
  };

  const popularCompetitors = [
    'autonation.com',
    'carmax.com',
    'carvana.com',
    'vroom.com',
    'cars.com'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <SafeIcon icon={FiUsers} className="text-blue-600" />
        <h3 className="font-semibold text-gray-900">Competitor Analysis</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Competitor Domains
          </label>
          <div className="space-y-2">
            {domains.map((domain, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => updateDomain(index, e.target.value)}
                  placeholder="e.g., competitor-dealer.com"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {domains.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDomain(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <SafeIcon icon={FiX} />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {domains.length < 5 && (
            <button
              type="button"
              onClick={addDomain}
              className="mt-2 flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <SafeIcon icon={FiPlus} />
              <span>Add another domain</span>
            </button>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={loading || !domains.some(d => d.trim())}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Analyze Competitors'}
        </motion.button>
      </form>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Competitors</h4>
        <div className="space-y-2">
          {popularCompetitors.map((competitor) => (
            <button
              key={competitor}
              onClick={() => setDomains([competitor])}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {competitor}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CompetitorForm;