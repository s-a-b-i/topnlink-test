import React, { useState, useEffect } from 'react';
import { websiteService } from '../../utils/services';
import toast from 'react-hot-toast';
import Loader from '../Loader';
import { useAuthStore } from '../../store/authStore';

const HighlightMediaModal = ({
  isOpen,
  onClose,
  websiteDomain,
  websiteId,
  selectedMonths,
  onMonthsChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const PRICE_PER_MONTH = 29.00;
  
  // 🔥 Get user from Auth Store
  const { user } = useAuthStore();

  useEffect(() => {
    if (isOpen && selectedMonths) {
      onMonthsChange(selectedMonths);
    }
  }, [isOpen, selectedMonths, onMonthsChange]);

  if (!isOpen) return null;

  const getDiscountedPrice = (months) => {
    const basePrice = PRICE_PER_MONTH * parseInt(months);
    switch (months) {
      case '3':
        return basePrice * 0.85; // 15% discount
      case '6':
        return basePrice * 0.80; // 20% discount
      default:
        return basePrice;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!websiteId) throw new Error('Website ID is required');
      if (!user?._id) throw new Error('User ID is missing');

      const highlightData = {
        months: parseInt(selectedMonths),
        highlightMonths: selectedMonths,
        userId: user._id, // ✅ Sending userId from store
      };

      await websiteService.highlightMedia(websiteId, highlightData, user._id);
      toast.success('Media highlighted successfully');
      onClose(highlightData);
    } catch (error) {
      toast.error(error.message || 'Failed to highlight media');
    } finally {
      setIsLoading(false);
    }
  };

  const getMonthLabel = (months) => {
    switch (months) {
      case '3':
        return '3 months (-15%)';
      case '6':
        return '6 months (-20%)';
      default:
        return '1 month';
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Highlight your Media</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 mb-8">
            In this section, you can highlight this Media for a minimum of 1 month up to a maximum of 6 months. 
            By highlighting it, this will appear at the top of the list in searches for users matching your 
            Media criteria. Payment for the highlighting can only be made through your Rankister balance. 
            Remember to deposit if you want to highlight Media!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Months</label>
              <select
                value={selectedMonths}
                onChange={(e) => onMonthsChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2"
                disabled={isLoading}
              >
                {['1', '3', '6'].map((num) => (
                  <option key={num} value={num} className="bg-white">
                    {getMonthLabel(num)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="flex flex-col">
                {selectedMonths !== '1' && (
                  <span className="text-gray-500 line-through">
                    €{(PRICE_PER_MONTH * parseInt(selectedMonths)).toFixed(2)}
                  </span>
                )}
                <span className="text-xl font-bold">
                  €{getDiscountedPrice(selectedMonths).toFixed(2)}
                </span>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Highlight your Media'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default HighlightMediaModal;
