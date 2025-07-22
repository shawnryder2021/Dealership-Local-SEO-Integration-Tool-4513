import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiTrendingUp, FiUsers, FiSettings, FiPlus } = FiIcons;

const QuickActions = () => {
  const actions = [
    {
      title: 'Research Keywords',
      description: 'Find local SEO opportunities',
      icon: FiSearch,
      href: '/keywords',
      color: 'blue'
    },
    {
      title: 'Check Rankings',
      description: 'Monitor local search positions',
      icon: FiTrendingUp,
      href: '/rankings',
      color: 'green'
    },
    {
      title: 'Analyze Competitors',
      description: 'Compare with local dealers',
      icon: FiUsers,
      href: '/competitors',
      color: 'purple'
    },
    {
      title: 'Site Audit',
      description: 'Technical SEO analysis',
      icon: FiSettings,
      href: '/audit',
      color: 'orange'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    orange: 'bg-orange-500 hover:bg-orange-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <SafeIcon icon={FiPlus} className="text-gray-400" />
      </div>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={action.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
              >
                <div className={`p-2 rounded-lg text-white ${colorClasses[action.color]}`}>
                  <SafeIcon icon={action.icon} className="text-lg" />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-900">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;