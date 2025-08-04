// src/app/components/ProjectsSection.tsx
"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: {
    demo?: string;
    code?: string;
    case?: string;
    download?: string;
    article?: string;
  };
  categories: string[]; // Cambiado de category a categories (array)
  featured?: boolean;
  status?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  technologies, 
  links,
  featured = false,
  status
}) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl overflow-hidden group ${
        featured 
          ? 'md:col-span-2 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-800/20' 
          : 'bg-zinc-900/40 border border-zinc-800/50'
      }`}
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-90"></div>
        
        {featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/20 backdrop-blur-sm rounded-full text-xs text-cyan-400 border border-cyan-500/30">
            Featured Project
          </div>
        )}

        {status && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-xs text-blue-400 border border-blue-500/30">
            {status}
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 w-full p-6 z-10">
          <h3 className="text-xl font-bold mb-2 font-space">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-zinc-800/70 backdrop-blur-sm rounded-full text-xs text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-zinc-400 text-sm mb-6 line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-3">
          {links.code && (
            <a 
              href={links.code} 
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              {t('projects.viewcode')}
            </a>
          )}
          
          {links.demo && (
            <a 
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer" 
              className="px-3 py-1.5 rounded-lg bg-cyan-800/30 hover:bg-cyan-700/40 text-sm text-cyan-300 border border-cyan-700/30 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {t('projects.viewdemo')}
            </a>
          )}
          
          {links.case && (
            <a 
              href={links.case}
              target="_blank"
              rel="noopener noreferrer" 
              className="px-3 py-1.5 rounded-lg bg-purple-800/30 hover:bg-purple-700/40 text-sm text-purple-300 border border-purple-700/30 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('projects.case')}
            </a>
          )}

          {links.download && (
            <a 
              href={links.download}
              target="_blank"
              rel="noopener noreferrer" 
              className="px-3 py-1.5 rounded-lg bg-green-800/30 hover:bg-green-700/40 text-sm text-green-300 border border-green-700/30 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('projects.download')}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  
  // Project categories - AÑADIDA NUEVA CATEGORÍA 'finance'
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'nlp', label: 'NLP' },
    { id: 'business', label: 'Business Projects' },
    { id: 'finance', label: 'Finance' } // NUEVA CATEGORÍA
  ];
  
  const projects = [
    {
      id: 1,
      title: t('projects.anomaly.title'),
      description: t('projects.anomaly.desc'),
      image: "/result.gif",
      technologies: ["Python", "Kubernetes", "Prometheus", "Flask", "Scikit-learn"],
      links: {
        code: "https://github.com/Riemann-def/anomaly-detection",
        case: "https://www.linkedin.com/pulse/monitoreo-y-detecci%C3%B3n-de-anomal%C3%ADas-en-apis-con-flask-ramiro-vaquero-mf2yc",
        download: "/tfg.pdf",
        demo: undefined,
        article: undefined,
      },
      categories: ["ml"], // Array con una categoría
      // featured: true
    },
    {
      id: 6,
      title: "Financial Prediction Model Diagnosis",
      description: "Model diagnostics for S&P 500 outperformance prediction. Identified data leakage, implemented SHAP analysis and PCA feature engineering to solve overfitting issues and achieve stable model performance.",
      image: "/sp500-training-curves.png",
      technologies: ["LightGBM", "SHAP", "Financial Modeling", "Walk-Forward Validation"],
      links: {
        code: "https://github.com/Riemann-def/zrive-ds/tree/main/src/module_5",
        case: "https://www.linkedin.com/posts/markel-ramiro-vaquero-92530319b_machinelearning-datascience-finanzas-activity-7358103392486879233-M7hh"
      },
      categories: ["ml", "finance"], // ACTUALIZADA - incluye finance
      featured: false
    },
    {
      id: 3,
      title: "Wippass - Event Ticketing Platform",
      description: "Full-stack ticketing platform that processed €25,000+ in transactions for local events.",
      image: "/wippass_cover.jpg",
      technologies: ["Python", "SQL", "AWS", "Payment Integration"],
      links: {
        article: "https://elreferente.es/opinion/wippass-de-una-solucion-personal-a-una-startup-de-venta-de-entradas-en-bilbao/",
        case: "https://www.linkedin.com/posts/markel-ramiro-vaquero-92530319b_cu%C3%A1nto-dinero-ha-procesado-wippass-para-activity-7190682971429883904-Je80"
      },
      categories: ["business"], // Array con una categoría
    },
    {
      id: 5,
      title: "Sumauto Churn Prediction",
      description: "Collaborative churn prediction project for Sumauto (vehicle classified ads platform) developed with Komorebi consultancy. Building ML models to predict advertiser abandonment based on performance and behavioral metrics.",
      image: "/Sumauto_Churn_Cover.png",
      technologies: ["Python", "ML", "Churn Analysis", "SHAP"],
      links: {
        case: "/churn-prediction-sumauto",
      },
      featured: true,
      categories: ["business", "ml"], // Array con múltiples categorías
    },
    {
      id: 2,
      title: t('projects.docmind.title'),
      description: t('projects.docmind.desc'),
      image: "/docmind.jpg",
      technologies: ["Python", "OpenAI", "Anthropic", "Azure", "OCR"],
      links: {
        // case: "https://www.linkedin.com/posts/markel-ramiro-vaquero-92530319b_cu%C3%A1nto-dinero-ha-procesado-wippass-para-activity-7190682971429883904-Je80"
      },
      categories: ["nlp"] // Array con una categoría
    },
  ];
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.categories.includes(filter));

    return (
      <section id="projects" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{t('projects.title')}</h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </motion.div>
          
          {/* Project filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  filter === category.id
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-blue-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Featured project (larger card) */}
          {filteredProjects.some(project => project.featured) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              {filteredProjects
                .filter(project => project.featured)
                .map((project) => (
                  <div 
                    key={project.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-1/2 relative h-80 lg:h-auto overflow-hidden">
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                            {t('projects.featured')}
                          </span>
                        </div>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-gray-900">{project.title}</h3>
                          <p className="text-gray-600 mb-6 line-clamp-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.technologies.map((tech, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {project.links.code && (
                            <a 
                              href={project.links.code}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-900 text-white text-sm transition-colors flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                              {t('projects.viewcode')}
                            </a>
                          )}

                          {project.links.article && (
                            <a 
                              href={project.links.article}
                              target="_blank"
                              rel="noopener noreferrer" 
                              className="inline-flex items-center px-5 py-2.5 bg-[#eb50e8] hover:bg-[#d13ad0] text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                              </svg>
                              {t('projects.readarticle')}
                            </a>
                          )}
                          
                          {project.links.case && (
                            <a 
                              href={project.links.case}
                              target="_blank"
                              rel="noopener noreferrer" 
                              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition-colors flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              {t('projects.case')}
                            </a>
                          )}
                          
                          {project.links.demo && (
                            <a 
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer" 
                              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm transition-colors flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {t('projects.viewdemo')}
                            </a>
                          )}
                          
                          {project.links.download && (
                            <a 
                              href={project.links.download}
                              download
                              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm transition-colors flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              {t('projects.download')}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
          
          {/* Other projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects
              .filter(project => !project.featured)
              .map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-100 group transition-all duration-300 h-full flex flex-col"
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-70"></div>
                    
                    <div className="absolute bottom-0 left-0 p-6 z-10">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <p className="text-gray-600 mb-4 flex-grow">
                      {project.description.length > 140 
                        ? `${project.description.substring(0, 140)}...` 
                        : project.description
                      }
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.links.code && (
                        <a 
                          href={project.links.code}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm transition-colors flex items-center gap-1.5"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          {t('projects.viewcode')}
                        </a>
                      )}

                      {project.links.article && (
                        <a 
                          href={project.links.article}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="inline-flex items-center px-5 py-2.5 bg-[#000] hover:bg-[#111] text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                          {t('projects.readarticle')}
                        </a>
                      )}
                      
                      {project.links.case && (
                        <a 
                          href={project.links.case}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="px-3 py-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm transition-colors flex items-center gap-1.5"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {t('projects.case')}
                        </a>
                      )}
                      
                      {project.links.demo && (
                        <a 
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="px-3 py-1.5 rounded-lg bg-green-100 hover:bg-green-200 text-green-800 text-sm transition-colors flex items-center gap-1.5"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {t('projects.viewdemo')}
                        </a>
                      )}

                      {Object.keys(project.links).length === 0 && (
                        <div className="px-3 py-1.5 rounded-lg bg-orange-100 text-orange-800 text-sm">
                          🔒 Private Project
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
          
          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <a 
              href="https://github.com/Riemann-def" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 text-white transition-all transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {t('projects.github')}
            </a>
          </motion.div>
        </div>
      </section>
    );
  };
  
  export default ProjectsSection;