import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ZriveProjectSection = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('overview');

  const modules = [
    {
      id: 'module1',
      title: 'Module 1: Applied Data Science Intro',
      subtitle: 'Professional API Integration & Data Visualization',
      period: 'Apr 2025',
      status: 'completed',
      description: 'Built enterprise-grade Python development practices through a weather data analysis pipeline with robust API integration, comprehensive error handling, and professional development workflows.',
      technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Poetry', 'Black', 'MyPy', 'Pytest'],
      highlights: [
        'Robust API client with exponential backoff and rate limiting',
        'Production-ready code with comprehensive testing and type safety',
        'Advanced temporal resampling and multi-city comparative analysis',
        'Professional development workflow with linting, formatting, and CI/CD'
      ],
      keyLearning: 'Enterprise-grade Python development and API integration patterns',
      githubLink: 'https://github.com/Riemann-def/zrive-ds/tree/main/src/module_1',
      icon: '🌡️'
    },
    {
      id: 'module2',
      title: 'Module 2: Exploratory Data Analysis',
      subtitle: 'Real-World E-commerce Data Investigation',
      period: 'Apr 2025',
      status: 'completed',
      description: 'Deep dive into messy e-commerce data from a groceries platform, tackling missing values, nested structures, and extracting business insights from imperfect real-world datasets.',
      technologies: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Boto3', 'AWS S3', 'Jupyter'],
      highlights: [
        'Analyzed complex nested e-commerce data with 93% missing demographics',
        'AWS S3 integration for large dataset processing',
        'Business hypothesis validation through statistical analysis',
        'Cart abandonment and user engagement pattern discovery'
      ],
      keyLearning: 'Real-world data is messy - embrace imperfection and focus on business insights',
      githubLink: 'https://github.com/Riemann-def/zrive-ds/tree/main/src/module_2',
      icon: '🛒'
    },
    {
      id: 'module3',
      title: 'Module 3: Statistical Learning Fundamentals',
      subtitle: 'Push Notification Prediction System',
      period: 'May 2025',
      status: 'completed',
      description: 'Built ML pipeline to predict customer purchase behavior for targeted push notifications, learning that model selection is ultimately a business decision, not just technical.',
      technologies: ['Scikit-learn', 'Pandas', 'Logistic Regression', 'Ridge', 'Lasso', 'Cross-validation'],
      highlights: [
        'Implemented bias-variance trade-off with Ridge/Lasso regularization',
        'Business-focused metric selection (Precision over Recall)',
        'Production-ready model versioning and inference pipeline',
        'Custom threshold optimization for business KPIs'
      ],
      keyLearning: 'Model selection must align with business objectives - technical metrics alone are insufficient',
      githubLink: 'https://github.com/Riemann-def/zrive-ds/tree/main/src/module_3',
      icon: '📱'
    },
    {
      id: 'module4',
      title: 'Module 4: Advanced Statistical Learning',
      subtitle: 'Non-Linear Models & Ensemble Methods',
      period: 'May 2025',
      status: 'completed',
      description: 'Extended linear foundations with sophisticated ensemble methods and neural networks, exploring Decision Trees, Random Forest, LightGBM, and deep learning approaches.',
      technologies: ['LightGBM', 'Random Forest', 'Decision Trees', 'Neural Networks', 'Scikit-learn', 'TensorFlow'],
      highlights: [
        'Comprehensive model comparison across linear to deep learning',
        'LightGBM optimization with hyperparameter tuning',
        'AUC-PR metric implementation for imbalanced datasets',
        'Feature importance analysis and model interpretability'
      ],
      keyLearning: 'Model complexity should match problem complexity - non-linear gains are often marginal',
      githubLink: 'https://github.com/Riemann-def/zrive-ds/tree/main/src/module_4',
      icon: '🌳'
    },
    {
      id: 'module5',
      title: 'Module 5: Model Analysis & Improvement',
      subtitle: 'Financial Prediction with Advanced Diagnostics',
      period: 'May 2025',
      status: 'completed',
      description: 'Advanced model diagnostics for stock market prediction, focusing on identifying data leakage, SHAP analysis, and systematic model improvement strategies.',
      technologies: ['SHAP', 'LightGBM', 'PCA', 'Financial Modeling', 'Walk-Forward Validation', 'Feature Engineering'],
      highlights: [
        'Critical data leakage detection and resolution',
        'SHAP analysis revealing model decision patterns',
        'PCA implementation for feature dimensionality reduction',
        'Walk-forward validation for temporal financial data'
      ],
      keyLearning: 'Comprehensive diagnostics separate successful deployments from costly failures',
      githubLink: 'https://github.com/Riemann-def/zrive-ds/tree/main/src/module_5',
      icon: '📈'
    },
    {
      id: 'module6',
      title: 'Module 6: Business Translation',
      subtitle: 'Workshop - Stakeholder Communication',
      period: 'Jun 2025',
      status: 'completed',
      description: 'Presential workshop focused on translating technical ML results into business language, problem abstraction, and systematic approaches to frame business problems as data science solutions.',
      technologies: ['Problem Framing', 'Business Communication', 'Stakeholder Management', 'Data Storytelling'],
      highlights: [
        'Real-world case studies: airline overbooking, e-commerce recommendations, contextual marketing',
        'Systematic approach to define measurable business problems',
        'Technical to business translation methodologies',
        'Collaborative problem-solving sessions with industry scenarios'
      ],
      keyLearning: 'Data problems are numerical abstractions of real business phenomena - proper framing is crucial',
      githubLink: '#', // No specific repository for workshop
      workshopImage: '/presencial_talk.jpg',
      icon: '💼'
    },
    {
      id: 'module7',
      title: 'Module 7: System Design',
      subtitle: 'Production ML Systems & Infrastructure',
      period: 'Jun 2025',
      status: 'completed',
      description: 'Comprehensive system design for production ML applications, including API development, feature stores, model registries, and monitoring infrastructure.',
      technologies: ['API Development', 'Docker', 'Feature Store', 'Model Registry', 'MLOps', 'System Design'],
      highlights: [
        'Production-ready ML API development',
        'Feature store implementation and management',
        'Model registry for version control and deployment',
        'End-to-end MLOps pipeline design'
      ],
      keyLearning: 'Production ML systems require robust infrastructure and monitoring',
      githubLink: 'https://github.com/Riemann-def/zrive-ds/tree/main/src/module_7',
      icon: '🏗️'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 border border-green-200">
            ✅ Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            🔄 In Progress
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
            ⏳ Upcoming
          </span>
        );
    }
  };

  const renderModuleContent = (module: typeof modules[number]) => (
    <motion.div
      key={module.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
    >
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="text-3xl mr-4">{module.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
              <p className="text-blue-600 font-medium">{module.subtitle}</p>
              <p className="text-sm text-gray-500">{module.period}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {getStatusBadge(module.status)}
          </div>
        </div>
        
        <p className="text-gray-700 mb-6">{module.description}</p>

        {/* Workshop Image */}
        {module.workshopImage && (
          <div className="mb-6">
            <img 
              src={module.workshopImage} 
              alt={`${module.title} workshop`}
              className="w-full rounded-lg shadow-md"
            />
          </div>
        )}
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Key Achievements:</h4>
          <ul className="space-y-2">
            {module.highlights.map((highlight: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2 mt-0.5">▸</span>
                <span className="text-gray-600 text-sm">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {module.technologies.map((tech: string, index: number) => (
              <span 
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Key Learning:</h4>
          <p className="text-blue-800 text-sm italic">&ldquo;{module.keyLearning}&rdquo;</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href={module.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View Project
          </a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="zrive-project" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Zrive Applied Data Science Program</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-4xl mx-auto text-lg">
            Intensive 15-week program developing industry-ready data science skills through hands-on projects, 
            real-world case studies, and collaboration with industry experts from leading tech companies.
          </p>
        </motion.div>

        {/* Navigation Pills */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeModule === 'overview' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
            onClick={() => setActiveModule('overview')}
          >
            📋 Program Overview
          </button>
          {modules.map((module) => (
            <button
              key={module.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeModule === module.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
              }`}
              onClick={() => setActiveModule(module.id)}
            >
              {module.icon} {module.title.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="max-w-5xl mx-auto">
          {activeModule === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Program Highlights</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-0.5">🎯</span>
                        <div>
                          <span className="font-medium">50+ hours</span> of live online sessions with industry experts
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-0.5">👥</span>
                        <div>
                          <span className="font-medium">Individual mentoring</span> with professionals from Vodafone, Revolut, and Meta
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-0.5">🏢</span>
                        <div>
                          <span className="font-medium">Real industry project</span> with business partner collaboration
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-0.5">🛠️</span>
                        <div>
                          <span className="font-medium">Production-ready skills</span> with industry tools and best practices
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Learning Journey</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 text-sm font-bold">✓</span>
                        </div>
                        <div>
                          <div className="font-medium">Foundation Phase</div>
                          <div className="text-sm text-gray-600">API Integration & Professional Python</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 text-sm font-bold">✓</span>
                        </div>
                        <div>
                          <div className="font-medium">Exploration Phase</div>
                          <div className="text-sm text-gray-600">Real-world Data Analysis & EDA</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 text-sm font-bold">✓</span>
                        </div>
                        <div>
                          <div className="font-medium">Modeling Phase</div>
                          <div className="text-sm text-gray-600">Statistical Learning & Advanced ML</div>
                        </div>
                      </div>
                        <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 text-sm font-bold">✓</span>
                        </div>
                        <div>
                          <div className="font-medium">Production Phase</div>
                          <div className="text-sm text-gray-600">System Design & Business Translation</div>
                        </div>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">🎯 Core Philosophy</h4>
                  <p className="text-gray-700">
                    Unlike traditional academic programs, Zrive focuses on <strong>applied data science</strong> with 
                    real business problems, messy datasets, and production constraints. Every module builds practical 
                    skills that translate directly to industry work, emphasizing business impact over theoretical perfection.
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="/certificate"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      View Program Certificate
                    </a>
                    
                    <a 
                      href="https://club.zriveapp.com/miembros/markel-ramiro-vaquero/courses/certificates/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Verify on Zrive
                    </a>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Direct certificate link: <span className="text-blue-600 font-mono">markelramiro.com/certificate</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {modules.map((module) => 
            activeModule === module.id ? renderModuleContent(module) : null
          )}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-blue-600 font-bold text-3xl mb-2">7</div>
            <div className="text-gray-600 text-sm">Modules Completed</div>
          </div>
          <div className="text-center">
            <div className="text-blue-600 font-bold text-3xl mb-2">5+</div>
            <div className="text-gray-600 text-sm">Real Projects</div>
          </div>
          <div className="text-center">
            <div className="text-blue-600 font-bold text-3xl mb-2">15+</div>
            <div className="text-gray-600 text-sm">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-blue-600 font-bold text-3xl mb-2">100%</div>
            <div className="text-gray-600 text-sm">Industry Focus</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ZriveProjectSection;