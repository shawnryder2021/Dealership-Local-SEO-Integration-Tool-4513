import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiActivity, FiTrendingUp, FiTrendingDown, FiSearch, FiMapPin } = FiIcons;

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'ranking_improvement',
      message: 'Keyword "Honda dealer near me" improved to position 3',
      time: '2 hours ago',
      icon: FiTrendingUp,
      color: 'green'
    },
    {
      id: 2,
      type: 'new_keyword',
      message: 'Added 15 new local keywords to tracking',
      time: '4 hours ago',
      icon: FiSearch,
      color: 'blue'
    },
    {
      id: 3,
      type: 'local_pack',
      message: 'Appeared in local pack for "Toyota dealership"',
      time: '6 hours ago',
      icon: FiMapPin,
      color: 'purple'
    },
    {
      id: 4,
      type: 'ranking_drop',
      message: 'Keyword "used cars" dropped to position 8',
      time: '1 day ago',
      icon: FiTrendingDown,
      color: 'red'
    },
    {
      id: 5,
      type: 'competitor',
      message: 'Competitor analysis completed for 5 dealers',
      time: '2 days ago',
      icon: FiActivity,
      color: 'orange'
    }
  ];

  const colorClasses = {
    green: 'bg-green-50 text-green-600 border-green-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <SafeIcon icon={FiActivity} className="text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-lg border ${colorClasses[activity.color]}`}>
              <SafeIcon icon={activity.icon} className="text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;