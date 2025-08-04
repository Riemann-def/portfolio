'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CertificatePage: React.FC = () => {
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
              Zrive Applied Data Science Certificate
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
          className="max-w-4xl mx-auto"
        >
          {/* Certificate Info */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Zrive Applied Data Science Program
            </h1>
            <p className="text-lg text-gray-600 mb-2">Certificate of Completion</p>
            <p className="text-blue-600 font-medium">Markel Ramiro Vaquero</p>
            <p className="text-sm text-gray-500">April 2025 - July 2025</p>
          </div>

          {/* Certificate Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8"
          >
            <div className="p-4 md:p-8">
              <div className="w-full h-[600px] md:h-[800px] border border-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="/zrive-certificate.pdf"
                  className="w-full h-full"
                  title="Zrive Applied Data Science Certificate"
                />
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="/zrive-certificate.pdf"
              download="Markel_Ramiro_Zrive_Certificate.pdf"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Download Certificate
            </a>
            
            <button
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
                // Mostrar feedback visual
                const button = event?.target as HTMLButtonElement;
                const originalText = button.innerHTML;
                button.innerHTML = '✓ Link Copied!';
                setTimeout(() => {
                  button.innerHTML = originalText;
                }, 2000);
              }}
              className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Share Link
            </button>
          </motion.div>

          {/* Program Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 bg-white rounded-xl p-8 shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Program Highlights</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 15-week intensive data science program</li>
                  <li>• 7 comprehensive modules with real-world projects</li>
                  <li>• Industry mentorship from Meta, Vodafone, Revolut professionals</li>
                  <li>• Production-ready MLOps and system design skills</li>
                  <li>• Business-focused approach to data science problems</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Technical Skills Acquired</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Professional Python development with testing</li>
                  <li>• Advanced statistical learning and ML algorithms</li>
                  <li>• Feature engineering and model diagnostics</li>
                  <li>• API development and system architecture</li>
                  <li>• Business translation and stakeholder communication</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Verification */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            <p>Certificate issued by Zrive | Verify authenticity at zrive.app</p>
            <p className="mt-2">
              Direct link: <span className="text-blue-600 font-mono">{typeof window !== 'undefined' ? window.location.href : 'markelramiro.com/certificate'}</span>
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default CertificatePage;