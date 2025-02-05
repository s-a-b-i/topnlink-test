import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PaymentDataPopup from "../../components/PaymentDataPopup";

const Balance = () => {
  console.log("Balance component rendering");
  const navigate = useNavigate();
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  useEffect(() => {
    console.log("Balance component mounted");
    return () => console.log("Balance component unmounting");
  }, []);

  useEffect(() => {
    console.log("showPaymentPopup state changed to:", showPaymentPopup);
  }, [showPaymentPopup]);

  const transactions = [
    {
      date: "25/11/2024 18:25",
      description: "Ricarica bilancio 20.00 €",
      paymentMethod: "Paypal",
      amount: "€ 20,00",
      invoice: "",
    },
    // Add more transactions here for demonstration
  ];

  const handleDepositClick = () => {
    console.log("Deposit button clicked");
    navigate("/balance/deposit");
  };

  const handleWithdrawClick = () => {
    console.log("Withdraw button clicked");
    navigate("/balance/withdraw");
  };

  const handlePaymentDataClick = () => {
    console.log("Payment data button clicked");
    setShowPaymentPopup(true);
    console.log("showPaymentPopup state update triggered");
  };

  const handlePopupClose = () => {
    console.log("Popup close triggered");
    setShowPaymentPopup(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Balance</h1>

        {/* Balance Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="space-y-2">
            <p className="text-lg">Current balance: € 0.00</p>
            <p className="text-lg">On hold: € 0,00</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button
              type="button"
              onClick={handleDepositClick}
              className="bg-foundations-primary text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
            >
              Deposit
            </button>
            <button
              type="button"
              onClick={handleWithdrawClick}
              className="bg-foundations-primary text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
            >
              Withdraw
            </button>
            <button
              type="button"
              onClick={handlePaymentDataClick}
              className="bg-foundations-primary text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
            >
              Payment data
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="w-full">
          <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <div className="w-full overflow-x-auto scrollbar-thin">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 whitespace-nowrap">Date</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Description</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Payment Method</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Amount</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                            <div className="flex items-center">
                              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                              {transaction.date}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.description}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{transaction.paymentMethod}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600">{transaction.amount}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.invoice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap gap-2 text-blue-600 text-sm">
          <Link to="/terms" className="hover:underline">
            Terms and conditions
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link to="https://rankister.com" className="hover:underline">
            Rankister.com
          </Link>
        </div>
      </div>

      {showPaymentPopup && <PaymentDataPopup onClose={handlePopupClose} />}
    </div>
  );
};

export default Balance;