import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrendingUp, FiTrendingDown } = FiIcons;

const StatCard = ({ title, value, icon, color, change, changeType }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200'
  };

  const changeColorClasses = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
          <SafeIcon icon={icon} className="text-xl" />
        </div>
      </div>
      
      {change && (
        <div className="flex items-center mt-4">
          <SafeIcon 
            icon={changeType === 'positive' ? FiTrendingUp : FiTrendingDown} 
            className={`text-sm mr-1 ${changeColorClasses[changeType]}`} 
          />
          <span className={`text-sm font-medium ${changeColorClasses[changeType]}`}>
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last month</span>
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;