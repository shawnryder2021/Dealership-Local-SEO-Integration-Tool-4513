import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import CompetitorForm from '../components/CompetitorForm';
import CompetitorResults from '../components/CompetitorResults';
import LoadingSpinner from '../components/LoadingSpinner';

const { FiUsers, FiTrendingUp, FiSearch, FiGlobe } = FiIcons;

const CompetitorAnalysis = () => {
  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (domains) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const mockCompetitors = domains.map((domain, index) => ({
        domain,
        organicKeywords: Math.floor(Math.random() * 5000) + 1000,
        organicTraffic: Math.floor(Math.random() * 50000) + 10000,
        avgPosition: (Math.random() * 15 + 5).toFixed(1),
        localPackAppearances: Math.floor(Math.random() * 50) + 20,
        commonKeywords: Math.floor(Math.random() * 200) + 50,
        visibility: (Math.random() * 0.8 + 0.2).toFixed(2),
        topKeywords: [
          `${domain.split('.')[0]} dealer`,
          `${domain.split('.')[0]} service`,
          `used cars ${domain.split('.')[0]}`,
          `${domain.split('.')[0]} parts`,
          `${domain.split('.')[0]} financing`
        ]
      }));
      
      setCompetitors(mockCompetitors);
    } catch (error) {
      console.error('Error analyzing competitors:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = competitors.length > 0 ? {
    avgKeywords: Math.floor(competitors.reduce((sum, c) => sum + c.organicKeywords, 0) / competitors.length),
    avgTraffic: Math.floor(competitors.reduce((sum, c) => sum + c.organicTraffic, 0) / competitors.length),
    avgPosition: (competitors.reduce((sum, c) => sum + parseFloat(c.avgPosition), 0) / competitors.length).toFixed(1),
    totalCommon: competitors.reduce((sum, c) => sum + c.commonKeywords, 0)
  } : null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Competitor Analysis</h1>
          <p className="text-gray-600 mt-2">Analyze competing dealerships and discover opportunities</p>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Keywords</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgKeywords.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                <SafeIcon icon={FiSearch} className="text-xl" />
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
                <p className="text-sm font-medium text-gray-600">Avg Traffic</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgTraffic.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 text-green-600">
                <SafeIcon icon={FiTrendingUp} className="text-xl" />
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
                <p className="text-sm font-medium text-gray-600">Avg Position</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgPosition}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                <SafeIcon icon={FiGlobe} className="text-xl" />
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
                <p className="text-sm font-medium text-gray-600">Common Keywords</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalCommon}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
                <SafeIcon icon={FiUsers} className="text-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <CompetitorForm onAnalyze={handleAnalyze} loading={loading} />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : competitors.length > 0 ? (
            <CompetitorResults competitors={competitors} />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <SafeIcon icon={FiUsers} className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Analyze Your Competitors</h3>
              <p className="text-gray-600">Enter competitor domains to discover their SEO strategies</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitorAnalysis;