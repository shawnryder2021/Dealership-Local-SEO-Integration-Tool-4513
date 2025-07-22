import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AuditForm from '../components/AuditForm';
import AuditResults from '../components/AuditResults';
import LoadingSpinner from '../components/LoadingSpinner';

const { FiSettings, FiCheckCircle, FiAlertTriangle, FiXCircle } = FiIcons;

const SiteAudit = () => {
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAudit = async (domain) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockAuditData = {
        domain,
        score: Math.floor(Math.random() * 30) + 70,
        performance: {
          score: Math.floor(Math.random() * 30) + 70,
          firstContentfulPaint: (Math.random() * 2 + 1).toFixed(1),
          largestContentfulPaint: (Math.random() * 3 + 2).toFixed(1),
          cumulativeLayoutShift: (Math.random() * 0.2).toFixed(3)
        },
        seo: {
          score: Math.floor(Math.random() * 30) + 70,
          issues: [
            'Missing meta descriptions on 12 pages',
            'Duplicate title tags found',
            'Images missing alt text',
            'Internal linking could be improved'
          ]
        },
        accessibility: {
          score: Math.floor(Math.random() * 30) + 70,
          issues: [
            'Low contrast text detected',
            'Missing ARIA labels',
            'Keyboard navigation issues'
          ]
        },
        technical: {
          score: Math.floor(Math.random() * 30) + 70,
          issues: [
            'Some images not optimized',
            'JavaScript bundles could be smaller',
            'Missing structured data'
          ]
        },
        localSeo: {
          score: Math.floor(Math.random() * 30) + 70,
          gmb: true,
          nap: false,
          localKeywords: true,
          reviews: 4.2,
          citations: 145
        }
      };
      
      setAuditData(mockAuditData);
    } catch (error) {
      console.error('Error running audit:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return FiCheckCircle;
    if (score >= 70) return FiAlertTriangle;
    return FiXCircle;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Site Audit</h1>
          <p className="text-gray-600 mt-2">Comprehensive technical and local SEO analysis</p>
        </div>
      </div>

      {auditData && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Score</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{auditData.score}</p>
              </div>
              <div className={`p-3 rounded-lg ${getScoreColor(auditData.score)}`}>
                <SafeIcon icon={getScoreIcon(auditData.score)} className="text-xl" />
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
                <p className="text-sm font-medium text-gray-600">Performance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{auditData.performance.score}</p>
              </div>
              <div className={`p-3 rounded-lg ${getScoreColor(auditData.performance.score)}`}>
                <SafeIcon icon={getScoreIcon(auditData.performance.score)} className="text-xl" />
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
                <p className="text-sm font-medium text-gray-600">SEO</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{auditData.seo.score}</p>
              </div>
              <div className={`p-3 rounded-lg ${getScoreColor(auditData.seo.score)}`}>
                <SafeIcon icon={getScoreIcon(auditData.seo.score)} className="text-xl" />
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
                <p className="text-sm font-medium text-gray-600">Accessibility</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{auditData.accessibility.score}</p>
              </div>
              <div className={`p-3 rounded-lg ${getScoreColor(auditData.accessibility.score)}`}>
                <SafeIcon icon={getScoreIcon(auditData.accessibility.score)} className="text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Local SEO</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{auditData.localSeo.score}</p>
              </div>
              <div className={`p-3 rounded-lg ${getScoreColor(auditData.localSeo.score)}`}>
                <SafeIcon icon={getScoreIcon(auditData.localSeo.score)} className="text-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <AuditForm onAudit={handleAudit} loading={loading} />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : auditData ? (
            <AuditResults auditData={auditData} />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <SafeIcon icon={FiSettings} className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Run Site Audit</h3>
              <p className="text-gray-600">Enter your domain to get a comprehensive SEO analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteAudit;