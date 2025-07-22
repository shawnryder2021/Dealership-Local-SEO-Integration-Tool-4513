import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSettings, FiGlobe } = FiIcons;

const AuditForm = ({ onAudit, loading }) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (domain.trim()) {
      onAudit(domain.trim());
    }
  };

  const auditTypes = [
    {
      name: 'Performance',
      description: 'Page speed and Core Web Vitals',
      enabled: true
    },
    {
      name: 'SEO',
      description: 'On-page optimization analysis',
      enabled: true
    },
    {
      name: 'Accessibility',
      description: 'WCAG compliance check',
      enabled: true
    },
    {
      name: 'Local SEO',
      description: 'Local business optimization',
      enabled: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <SafeIcon icon={FiSettings} className="text-blue-600" />
        <h3 className="font-semibold text-gray-900">Site Audit</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website Domain
          </label>
          <div className="relative">
            <SafeIcon icon={FiGlobe} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g., yourdealership.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Running Audit...' : 'Start Audit'}
        </motion.button>
      </form>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Audit Includes</h4>
        <div className="space-y-3">
          {auditTypes.map((type) => (
            <div key={type.name} className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-blue-100 rounded border-2 border-blue-500 flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-blue-500 rounded"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{type.name}</p>
                <p className="text-xs text-gray-600">{type.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AuditForm;