import React from 'react';
import { Gauge } from 'lucide-react';

interface HealthScoreProps {
  score: number;
}

const HealthScore: React.FC<HealthScoreProps> = ({ score }) => {
  const getColorClass = () => {
    if (score >= 70) return 'text-success-600';
    if (score >= 40) return 'text-warning-600';
    return 'text-danger-600';
  };
  
  const getGradientId = () => {
    if (score >= 70) return 'healthScoreGradientGood';
    if (score >= 40) return 'healthScoreGradientMedium';
    return 'healthScoreGradientBad';
  };

  const getGradientColors = () => {
    if (score >= 70) return ['#84cc16', '#22c55e']; // Lime to Green
    if (score >= 40) return ['#f97316', '#facc15']; // Orange to Yellow
    return ['#ef4444', '#f97316']; // Red to Orange
  };

  const [color1, color2] = getGradientColors();
  const gradientId = getGradientId();
  const colorClass = getColorClass();
  const angle = (score / 100) * 180;

  return (
    <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-white">
      <div className="mb-2 flex items-center">
        <Gauge size={20} className={colorClass} />
        <h3 className="font-semibold text-gray-900 ml-2">Health Score</h3>
      </div>
      
      <div className="relative w-48 h-24 mt-2">
        <svg width="100%" height="100%" viewBox="0 0 100 50">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color1} />
              <stop offset="100%" stopColor={color2} />
            </linearGradient>
          </defs>
          
          {/* Background Arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="5"
            strokeLinecap="round"
          />
          
          {/* Filled Arc */}
          <path
            d={`M 50 50 L ${50 - 40 * Math.cos(angle * Math.PI / 180)} ${50 - 40 * Math.sin(angle * Math.PI / 180)} A 40 40 0 ${angle > 90 ? 1 : 0} 1 10 50`}
            fill={`url(#${gradientId})`}
            opacity="0.8"
          />
          
          {/* Center point with score */}
          <circle cx="50" cy="50" r="20" fill="white" stroke="#e5e7eb" strokeWidth="1" />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#374151"
            fontWeight="bold"
            fontSize="12"
          >
            {score}
          </text>
          
          {/* Scale markers */}
          <text x="10" y="60" textAnchor="middle" fill="#6b7280" fontSize="8">0</text>
          <text x="50" y="12" textAnchor="middle" fill="#6b7280" fontSize="8">50</text>
          <text x="90" y="60" textAnchor="middle" fill="#6b7280" fontSize="8">100</text>
        </svg>
      </div>
      
      <div className="text-center mt-2">
        <p className={`text-sm font-medium ${colorClass}`}>
          {score >= 70 ? 'Good' : score >= 40 ? 'Average' : 'Poor'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Based on ingredients and claim analysis
        </p>
      </div>
    </div>
  );
};

export default HealthScore;