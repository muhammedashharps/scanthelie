import React from 'react';
import { Activity } from 'lucide-react';
import { NutritionFacts } from '../../types/types';

interface NutritionCardProps {
  nutritionFacts: NutritionFacts;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ nutritionFacts }) => {
  // Filter out undefined values
  const validNutritionFacts = Object.entries(nutritionFacts)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
      value: value as string,
    }));

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center">
          <Activity size={18} className="text-primary-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Nutrition Facts</h3>
        </div>
      </div>
      
      <div className="p-4">
        <table className="w-full text-sm">
          <tbody>
            {validNutritionFacts.map((item, index) => (
              <tr key={index} className={index !== 0 ? 'border-t border-gray-100' : ''}>
                <td className="py-2 text-gray-600 font-medium">{item.label}</td>
                <td className="py-2 text-gray-900 text-right">{item.value}</td>
              </tr>
            ))}
            
            {validNutritionFacts.length === 0 && (
              <tr>
                <td colSpan={2} className="py-3 text-center text-gray-500">
                  No nutrition information available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NutritionCard;