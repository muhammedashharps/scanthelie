import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { ArrowRight, Info, AlertTriangle, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ProductScan } from '../types/types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ImageUploader from '../components/scan/ImageUploader';

const ScanPage: React.FC = () => {
  const navigate = useNavigate();
  const { apiKey, isApiKeyValid, addToHistory, setLoading } = useAppContext();
  
  const [frontImage, setFrontImage] = useState<string>('');
  const [backImage, setBackImage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if API key is set
    if (!apiKey) {
      toast.warning('Please set your API key in Settings before scanning', {
        position: 'top-center',
        autoClose: 5000,
      });
    }
  }, [apiKey]);

  const handleFrontImageUpload = (imageData: string) => {
    setFrontImage(imageData);
  };

  const handleBackImageUpload = (imageData: string) => {
    setBackImage(imageData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!frontImage || !backImage) {
      toast.error('Please upload both front and back images');
      return;
    }
    
    if (!apiKey || !isApiKeyValid) {
      toast.error('Please set a valid API key in Settings before scanning');
      navigate('/settings');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setLoading(true);
      
      // Create a new scan with pending status
      const scanId = uuidv4();
      const newScan: ProductScan = {
        id: scanId,
        frontImage,
        backImage,
        timestamp: Date.now(),
        result: null,
        status: 'pending'
      };
      
      // Add to history
      addToHistory(newScan);
      
      // In a real implementation, we would:
      // 1. Upload images to server or process them locally
      // 2. Call Gemini API to analyze images
      // 3. Update the scan with results
      
      // For this demo, we'll navigate to the results page directly
      // In a real app, you might use a loading screen or webhook
      
      toast.success('Images uploaded successfully. Analyzing...');
      
      // Navigate to results page with the scan ID
      navigate(`/results/${scanId}`);
    } catch (error) {
      console.error('Error submitting scan:', error);
      toast.error('Failed to process scan. Please try again.');
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {(!apiKey || !isApiKeyValid) && (
        <Card className="mb-6 border-warning-200 bg-warning-50">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-warning-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-medium text-warning-800 mb-1">
                API Key {!apiKey ? 'Not Set' : 'Invalid'}
              </h3>
              <p className="text-sm text-warning-700 mb-3">
                You need a valid Gemini API key to scan and analyze products. Please set up your API key in the settings.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/settings')}
                leftIcon={<Settings size={16} />}
              >
                Go to Settings
              </Button>
            </div>
          </div>
        </Card>
      )}

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Scan Your Product</h1>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center p-3 bg-blue-50 rounded-md mb-6">
            <Info size={18} className="text-blue-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              For best results, take clear photos in good lighting. Make sure all text is readable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ImageUploader
              label="Front of Package (Marketing Claims)"
              onImageUploaded={handleFrontImageUpload}
            />
            
            <ImageUploader
              label="Back of Package (Ingredients & Nutrition)"
              onImageUploaded={handleBackImageUpload}
            />
          </div>
          
          <div className="border-t border-gray-200 pt-4 flex justify-end">
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={!frontImage || !backImage || !apiKey || !isApiKeyValid || isSubmitting}
              rightIcon={<ArrowRight size={18} />}
            >
              Analyze Product
            </Button>
          </div>
        </form>
      </Card>
      
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">How It Works</h2>
        
        <ol className="list-decimal pl-5 space-y-2">
          <li className="text-gray-700">
            Upload clear photos of the front (with marketing claims) and back (with ingredients list) of your food product.
          </li>
          <li className="text-gray-700">
            Our AI analyzes the images to extract product information, claims, and ingredients.
          </li>
          <li className="text-gray-700">
            Each ingredient is researched for safety, purpose, and legal status.
          </li>
          <li className="text-gray-700">
            Marketing claims are verified against actual ingredients to check for misleading statements.
          </li>
          <li className="text-gray-700">
            You'll receive a detailed analysis with an ingredient breakdown, claim verification, and overall health score.
          </li>
        </ol>
        
        <p className="mt-4 text-sm text-gray-500">
          Note: This application uses your Gemini API key to process images and generate analysis. Your API key is stored securely in your browser.
        </p>
      </div>
    </div>
  );
};

export default ScanPage;