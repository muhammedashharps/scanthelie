import React, { useState } from 'react';
import { Save, Key, AlertTriangle, Eye, EyeOff, User, LogOut } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// Default profile picture (data URL of a simple user avatar)
const DEFAULT_PROFILE_PICTURE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234B5563'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

const SettingsPage: React.FC = () => {
  const { apiKey, setApiKey, isApiKeyValid } = useAppContext();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [inputApiKey, setInputApiKey] = useState<string>(apiKey);
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputApiKey(e.target.value);
  };
  
  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };
  
  const handleSaveApiKey = async () => {
    if (!inputApiKey) {
      toast.error('Please enter an API key');
      return;
    }
    
    setIsSaving(true);
    
    try {
      setApiKey(inputApiKey);
      toast.success('API key saved successfully');
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error('Failed to save API key');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <Card className="mb-8">
        <div className="flex items-center mb-4">
          <User size={20} className="text-primary-600 mr-2" />
          <h2 className="text-lg font-semibold">User Profile</h2>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16">
              <img
                src={DEFAULT_PROFILE_PICTURE}
                alt="Profile"
                className="w-full h-full rounded-full object-cover bg-gray-100 border-2 border-gray-200"
              />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">{user?.displayName || user?.email?.split('@')[0] || 'Anonymous User'}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
        
        <Button
          onClick={handleLogout}
          variant="danger"
          leftIcon={<LogOut size={16} />}
        >
          Logout
        </Button>
      </Card>
      
      <Card className="mb-8">
        <div className="flex items-center mb-4">
          <Key size={20} className="text-primary-600 mr-2" />
          <h2 className="text-lg font-semibold">Gemini API Key</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Enter your Gemini API key to enable product scanning and analysis. 
          Your API key is stored locally in your browser and is never sent to our servers.
        </p>
        
        <div className="mb-6">
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
            API Key
          </label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              id="apiKey"
              value={inputApiKey}
              onChange={handleApiKeyChange}
              className="block w-full pr-10 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your Gemini API key"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={toggleShowApiKey}
            >
              {showApiKey ? (
                <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye size={18} className="text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleSaveApiKey}
            isLoading={isSaving}
            leftIcon={<Save size={16} />}
          >
            Save API Key
          </Button>
        </div>
        
        {isApiKeyValid && (
          <div className="mt-4 px-4 py-2 bg-success-50 text-success-700 rounded-md flex items-center">
            <div className="h-2 w-2 rounded-full bg-success-500 mr-2"></div>
            <span className="text-sm">API Key is Saved</span>
          </div>
        )}
      </Card>
      
      <Card>
        <div className="flex items-center mb-4">
          <AlertTriangle size={20} className="text-warning-600 mr-2" />
          <h2 className="text-lg font-semibold">How to Get a Gemini API Key</h2>
        </div>
        
        <ol className="list-decimal pl-5 space-y-2 mb-4">
          <li className="text-gray-700">
            Visit the <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800">Google AI Developer site</a>
          </li>
          <li className="text-gray-700">
            Sign in with your Google account
          </li>
          <li className="text-gray-700">
            Navigate to "API Keys" section
          </li>
          <li className="text-gray-700">
            Create a new API key for Gemini
          </li>
          <li className="text-gray-700">
            Copy the key and paste it in the field above
          </li>
        </ol>
        
        <p className="text-sm text-gray-500">
          Note: The Gemini API may require a billing account, but Google often provides free credits for new users.
        </p>
      </Card>
    </div>
  );
};

export default SettingsPage;