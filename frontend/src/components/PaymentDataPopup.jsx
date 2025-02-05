import React, { useEffect, useCallback } from "react";

const PaymentDataPopup = ({ onClose }) => {
  console.log("PaymentDataPopup rendering");

  useEffect(() => {
    console.log("PaymentDataPopup mounted");
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        console.log("Escape key pressed");
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    
    return () => {
      console.log("PaymentDataPopup unmounting");
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleOverlayClick = useCallback((e) => {
    console.log("Overlay clicked");
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleCloseClick = useCallback(() => {
    console.log("Close button clicked");
    onClose();
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="my-auto bg-white rounded-lg w-full max-w-lg relative overflow-hidden">
        <div className="sticky top-0 bg-white z-10 px-4 py-3 sm:px-6 sm:py-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold">Send your payment to...</h2>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 space-y-4">
          <div className="space-y-4 mb-6">
            <div>
              <p className="font-medium">Bank account:</p>
              <p>Rankister Srl</p>
            </div>
            <div>
              <p className="font-medium">Bank name:</p>
              <p>Intesa San Paolo</p>
            </div>
            <div>
              <p className="font-medium">Bank IBAN:</p>
              <p className="break-all">IT49W0306920000100000076050</p>
            </div>
            <div>
              <p className="font-medium">Bank reason:</p>
              <p>Credit recharge {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-medium">
              To speed up the accounting of the bank transfer, we ask you to send us a copy of the accounting to the email address:
            </p>
            <a 
              href="mailto:info@rankister.com" 
              className="text-blue-600 hover:underline break-all"
            >
              info@rankister.com
            </a>
          </div>

          <button
            onClick={handleCloseClick}
            className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDataPopup;