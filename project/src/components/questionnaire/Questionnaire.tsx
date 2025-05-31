import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, PartyPopper, Check, AlertCircle } from 'lucide-react';
import { QuestionnaireQuestion, QUESTIONNAIRE_QUESTIONS } from '../../types/questionnaire';
import Button from '../common/Button';
import Card from '../common/Card';
import { toast } from 'react-toastify';

interface QuestionnaireProps {
  onComplete: (preferences: {
    healthConcerns: string[];
    allergies: string[];
    dietaryPreferences: string[];
  }) => Promise<void>;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [answers, setAnswers] = useState<{
    healthConcerns: string[];
    allergies: string[];
    dietaryPreferences: string[];
  }>({
    healthConcerns: [],
    allergies: [],
    dietaryPreferences: []
  });

  const currentQuestion = QUESTIONNAIRE_QUESTIONS[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    setAnswers(prev => {
      const category = currentQuestion.category;
      let newValues: string[];

      if (currentQuestion.allowMultiple) {
        if (option === 'None' || option === 'None of the above') {
          newValues = [option];
        } else {
          newValues = prev[category].includes(option)
            ? prev[category].filter(item => item !== option)
            : [...prev[category].filter(item => item !== 'None' && item !== 'None of the above'), option];
        }
      } else {
        newValues = [option];
      }

      return {
        ...prev,
        [category]: newValues
      };
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONNAIRE_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowSuccess(true);
    }
  };

  const handleFinish = async () => {
    try {
      setIsSaving(true);
      await onComplete(answers);
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save your preferences. Please try again.');
      setShowSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  const isOptionSelected = (option: string) => {
    return answers[currentQuestion.category].includes(option);
  };

  const canProceed = answers[currentQuestion.category].length > 0;

  const getSelectedCount = () => {
    return Object.values(answers).reduce((total, current) => 
      total + (current.filter(item => item !== 'None' && item !== 'None of the above').length), 0
    );
  };

  const modalContent = showSuccess ? (
    <Card className="p-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Health Profile Setup</h2>
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <PartyPopper className="w-5 h-5 text-primary-600" />
          </div>
        </div>
        
        <div className="w-full bg-primary-100 rounded-lg p-4 mb-4">
          <p className="text-primary-800">
            Thank you for sharing your health preferences. We've recorded {getSelectedCount()} important details 
            about your dietary needs.
          </p>
        </div>
      </div>

      <div className="max-h-[50vh] overflow-y-auto mb-6 pr-2">
        <div className="space-y-4">
          {Object.entries(answers).map(([category, items]) => {
            const validItems = items.filter(item => item !== 'None' && item !== 'None of the above');
            if (validItems.length === 0) return null;
            
            return (
              <div key={category} className="rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium text-gray-900 mb-2 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}:
                </h3>
                <div className="space-y-2">
                  {validItems.map(item => (
                    <div key={item} className="flex items-center text-gray-600">
                      <Check size={16} className="text-primary-600 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button
          onClick={handleFinish}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Get Started'}
        </Button>
      </div>
    </Card>
  ) : (
    <Card className="p-6">
      {/* Header Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Health Profile Setup</h2>
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {QUESTIONNAIRE_QUESTIONS.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / QUESTIONNAIRE_QUESTIONS.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Question Section */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {currentQuestion.question}
      </h3>

      {/* Options Section - Scrollable */}
      <div className="max-h-[50vh] overflow-y-auto mb-6 pr-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${
                    isOptionSelected(option)
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-left text-gray-700">{option}</span>
                  {isOptionSelected(option) && (
                    <CheckCircle className="text-primary-600" size={20} />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Section */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button
          onClick={handleNext}
          disabled={!canProceed}
        >
          {currentQuestionIndex === QUESTIONNAIRE_QUESTIONS.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl"
      >
        {modalContent}
      </motion.div>
    </div>
  );
};

export default Questionnaire; 