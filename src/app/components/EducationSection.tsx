import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const EducationSection = () => {
  const { t } = useLanguage();
  
  const education = [
    {
      degree: "BSc in Artificial Intelligence",
      institution: "University of the Basque Country (UPV/EHU)",
      location: "San Sebastian, Spain",
      period: "Sep 2020 - Jul 2024",
      description: "Member of the 1st graduating class of the AI program. Final Project: 'Anomaly detection and deployment in Kubernetes' (Grade: 9/10).",
      highlights: [
        "Relevant courses: Machine Learning & Neural Networks, Massive Data Processing, Temporal Data Analysis",
        "University Entrance Exam Score: 12.24/14 (87.4%)"
      ]
    },
    {
      degree: "Applied Data Science Program",
      institution: "Zrive",
      location: "Online",
      period: "Apr 2025 - Jul 2025",
      description: "Intensive 15-week program focusing on applied data science with real business problems, production-ready skills, and industry mentorship.",
      highlights: [
        "7 comprehensive modules: API integration, EDA, statistical learning, advanced ML, and system design",
        "Real-world projects with messy datasets and business constraints",
        "Production-ready development practices with proper testing, versioning, and deployment",
        "Industry mentorship from professionals at Meta, Vodafone, and Revolut"
      ]
    }
  ];

  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            My formal education and professional development journey
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                  </div>
                  <div className="mt-2 md:mt-0 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {edu.period}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{edu.description}</p>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Highlights:</h4>
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;