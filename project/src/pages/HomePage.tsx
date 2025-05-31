import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Upload, BarChart3, History } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleStartScan = () => {
    navigate('/scan');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-full mb-4">
          <ShieldAlert size={32} className="text-primary-600" />
        </div>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          Scan The Lie
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Reveal what's really inside your food by checking if marketing claims match the actual ingredients.
        </p>
        
        <div className="mt-8">
          <Button 
            size="lg" 
            onClick={handleStartScan}
            rightIcon={<ArrowRight size={20} />}
          >
            Start Scanning
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="animate-slide-up delay-100">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary-100 p-3 rounded-full mb-4">
              <Upload size={24} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
            <p className="text-gray-600 text-sm">
              Take photos of the front and back of food packaging to analyze claims and ingredients.
            </p>
          </div>
        </Card>
        
        <Card className="animate-slide-up delay-200">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary-100 p-3 rounded-full mb-4">
              <BarChart3 size={24} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Get Analysis</h3>
            <p className="text-gray-600 text-sm">
              Our AI analyzes ingredients, checks claims, and gives you a detailed breakdown of what's really in your food.
            </p>
          </div>
        </Card>
        
        <Card className="animate-slide-up delay-300">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary-100 p-3 rounded-full mb-4">
              <History size={24} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Track History</h3>
            <p className="text-gray-600 text-sm">
              Save and revisit your previous scans to compare products and make informed choices over time.
            </p>
          </div>
        </Card>
      </div>
      
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Why Use Scan The Lie?
        </h2>
        
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
              <div className="bg-primary-500 rounded-full w-2 h-2"></div>
            </div>
            <p className="text-gray-700">
              <strong>Verify Claims:</strong> Check if "all natural" or "no preservatives" claims are actually true
            </p>
          </li>
          <li className="flex items-start">
            <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
              <div className="bg-primary-500 rounded-full w-2 h-2"></div>
            </div>
            <p className="text-gray-700">
              <strong>Ingredient Safety:</strong> Learn about potential risks associated with ingredients
            </p>
          </li>
          <li className="flex items-start">
            <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
              <div className="bg-primary-500 rounded-full w-2 h-2"></div>
            </div>
            <p className="text-gray-700">
              <strong>Make Better Choices:</strong> Understand what you're really eating to make healthier decisions
            </p>
          </li>
          <li className="flex items-start">
            <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
              <div className="bg-primary-500 rounded-full w-2 h-2"></div>
            </div>
            <p className="text-gray-700">
              <strong>Save Your Findings:</strong> Build a personal database of analyzed products
            </p>
          </li>
        </ul>
        
        <div className="mt-6">
          <Button 
            onClick={handleStartScan}
            rightIcon={<ArrowRight size={16} />}
          >
            Try It Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;