import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import StatCard from '../components/StatCard';
import QuickActions from '../components/QuickActions';
import RecentActivity from '../components/RecentActivity';
import PerformanceChart from '../components/PerformanceChart';

const { FiTrendingUp, FiMapPin, FiSearch, FiTarget } = FiIcons;

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalKeywords: 0,
    localRankings: 0,
    avgPosition: 0,
    monthlyTraffic: 0
  });

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalKeywords: 247,
        localRankings: 89,
        avgPosition: 12.4,
        monthlyTraffic: 15420
      });
    }, 1000);
  }, []);

  const statCards = [
    {
      title: 'Total Keywords',
      value: stats.totalKeywords,
      icon: FiSearch,
      color: 'blue',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Local Rankings',
      value: stats.localRankings,
      icon: FiMapPin,
      color: 'green',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Avg Position',
      value: stats.avgPosition.toFixed(1),
      icon: FiTarget,
      color: 'purple',
      change: '-2.1',
      changeType: 'positive'
    },
    {
      title: 'Monthly Traffic',
      value: stats.monthlyTraffic.toLocaleString(),
      icon: FiTrendingUp,
      color: 'orange',
      change: '+23%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your dealership's local SEO performance</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Connected:</span> DataForSEO API
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PerformanceChart />
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;