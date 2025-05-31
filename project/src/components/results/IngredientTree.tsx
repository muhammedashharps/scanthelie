import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { Ingredient } from '../../types/types';

interface IngredientTreeProps {
  ingredients: Ingredient[];
}

const IngredientTree: React.FC<IngredientTreeProps> = ({ ingredients }) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (name: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const getRiskIcon = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'Low':
        return <CheckCircle size={16} className="text-success-500" />;
      case 'Moderate':
        return <AlertCircle size={16} className="text-warning-500" />;
      case 'High':
        return <AlertTriangle size={16} className="text-danger-500" />;
      default:
        return <AlertCircle size={16} className="text-gray-400" />;
    }
  };

  const getRiskClass = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'Low':
        return 'border-success-200 bg-success-50';
      case 'Moderate':
        return 'border-warning-200 bg-warning-50';
      case 'High':
        return 'border-danger-200 bg-danger-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-3">Ingredients Breakdown</h3>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {ingredients.map((ingredient, index) => (
            <li key={`${ingredient.name}-${index}`} className="overflow-hidden">
              <div 
                className={`px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                  expandedItems[ingredient.name] ? 'bg-gray-50' : ''
                }`}
                onClick={() => toggleItem(ingredient.name)}
              >
                <div className="flex items-center space-x-2">
                  {expandedItems[ingredient.name] ? (
                    <ChevronDown size={16} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-500" />
                  )}
                  <span className="font-medium">{ingredient.name}</span>
                  {ingredient.amount && (
                    <span className="text-sm text-gray-500">({ingredient.amount})</span>
                  )}
                </div>
                <div className="flex items-center">
                  {getRiskIcon(ingredient.riskLevel)}
                  <span className="ml-1 text-sm font-medium">
                    {ingredient.riskLevel || 'Unknown'}
                  </span>
                </div>
              </div>
              
              {expandedItems[ingredient.name] && (
                <div className={`px-4 py-3 border-t ${getRiskClass(ingredient.riskLevel)}`}>
                  <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-1">Purpose</h4>
                      <p className="text-gray-700">{ingredient.purpose || 'Unknown'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Origin</h4>
                      <p className="text-gray-700">{ingredient.origin || 'Unknown'}</p>
                    </div>
                    {ingredient.controversy && (
                      <div className="md:col-span-2">
                        <h4 className="font-semibold mb-1">Controversy</h4>
                        <p className="text-gray-700">{ingredient.controversy}</p>
                      </div>
                    )}
                    {ingredient.legalStatus && (
                      <div className="md:col-span-2">
                        <h4 className="font-semibold mb-1">Banned Countries</h4>
                        <div className="flex flex-wrap gap-2">
                          {ingredient.legalStatus.bannedCountries.length > 0 ? (
                            ingredient.legalStatus.bannedCountries.map((country, index) => (
                              <span key={index} className="px-2 py-1 rounded text-xs bg-danger-100 text-danger-800">
                                {country}
                              </span>
                            ))
                          ) : (
                            <span className="px-2 py-1 rounded text-xs bg-success-100 text-success-800">
                              No countries have banned this ingredient
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    {ingredient.safeLimit && (
                      <div>
                        <h4 className="font-semibold mb-1">Safe Limit</h4>
                        <p className="text-gray-700">{ingredient.safeLimit}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientTree;