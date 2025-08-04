'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

interface SkillCategoryProps {
  title: string;
  technologies: { icon: string; name: string; darkIcon?: string }[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, technologies }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-indigo-900/10 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold mb-4 text-indigo-300">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {technologies.map((tech, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-2 bg-indigo-800/30 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-indigo-800/50 hover:scale-105"
          >
            {/* Usar darkIcon si existe, si no usar el icon normal con filtro para invertir colores en iconos específicos */}
            <img 
              src={tech.darkIcon || tech.icon} 
              alt={tech.name} 
              className={`w-5 h-5 ${
                // Invertir colores para logos específicos que sabemos que son negros
                (!tech.darkIcon && (tech.name === 'OpenAI' || tech.name === 'AWS')) 
                  ? 'filter invert brightness-0 contrast-100' 
                  : ''
              }`} 
            />
            <span className="text-sm text-gray-200">{tech.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection: React.FC = () => {
  const { t } = useLanguage();

  // Solo mantenemos ML/AI y Backend/Infrastructure
  const techCategories = [
    {
      title: t('skills.categories.ml'),
      technologies: [
        { icon: "/openai.svg", name: "OpenAI" }, // Se invertirá automáticamente
        { icon: "/python.svg", name: "Python" },
        { icon: "/tensorflow.svg", name: "TensorFlow" },
        { icon: "/pytorch.svg", name: "PyTorch" },
        { icon: "/scikit-learn.svg", name: "Scikit-learn" },
        { icon: "/huggingface.svg", name: "Hugging Face" },
        { icon: "/langchain.svg", name: "LangChain" },
        { icon: "/pandas.svg", name: "Pandas" },
        { icon: "/numpy.svg", name: "NumPy" }
      ]
    },
    {
      title: t('skills.categories.backend'),
      technologies: [
        { icon: "/kubernetes.svg", name: "Kubernetes" },
        { icon: "/docker.svg", name: "Docker" },
        { icon: "/amazon-aws.svg", name: "AWS" }, // Se invertirá automáticamente
        { icon: "/azure.png", name: "Azure" },
        { icon: "/flask.svg", name: "Flask" },
        { icon: "/node.svg", name: "Node.js" },
        { icon: "/prometheus.svg", name: "Prometheus" },
        { icon: "/grafana.svg", name: "Grafana" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          {/* H1 mejorado para mejor contraste */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('skills.title')}</h2>
          <div className="h-1 w-20 bg-indigo-500 mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            {t('skills.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative py-10"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl"></div>

          {/* Tech categories - Ahora solo 2 columnas para dar más espacio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {techCategories.map((category, index) => (
              <SkillCategory 
                key={index} 
                title={category.title} 
                technologies={category.technologies} 
              />
            ))}
          </div>
        </motion.div>
        
        {/* Floating tech logos - También con mejor contraste */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold mb-10 text-white">{t('skills.stack')}</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: "/python.svg", name: "Python" },
              { icon: "/tensorflow.svg", name: "TensorFlow" },
              { icon: "/docker.svg", name: "Docker" },
              { icon: "/kubernetes.svg", name: "Kubernetes" },
              { icon: "/amazon-aws.svg", name: "AWS" }, // Se invertirá automáticamente
              { icon: "/openai.svg", name: "OpenAI" }, // Se invertirá automáticamente
            ].map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-indigo-900/30 rounded-full flex items-center justify-center p-3 mb-2">
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className={`w-10 h-10 ${
                      // Invertir colores para logos específicos
                      (tech.name === 'OpenAI' || tech.name === 'AWS') 
                        ? 'filter invert brightness-0 contrast-100' 
                        : ''
                    }`} 
                  />
                </div>
                <span className="text-sm text-gray-300">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;