import React from 'react';
import { Github, Info } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Scan The Lie. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-500 hover:text-primary-600 transition-colors duration-200 flex items-center gap-1"
            >
              <Info size={16} />
              <span className="text-sm">About</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-primary-600 transition-colors duration-200 flex items-center gap-1"
            >
              <Github size={16} />
              <span className="text-sm">GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-center text-gray-400">
          This app uses AI to analyze food packaging. Results should be verified with official sources.
        </div>
      </div>
    </footer>
  );
};

export default Footer;