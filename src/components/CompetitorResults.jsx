import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrendingUp, FiSearch, FiMapPin, FiEye, FiChevronDown, FiChevronUp } = FiIcons;

const CompetitorResults = ({ competitors }) => {
  const [expandedCompetitor, setExpandedCompetitor] = useState(null);

  const toggleExpanded = (domain) => {
    setExpandedCompetitor(expandedCompetitor === domain ? null : domain);
  };

  const getVisibilityColor = (visibility) => {
    const score = parseFloat(visibility);
    if (score >= 0.7) return 'text-green-600 bg-green-50';
    if (score >= 0.4) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {competitors.map((competitor, index) => (
        <motion.div
          key={competitor.domain}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{competitor.domain}</h3>
                <p className="text-sm text-gray-600">Competitor Analysis</p>
              </div>
              <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getVisibilityColor(competitor.visibility)}`}>
                {(parseFloat(competitor.visibility) * 100).toFixed(0)}% Visibility
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <SafeIcon icon={FiSearch} className="text-blue-600 text-xl mx-auto mb-1" />
                <p className="text-sm text-gray-600">Keywords</p>
                <p className="text-lg font-semibold text-gray-900">{competitor.organicKeywords.toLocaleString()}</p>
              </div>
              
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <SafeIcon icon={FiTrendingUp} className="text-green-600 text-xl mx-auto mb-1" />
                <p className="text-sm text-gray-600">Traffic</p>
                <p className="text-lg font-semibold text-gray-900">{competitor.organicTraffic.toLocaleString()}</p>
              </div>
              
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <SafeIcon icon={FiEye} className="text-purple-600 text-xl mx-auto mb-1" />
                <p className="text-sm text-gray-600">Avg Position</p>
                <p className="text-lg font-semibold text-gray-900">{competitor.avgPosition}</p>
              </div>
              
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <SafeIcon icon={FiMapPin} className="text-orange-600 text-xl mx-auto mb-1" />
                <p className="text-sm text-gray-600">Local Pack</p>
                <p className="text-lg font-semibold text-gray-900">{competitor.localPackAppearances}</p>
              </div>
            </div>

            <button
              onClick={() => toggleExpanded(competitor.domain)}
              className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-900">
                Top Keywords ({competitor.commonKeywords} common)
              </span>
              <SafeIcon 
                icon={expandedCompetitor === competitor.domain ? FiChevronUp : FiChevronDown} 
                className="text-gray-600"
              />
            </button>

            {expandedCompetitor === competitor.domain && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Top Keywords</h4>
                    <div className="space-y-2">
                      {competitor.topKeywords.map((keyword, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-white rounded">
                          <span className="text-sm text-gray-700">{keyword}</span>
                          <span className="text-xs text-gray-500">#{Math.floor(Math.random() * 10) + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Opportunities</h4>
                    <div className="space-y-2">
                      <div className="p-2 bg-green-50 border border-green-200 rounded">
                        <p className="text-sm text-green-800">High-volume keywords with low competition</p>
                      </div>
                      <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-sm text-blue-800">Local pack opportunities</p>
                      </div>
                      <div className="p-2 bg-purple-50 border border-purple-200 rounded">
                        <p className="text-sm text-purple-800">Content gap analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CompetitorResults;