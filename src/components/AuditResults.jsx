import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheckCircle, FiAlertTriangle, FiXCircle, FiClock, FiMapPin, FiStar, FiEye, FiChevronDown, FiChevronUp } = FiIcons;

const AuditResults = ({ auditData }) => {
  const [expandedSection, setExpandedSection] = useState('performance');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return FiCheckCircle;
    if (score >= 70) return FiAlertTriangle;
    return FiXCircle;
  };

  const sections = [
    {
      id: 'performance',
      title: 'Performance',
      score: auditData.performance.score,
      icon: FiClock,
      data: auditData.performance
    },
    {
      id: 'seo',
      title: 'SEO',
      score: auditData.seo.score,
      icon: FiEye,
      data: auditData.seo
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      score: auditData.accessibility.score,
      icon: FiCheckCircle,
      data: auditData.accessibility
    },
    {
      id: 'localSeo',
      title: 'Local SEO',
      score: auditData.localSeo.score,
      icon: FiMapPin,
      data: auditData.localSeo
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Audit Results for {auditData.domain}</h3>
            <p className="text-sm text-gray-600">Comprehensive site analysis completed</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(auditData.score)}`}>
              {auditData.score}
            </div>
            <p className="text-sm text-gray-600">Overall Score</p>
          </div>
        </div>
      </div>

      {sections.map((section, index) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-gray-100">
                <SafeIcon icon={section.icon} className="text-xl text-gray-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                <p className="text-sm text-gray-600">Score: {section.score}/100</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <SafeIcon 
                icon={getScoreIcon(section.score)} 
                className={`text-2xl ${getScoreColor(section.score)}`} 
              />
              <SafeIcon 
                icon={expandedSection === section.id ? FiChevronUp : FiChevronDown} 
                className="text-gray-400"
              />
            </div>
          </button>

          {expandedSection === section.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 p-6"
            >
              {section.id === 'performance' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">First Contentful Paint</p>
                      <p className="text-xl font-bold text-blue-900">{section.data.firstContentfulPaint}s</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">Largest Contentful Paint</p>
                      <p className="text-xl font-bold text-green-900">{section.data.largestContentfulPaint}s</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-600 font-medium">Cumulative Layout Shift</p>
                      <p className="text-xl font-bold text-purple-900">{section.data.cumulativeLayoutShift}</p>
                    </div>
                  </div>
                </div>
              )}

              {section.id === 'localSeo' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Google My Business</span>
                        <SafeIcon 
                          icon={section.data.gmb ? FiCheckCircle : FiXCircle} 
                          className={section.data.gmb ? 'text-green-600' : 'text-red-600'} 
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">NAP Consistency</span>
                        <SafeIcon 
                          icon={section.data.nap ? FiCheckCircle : FiXCircle} 
                          className={section.data.nap ? 'text-green-600' : 'text-red-600'} 
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Local Keywords</span>
                        <SafeIcon 
                          icon={section.data.localKeywords ? FiCheckCircle : FiXCircle} 
                          className={section.data.localKeywords ? 'text-green-600' : 'text-red-600'} 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <SafeIcon icon={FiStar} className="text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">Review Rating</span>
                        </div>
                        <p className="text-2xl font-bold text-yellow-900">{section.data.reviews}/5.0</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">Citations Found</p>
                        <p className="text-2xl font-bold text-blue-900">{section.data.citations}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(section.id === 'seo' || section.id === 'accessibility') && section.data.issues && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Issues Found</h4>
                  <div className="space-y-2">
                    {section.data.issues.map((issue, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <SafeIcon icon={FiAlertTriangle} className="text-red-600 mt-0.5" />
                        <span className="text-sm text-red-800">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AuditResults;