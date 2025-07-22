import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import KeywordResearch from './pages/KeywordResearch';
import LocalRankings from './pages/LocalRankings';
import CompetitorAnalysis from './pages/CompetitorAnalysis';
import SiteAudit from './pages/SiteAudit';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/keywords" element={<KeywordResearch />} />
            <Route path="/rankings" element={<LocalRankings />} />
            <Route path="/competitors" element={<CompetitorAnalysis />} />
            <Route path="/audit" element={<SiteAudit />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;