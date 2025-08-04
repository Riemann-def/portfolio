'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ChurnPredictionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600">← Back to Portfolio</span>
            </Link>
            <div className="text-sm text-gray-500">
              Sumauto Churn Prediction Project
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section - MODIFICADO */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <span className="mr-2">🚗</span>
              Zrive x Komorebi AI Collaboration
            </div>
            
            {/* AÑADIDO: Logos section */}
            <div className="flex justify-center items-center gap-8 mb-6">
              <div className="flex items-center">
                <img 
                  src="/zrive-logo.svg" 
                  alt="Zrive Logo" 
                  className="h-12 w-24 object-contain"
                />
              </div>
              <div className="text-gray-400 text-2xl">×</div>
              <div className="flex items-center">
                <img 
                  src="/komorebi-logo.png" 
                  alt="Komorebi AI Logo" 
                  className="h-12 w-24 object-contain"
                />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Churn Prediction for Sumauto
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Developing predictive models to identify advertiser churn in Spain's leading vehicle marketplace platform
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>📅 6-week project (Apr-Jul 2025)</span>
              <span>👥 Team: Markel, Dani, Carlos + Mentor Sergio Rozada</span>
              <span>📊 60% of users have churned historically</span>
            </div>
          </div>

          {/* Problem Context */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-md mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Business Challenge</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Sumauto is a marketplace for vehicle classified ads
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    High customer churn rates affecting revenue
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Need predictive models for proactive retention
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Understanding churn patterns and triggers
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-600">Key Discoveries</h3>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-red-800 font-medium mb-2">Gaming the System</p>
                  <p className="text-red-700 text-sm">
                    We discovered that many users appear to "game" the system by churning and returning 
                    repeatedly, likely to take advantage of new customer discounts and promotions.
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">60%</div>
                    <div className="text-sm text-blue-700">Historical churn rate</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">9%</div>
                    <div className="text-sm text-orange-700">Monthly churn rate</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Data & Methodology */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-8 shadow-md mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Data & Methodology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">📊 Advertiser Profiles</h4>
                <p className="text-sm text-gray-600">Demographics, location, contract history, group affiliations</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">📈 Monthly Metrics</h4>
                <p className="text-sm text-gray-600">Ad performance, engagement, pricing, premium services</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">❌ Withdrawal Records</h4>
                <p className="text-sm text-gray-600">Churn events, reasons, types, and recovery patterns</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Feature Engineering Approaches</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Simple Aggregation</h4>
                <p className="text-sm text-blue-700">Monthly features per advertiser</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Temporal Accumulation</h4>
                <p className="text-sm text-green-700">3-month rolling averages and trends</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">Time Series Structure</h4>
                <p className="text-sm text-purple-700">Sequential data for each advertiser</p>
              </div>
            </div>
          </motion.div>

          {/* Model Results - MODIFICADO */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-8 shadow-md mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Model Performance</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">PR-AUC Results by Prediction Horizon</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-[#eaeaea] h-20 flex items-end justify-center rounded-t">
                    <div className="bg-blue-600 w-full h-4 rounded-t"></div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-b">
                    <div className="text-lg font-bold text-blue-800">0.17</div>
                    <div className="text-xs text-blue-600">1 Month</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-[#eaeaea] h-20 flex items-end justify-center rounded-t">
                    <div className="bg-teal-600 w-full h-10 rounded-t"></div>
                  </div>
                  <div className="bg-teal-100 p-3 rounded-b">
                    <div className="text-lg font-bold text-teal-800">0.41</div>
                    <div className="text-xs text-teal-600">3 Months</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-[#eaeaea] h-20 flex items-end justify-center rounded-t">
                    <div className="bg-orange-600 w-full h-14 rounded-t"></div>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-b">
                    <div className="text-lg font-bold text-orange-800">0.58</div>
                    <div className="text-xs text-orange-600">6 Months</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-[#eaeaea] h-20 flex items-end justify-center rounded-t">
                    <div className="bg-red-600 w-full h-20 rounded-t"></div>
                  </div>
                  <div className="bg-red-100 p-3 rounded-b">
                    <div className="text-lg font-bold text-red-800">0.83</div>
                    <div className="text-xs text-red-600">Future</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                <strong>Best Model:</strong> Random Forest with max_depth=10
              </p>
            </div>

            {/* AÑADIDO: Churn Distribution Chart */}
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">Churn Rate Distribution by Prediction Horizon</h3>
              <div className="flex justify-center">
                <img 
                  src="/churn-distribution-chart.jpg" 
                  alt="Churn percentage distribution by time horizon and period"
                  className="max-w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              <p className="text-sm text-blue-700 mt-3 text-center">
                Distribution showing how churn rates vary across different prediction horizons (1, 3, 6 months, and future)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Key Model Insights</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Longer horizons show better predictability
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Simple aggregation outperformed complex temporal features
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Random Forest showed best overall performance
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Top Predictive Features</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="text-sm">Customer Tenure</span>
                    <div className="w-16 bg-blue-200 h-2 rounded-full">
                      <div className="w-full bg-blue-500 h-2 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="text-sm">Discount Rate</span>
                    <div className="w-16 bg-blue-200 h-2 rounded-full">
                      <div className="w-4/5 bg-blue-500 h-2 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="text-sm">Engagement Metrics</span>
                    <div className="w-16 bg-blue-200 h-2 rounded-full">
                      <div className="w-3/5 bg-blue-500 h-2 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Business Insights - MODIFICADO */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-md mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Business Insights</h2>
            
            {/* AÑADIDO: Gaming Pattern Visualization */}
            <div className="bg-white p-6 rounded-lg mb-8 border border-red-200">
              <h3 className="text-xl font-semibold mb-4 text-red-800">Evidence of System Gaming</h3>
              <p className="text-red-700 mb-4">
                Our analysis revealed clear patterns of users repeatedly churning and returning, 
                likely exploiting new customer promotions and discounts.
              </p>
              <div className="flex justify-center">
                <img 
                  src="/user-behavior-timeline.png" 
                  alt="Customer behavior pattern showing repeated churn and return cycles"
                  className="max-w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              <p className="text-sm text-red-600 mt-3 text-center">
                Example: User 4256 showing pattern of activity, churn, and return cycles across 2 years
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">Market Opportunities</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">📈</span>
                    Premium ads show significantly higher efficiency
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">🎯</span>
                    Madrid & Barcelona concentrate premium usage
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">⚠️</span>
                    48.4% average discount rate with declining trend
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">🔍</span>
                    Engagement drops can serve as early warning signals
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Strategic Recommendations</h3>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-medium text-purple-800">1. Gaming Detection</h4>
                    <p className="text-sm text-purple-700">Implement systems to detect and prevent discount abuse</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-800">2. Proactive Retention</h4>
                    <p className="text-sm text-blue-700">Use engagement drops as early warning signals</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <h4 className="font-medium text-orange-800">3. Discount Optimization</h4>
                    <p className="text-sm text-orange-700">Reassess discount strategy to improve profitability</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Team & Technology */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Project Team</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      M
                    </div>
                    <div>
                      <div className="font-medium">Markel Ramiro</div>
                      <div className="text-sm text-gray-600">EDA & Time Series Modeling</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      D
                    </div>
                    <div>
                      <div className="font-medium">Dani</div>
                      <div className="text-sm text-gray-600">Feature Engineering</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      C
                    </div>
                    <div>
                      <div className="font-medium">Carlos</div>
                      <div className="text-sm text-gray-600">Model Development</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      S
                    </div>
                    <div>
                      <div className="font-medium">Sergio Rozada</div>
                      <div className="text-sm text-gray-600">Industry Mentor</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Pandas', 'Scikit-learn', 'Random Forest', 'Logistic Regression', 'Time Series', 'SHAP', 'Feature Engineering'].map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="mt-6">
                  <div className="text-sm text-gray-500 mb-2">Project Timeline</div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-sm font-medium">6 weeks (April - July 2025)</div>
                    <div className="text-xs text-gray-600">Part of Zrive Applied Data Science Program</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 text-center space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#projects"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to All Projects
              </Link>
              
              <a 
                href="#"
                className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                View Full Report (Coming Soon)
              </a>
            </div>
            
            <p className="text-sm text-gray-500">
              This project was conducted as part of the Zrive Applied Data Science Program<br/>
              in collaboration with Komorebi AI consultancy
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default ChurnPredictionPage;