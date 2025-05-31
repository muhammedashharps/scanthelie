import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, FilterX } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';
import HistoryCard from '../components/history/HistoryCard';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { scanHistory, clearHistory } = useAppContext();
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'newest' | 'oldest');
  };
  
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all scan history? This action cannot be undone.')) {
      clearHistory();
    }
  };
  
  // First filter out failed scans, then apply search filter
  const filteredHistory = scanHistory
    .filter(scan => scan.status === 'completed' && scan.result) // Only show successful scans
    .filter(scan => {
      const productName = scan.result?.productName?.toLowerCase() || '';
      const brand = scan.result?.brand?.toLowerCase() || '';
      const searchLower = searchTerm.toLowerCase();
      
      return productName.includes(searchLower) || brand.includes(searchLower);
    });
  
  const sortedHistory = [...filteredHistory].sort((a, b) => {
    if (sortOrder === 'newest') {
      return b.timestamp - a.timestamp;
    } else {
      return a.timestamp - b.timestamp;
    }
  });
  
  const handleNewScan = () => {
    navigate('/scan');
  };
  
  if (scanHistory.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Scan History</h1>
        
        <Card>
          <EmptyState
            title="No Scan History"
            description="You haven't scanned any products yet. Start by scanning a food product to build your history."
            actionText="Scan Product"
            onAction={handleNewScan}
          />
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Scan History</h1>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleNewScan}
          >
            New Scan
          </Button>
          
          {filteredHistory.length > 0 && (
            <Button
              variant="danger"
              onClick={handleClearHistory}
              leftIcon={<Trash2 size={16} />}
            >
              Clear History
            </Button>
          )}
        </div>
      </div>
      
      {filteredHistory.length > 0 ? (
        <>
          <Card className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  {searchTerm && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FilterX size={18} />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="sm:w-48">
                <select
                  value={sortOrder}
                  onChange={handleSortChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {sortedHistory.map((scan) => (
              <HistoryCard key={scan.id} scan={scan} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          title={searchTerm ? "No matching scans found" : "No scans yet"}
          description={searchTerm 
            ? "Try adjusting your search terms or clear the search" 
            : "Start by scanning a product to build your history"}
          actionText="Scan a Product"
          onAction={handleNewScan}
        />
      )}
    </div>
  );
};

export default HistoryPage;