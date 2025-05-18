import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ZriveProjectSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const courseModules = [
    { id: 'module1', title: 'Intro to Applied Data Science', status: 'completed' },
    { id: 'module2', title: 'Exploratory Data Analysis', status: 'completed' },
    { id: 'module3', title: 'Fundamentals of Statistical Learning', status: 'in-progress' },
    { id: 'module4', title: 'Model Fitting', status: 'upcoming' },
    { id: 'module5', title: 'Analyse, Diagnose and Improve a Model', status: 'upcoming' },
    { id: 'module6', title: 'Business Translation', status: 'upcoming' },
    { id: 'module7', title: 'System Design', status: 'upcoming' },
    { id: 'final', title: 'Final Project with Industry Partner', status: 'upcoming' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            In Progress
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            Upcoming
          </span>
        );
    }
  };

  return (
    <section id="zrive-project" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Zrive Data Science Program</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Currently enrolled in an intensive Applied Data Science program, developing industry-ready skills through hands-on projects and real-world applications.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8 flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overview' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Program Overview
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'modules' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveTab('modules')}
          >
            Modules
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'projects' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            Current Project
          </button>
        </div>

        {/* Content based on active tab */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Zrive Applied Data Science</h3>
                    <p className="text-gray-600">Apr 2025 - Jul 2025</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-700">33%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: '33%' }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-4 text-gray-700">
                  <p>
                    Zrive Applied Data Science is a 15-week intensive part-time program designed for high-performing students and professionals who want to launch their careers as Data Scientists.
                  </p>
                  <p>
                    The program combines theoretical knowledge with practical application through hands-on projects and real-world case studies, culminating in a 5-week real business project with an industry partner.
                  </p>
                  <div className="mt-6">
                    <h4 className="font-semibold text-lg mb-2">Program Highlights:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>50+ hours of live online sessions with industry experts</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Individual mock interviews with mentors from companies like Vodafone and Revolut</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>5-week real-world project with industry partner</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Hands-on experience with industry tools and best practices</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'modules' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Program Curriculum</h3>
                  <div className="space-y-4">
                    {courseModules.map((module, index) => (
                      <div 
                        key={module.id}
                        className={`p-4 rounded-lg border ${
                          module.status === 'in-progress' 
                            ? 'border-blue-200 bg-blue-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              module.status === 'completed' 
                                ? 'bg-green-100 text-green-600' 
                                : module.status === 'in-progress'
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'bg-gray-100 text-gray-600'
                            }`}>
                              {module.status === 'completed' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span>{index + 1}</span>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{module.title}</h4>
                            </div>
                          </div>
                          <div>
                            {getStatusBadge(module.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4">Current Project: Push Notification Predictor</h3>
                
                <div className="mb-6 flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Module 3: ML Fundamentals
                  </span>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <p>
                    Currently working on developing a machine learning classifier that predicts whether a user would purchase a specific product if sent a push notification, optimizing marketing efforts for an e-commerce grocery platform.
                  </p>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold text-lg mb-2">Project Highlights:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Implementing various ML pipeline configurations including different encoding techniques and linear models</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Optimizing model threshold to balance precision and recall based on business requirements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Creating a robust model versioning system to track performance and history</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Building a production-ready pipeline for data loading, preprocessing, model training and prediction</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-lg mb-2">Business Context:</h4>
                    <p className="mb-2">
                      Push notifications in the e-commerce app have only a 5% open rate. Irrelevant notifications cause user fatigue and may lead to app uninstalls, so the model needs to balance precision (relevance) with reach (recall).
                    </p>
                    <p>
                      The solution focuses on predicting which users are likely to purchase specific products when buying 5+ items, enabling targeted marketing that minimizes disruption while maximizing sales impact.
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <a 
                      href="https://github.com/Riemann-def/zrive-ds"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      View Project Repository
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ZriveProjectSection;