import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import LoadingSpinner from './LoadingSpinner';

const { FiTrendingUp, FiTrendingDown, FiMinus, FiMapPin, FiExternalLink } = FiIcons;

const RankingTable = ({ rankings, loading }) => {
  const getPositionChange = (current, previous) => {
    const change = previous - current;
    if (change > 0) return { value: `+${change}`, type: 'positive', icon: FiTrendingUp };
    if (change < 0) return { value: change.toString(), type: 'negative', icon: FiTrendingDown };
    return { value: '0', type: 'neutral', icon: FiMinus };
  };

  const getPositionColor = (position) => {
    if (position <= 3) return 'text-green-600 bg-green-50';
    if (position <= 10) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200"
    >
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Current Rankings</h3>
        <p className="text-sm text-gray-600 mt-1">Real-time position tracking</p>
      </div>

      <div className="overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          {rankings.map((ranking, index) => {
            const change = getPositionChange(ranking.currentPosition, ranking.previousPosition);
            
            return (
              <motion.div
                key={ranking.keyword}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {ranking.keyword}
                      </p>
                      {ranking.localPack && (
                        <SafeIcon 
                          icon={FiMapPin} 
                          className="text-green-600 text-xs" 
                          title="Appears in Local Pack"
                        />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPositionColor(ranking.currentPosition)}`}>
                        #{ranking.currentPosition}
                      </span>
                      <div className={`flex items-center space-x-1 text-xs ${
                        change.type === 'positive' ? 'text-green-600' : 
                        change.type === 'negative' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        <SafeIcon icon={change.icon} />
                        <span>{change.value}</span>
                      </div>
                    </div>
                  </div>
                  
                  <a
                    href={ranking.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <SafeIcon icon={FiExternalLink} className="text-sm" />
                  </a>
                </div>
                
                <div className="mt-2">
                  <div className="text-xs text-gray-500">
                    Volume: {ranking.searchVolume.toLocaleString()}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default RankingTable;