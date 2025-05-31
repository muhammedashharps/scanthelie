import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ClaimVerdict } from '../../types/types';

interface ClaimVerifierProps {
  claimVerdicts: ClaimVerdict[];
}

const ClaimVerifier: React.FC<ClaimVerifierProps> = ({ claimVerdicts }) => {
  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'True':
        return <CheckCircle size={20} className="text-success-500" />;
      case 'False':
        return <XCircle size={20} className="text-danger-500" />;
      case 'Misleading':
        return <AlertCircle size={20} className="text-warning-500" />;
      default:
        return <AlertCircle size={20} className="text-gray-400" />;
    }
  };

  const getVerdictClass = (verdict: string) => {
    switch (verdict) {
      case 'True':
        return 'border-success-200 bg-success-50';
      case 'False':
        return 'border-danger-200 bg-danger-50';
      case 'Misleading':
        return 'border-warning-200 bg-warning-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getVerdictTextClass = (verdict: string) => {
    switch (verdict) {
      case 'True':
        return 'text-success-700';
      case 'False':
        return 'text-danger-700';
      case 'Misleading':
        return 'text-warning-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Claim Verification</h3>
      
      <div className="space-y-4">
        {claimVerdicts.map((claimVerdict, index) => (
          <div 
            key={index}
            className={`border rounded-lg p-4 ${getVerdictClass(claimVerdict.verdict)}`}
          >
            <div className="flex items-start">
              <div className="mt-0.5 mr-3">
                {getVerdictIcon(claimVerdict.verdict)}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">"{claimVerdict.claim}"</h4>
                <div className="flex items-center mb-2">
                  <span className={`text-sm font-medium ${getVerdictTextClass(claimVerdict.verdict)}`}>
                    Verdict: {claimVerdict.verdict}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{claimVerdict.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimVerifier;