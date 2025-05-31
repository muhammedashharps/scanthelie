import React, { useEffect, useState, useCallback } from 'react';
import { AlertCircle, ShieldAlert, Heart } from 'lucide-react';
import Card from '../common/Card';
import { ScanResult, PersonalizedAnalysis } from '../../types/types';
import { UserPreferences } from '../../types/questionnaire';
import { useAppContext } from '../../context/AppContext';
import { userService } from '../../services/userService';

interface PersonalizedResultsProps {
  scanId: string;
  scanResult: ScanResult;
  userPreferences: UserPreferences;
  apiKey: string;
}

const PersonalizedResults: React.FC<PersonalizedResultsProps> = ({
  scanId,
  scanResult,
  userPreferences,
  apiKey
}) => {
  const [personalizedAnalysis, setPersonalizedAnalysis] = useState<PersonalizedAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const generatePreferenceHash = useCallback((preferences: UserPreferences): string => {
    const relevantData = {
      healthConcerns: preferences.healthConcerns,
      allergies: preferences.allergies,
      dietaryPreferences: preferences.dietaryPreferences
    };
    return btoa(JSON.stringify(relevantData));
  }, []);

  useEffect(() => {
    if (!scanId || !apiKey || !userPreferences || !scanResult) {
      setError('Missing required data for analysis');
      setLoading(false);
      return;
    }

    let isMounted = true;
    const preferenceHash = generatePreferenceHash(userPreferences);
    
    const initializeAnalysis = async () => {
      try {
        if (scanResult.personalizedAnalysis?.[preferenceHash]) {
          if (isMounted) {
            setPersonalizedAnalysis(scanResult.personalizedAnalysis[preferenceHash]);
            setLoading(false);
          }
          return;
        }

        setIsUpdating(true);
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Analyze this product specifically for this user's health profile and preferences. Return ONLY a valid JSON object with this exact structure:
{
  "concerns": [
    {
      "issue": "brief issue description",
      "explanation": "detailed explanation"
    }
  ],
  "recommendations": [
    "specific recommendation"
  ],
  "compatibility": "High/Moderate/Low"
}

Product Information:
${JSON.stringify({
  productName: scanResult.productName,
  brand: scanResult.brand,
  ingredients: scanResult.ingredients,
  nutritionFacts: scanResult.nutritionFacts,
  claims: scanResult.claims
}, null, 2)}

User Health Profile:
${JSON.stringify({
  healthConcerns: userPreferences.healthConcerns,
  allergies: userPreferences.allergies,
  dietaryPreferences: userPreferences.dietaryPreferences
}, null, 2)}

Guidelines:
1. Focus on ingredients and nutrition that specifically relate to the user's health concerns, allergies, and dietary preferences
2. Flag any ingredients that might conflict with their health conditions
3. Consider their dietary restrictions when determining compatibility
4. Provide specific, actionable recommendations
5. Keep explanations concise but informative`
              }]
            }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 1024,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to generate analysis: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
          throw new Error('Invalid API response format');
        }

        const responseText = data.candidates[0].content.parts[0].text;
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('Invalid analysis format');
        }
        
        const analysis = JSON.parse(jsonMatch[0]) as PersonalizedAnalysis;
        if (!analysis.concerns || !analysis.recommendations || !analysis.compatibility) {
          throw new Error('Incomplete analysis data');
        }

        const updatedScanResult: ScanResult = {
          ...scanResult,
          personalizedAnalysis: {
            ...scanResult.personalizedAnalysis,
            [preferenceHash]: analysis
          }
        };

        const currentScan = await userService.getScanById(scanId);
        if (!currentScan) {
          throw new Error('Scan not found in database');
        }

        await userService.updateScanResult(scanId, {
          ...currentScan,
          result: updatedScanResult
        });

        if (isMounted) {
          setPersonalizedAnalysis(analysis);
          setError(null);
        }
      } catch (err) {
        console.error('Error in personalized analysis:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to generate personalized analysis');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setIsUpdating(false);
        }
      }
    };

    initializeAnalysis();

    return () => {
      isMounted = false;
    };
  }, [scanResult, userPreferences, apiKey, generatePreferenceHash, scanId]);

  if (loading) {
    return (
      <Card>
        <div className="flex items-center justify-center py-6">
          <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-gray-600">Analyzing for your health profile...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="flex items-center text-danger-600 mb-2">
          <AlertCircle size={20} className="mr-2" />
          <h3 className="font-semibold">Analysis Error</h3>
        </div>
        <p className="text-gray-600">{error}</p>
      </Card>
    );
  }

  if (!personalizedAnalysis) {
    return null;
  }

  const getCompatibilityColor = () => {
    switch (personalizedAnalysis.compatibility) {
      case 'High':
        return 'text-success-600';
      case 'Moderate':
        return 'text-warning-600';
      case 'Low':
        return 'text-danger-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart size={20} className="text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold">Personalized Analysis</h3>
          </div>
          <div className={`flex items-center ${getCompatibilityColor()}`}>
            <span className="text-sm font-medium">
              {personalizedAnalysis.compatibility} Compatibility
            </span>
          </div>
        </div>

        {personalizedAnalysis.concerns.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Health Considerations</h4>
            <div className="space-y-3">
              {personalizedAnalysis.concerns.map((concern, index) => (
                <div key={index} className="bg-danger-50 p-3 rounded-md">
                  <div className="flex items-start">
                    <ShieldAlert size={16} className="text-danger-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-danger-700">{concern.issue}</p>
                      <p className="text-sm text-danger-600 mt-1">{concern.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {personalizedAnalysis.recommendations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Recommendations</h4>
            <ul className="list-disc list-inside space-y-1">
              {personalizedAnalysis.recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm text-gray-600">{recommendation}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PersonalizedResults; 