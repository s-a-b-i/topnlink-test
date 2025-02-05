import React, { useState } from "react";
import { Link } from "react-router-dom";

const Withdraw = () => {
  const [formData, setFormData] = useState({
    amount: "",
    paymentDetails: "",
    invoice: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        invoice: file
      }));
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        invoice: file
      }));
    } else {
      alert('Please upload a PDF file');
    }
  };

  const isFormValid = () => {
    return (
      formData.amount >= 20 &&
      formData.paymentDetails.trim() !== "" &&
      formData.invoice !== null
    );
  };

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-bold">Withdrawal Request</h1>

      {/* Instructions */}
      <div className="space-y-4 text-gray-700">
        <p>-Please only request one withdrawal during the month, towards the end of the month and on a single invoice. Uploading multiple invoices for multiple withdrawals may result in delays.</p>
        <p>-If you are a private individual and resident in Italy you will have to charge a Withholding Tax to request the withdrawal. You will have to separate 20% of the Withholding from the amount you withdraw. For example: if you are requesting a withdrawal of €100.00 Gross (earned on the platform), you will have to upload a document with a total of €100.00.</p>
        <p>-To separate the amount you can use this formula: €100.00 x 0.20 = €80.00 (net)</p>
        <p>-For those who apply the flat rate or advantage regime (minimum), the amount due from Rankister SRL is inclusive of charges such as INPS compensation or professional fund supplementary contribution or stamp duty</p>
        <p>-For those in the ordinary VAT regime, the amount due from Rankister SRL is understood to include charges such as INPS reimbursement or supplementary professional fund contribution or stamp duty, while it is understood to be net of the VAT due by law.</p>
      </div>

      <div>
        <p>Please also display the withholding tax if applicable (professionals)</p>
        <p className="mt-2">Maximum withdrawable amount: € 0.00</p>
        <p className="text-red-500">Attention: you must issue an invoice from the name entered in the Profile: TeqnoWebs</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            placeholder="0"
            min="20"
          />
          <span className="text-red-500 text-sm">Minimum amount is 20,00</span>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Payment details</label>
          <input
            type="text"
            name="paymentDetails"
            value={formData.paymentDetails}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            placeholder="Enter IBAN or PayPal email"
          />
          <span className="text-red-500 text-sm">Enter the payment destination here (if bank IBAN otherwise email paypal)</span>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Invoice</label>
          <div
            className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex justify-center mb-2">📄</div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="invoice-upload"
            />
            <label
              htmlFor="invoice-upload"
              className="text-foundations-primary cursor-pointer"
            >
              Upload a file
            </label>
            <span className="text-gray-500"> or drag and drop (.pdf)</span>
            {formData.invoice && (
              <p className="text-sm text-green-600 mt-2">
                Selected file: {formData.invoice.name}
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2">RANKISTER Srl</h3>
          <p>Via Cristoforo Colombo 2 - 10024 - Moncalieri (TO)</p>
          <p>P.iva 12684530012 - C.F. 12684530012</p>
          <p>SDI: M5UXCR1</p>
        </div>

        <div>
          <button
            type="submit"
            className={`bg-foundations-primary text-white px-6 py-2 rounded-lg ${
              !isFormValid() ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            }`}
            disabled={!isFormValid()}
          >
            Request Withdrawal
          </button>
        </div>
      </form>

      {/* Footer Links */}
      <div className="flex gap-2 text-[#3D52A0]">
        <Link to="/terms" className="hover:underline">
          Terms and conditions
        </Link>
        <span>•</span>
        <Link to="https://rankister.com" className="hover:underline">
          Rankister.com
        </Link>
      </div>
    </div>
  );
};

export default Withdraw;