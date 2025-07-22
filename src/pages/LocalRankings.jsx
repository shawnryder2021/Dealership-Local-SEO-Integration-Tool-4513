import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import RankingChart from '../components/RankingChart';
import RankingTable from '../components/RankingTable';
import LocationSelector from '../components/LocationSelector';

const { FiMapPin, FiTrendingUp, FiRefreshCw } = FiIcons;

const LocalRankings = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Los Angeles, CA');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRankings();
  }, [selectedLocation]);

  const loadRankings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockRankings = [
        {
          keyword: 'Honda dealer near me',
          currentPosition: 3,
          previousPosition: 5,
          localPack: true,
          url: 'https://yourdealership.com/honda',
          searchVolume: 2400
        },
        {
          keyword: 'Toyota dealership',
          currentPosition: 7,
          previousPosition: 8,
          localPack: false,
          url: 'https://yourdealership.com/toyota',
          searchVolume: 1800
        },
        {
          keyword: 'used cars Los Angeles',
          currentPosition: 12,
          previousPosition: 10,
          localPack: false,
          url: 'https://yourdealership.com/used',
          searchVolume: 3200
        },
        {
          keyword: 'car service center',
          currentPosition: 2,
          previousPosition: 2,
          localPack: true,
          url: 'https://yourdealership.com/service',
          searchVolume: 950
        },
        {
          keyword: 'auto financing',
          currentPosition: 15,
          previousPosition: 18,
          localPack: false,
          url: 'https://yourdealership.com/financing',
          searchVolume: 1200
        }
      ];
      
      setRankings(mockRankings);
    } catch (error) {
      console.error('Error loading rankings:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshRankings = async () => {
    setRefreshing(true);
    await loadRankings();
    setRefreshing(false);
  };

  const avgPosition = rankings.length > 0 
    ? (rankings.reduce((sum, r) => sum + r.currentPosition, 0) / rankings.length).toFixed(1)
    : 0;

  const localPackCount = rankings.filter(r => r.localPack).length;
  const improved = rankings.filter(r => r.currentPosition < r.previousPosition).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Local Rankings</h1>
          <p className="text-gray-600 mt-2">Track your local search positions and monitor performance</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <LocationSelector 
            value={selectedLocation} 
            onChange={setSelectedLocation} 
          />
          <motion.button
            onClick={refreshRankings}
            disabled={refreshing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <SafeIcon 
              icon={FiRefreshCw} 
              className={refreshing ? 'animate-spin' : ''} 
            />
            <span>Refresh</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Position</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{avgPosition}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <SafeIcon icon={FiTrendingUp} className="text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Local Pack</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{localPackCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <SafeIcon icon={FiMapPin} className="text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Improved</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{improved}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <SafeIcon icon={FiTrendingUp} className="text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Keywords</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{rankings.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <SafeIcon icon={FiTrendingUp} className="text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chart and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RankingChart rankings={rankings} />
        </div>
        <div>
          <RankingTable rankings={rankings} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default LocalRankings;