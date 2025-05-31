import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import { ProductScan } from '../../types/types';
import Card from '../common/Card';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';

interface HistoryCardProps {
  scan: ProductScan;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ scan }) => {
  const navigate = useNavigate();
  const { deleteScan } = useAppContext();
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getStatusIcon = () => {
    switch (scan.status) {
      case 'completed':
        return <CheckCircle size={16} className="text-success-500" />;
      case 'failed':
        return <XCircle size={16} className="text-danger-500" />;
      case 'pending':
        return <Clock size={16} className="text-warning-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = () => {
    switch (scan.status) {
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      case 'pending':
        return 'Processing';
      default:
        return 'Unknown';
    }
  };
  
  const handleViewDetails = () => {
    navigate(`/results/${scan.id}`);
  };

  const handleDelete = () => {
    deleteScan(scan.id);
  };
  
  return (
    <Card className="mb-4">
      <div className="flex gap-4">
        {/* Product Thumbnail */}
        <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
          <img 
            src={scan.frontImage} 
            alt={scan.result?.productName || 'Product'} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon()}
              <span className="text-sm text-gray-600">{getStatusText()}</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">{formatDate(scan.timestamp)}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {scan.result?.productName || 'Unknown Product'}
            </h3>
            
            {scan.result?.brand && (
              <p className="text-sm text-gray-600 mb-2">{scan.result.brand}</p>
            )}
            
            {scan.error && (
              <p className="text-sm text-danger-600 mt-2">{scan.error}</p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              className="!p-2"
              title="Delete scan"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HistoryCard;