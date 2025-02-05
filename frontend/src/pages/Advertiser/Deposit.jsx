import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Deposit = () => {
  const [amount, setAmount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [invoicingAccount, setInvoicingAccount] = useState('')

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-bold mb-8">Deposit</h1>
      
      {/* Amount Input */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-gray-700">Amount</label>
          <span className="text-red-500">Minimum amount is 20,00</span>
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="0"
        />
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">
          Payment method<span className="text-red-500">*</span>
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded-md appearance-none bg-white"
        >
          <option value="">Select payment method</option>
<option value="paypal">PayPal</option>
<option value="wire_transfer">Wire Transfer</option>

          {/* Add payment methods here */}
        </select>
      </div>

      {/* Invoicing Account */}
      <div className="mb-8">
        <label className="block text-gray-700 mb-2">
          invoicing-account<span className="text-red-500">*</span>
        </label>
        <select
          value={invoicingAccount}
          onChange={(e) => setInvoicingAccount(e.target.value)}
          className="w-full p-2 border rounded-md appearance-none bg-white"
        >
          <option value="">Select invoicing account</option>
          {/* Add invoicing accounts here */}
        </select>
      </div>

      {/* Deposit Button */}
      <button className="bg-orange-300 hover:bg-orange-400 text-white px-6 py-2 rounded-md mb-8">
        Deposit
      </button>

      {/* Footer Links */}
      <div className="text-sm text-orange-400">
        <Link to="/terms" className="hover:underline">
          Terms and conditions
        </Link>
        <span className="mx-2">•</span>
        <Link to="/" className="hover:underline">
          Rankister.com
        </Link>
      </div>
    </div>
  )
}

export default Deposit