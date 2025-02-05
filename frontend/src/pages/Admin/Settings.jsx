import React, { useState } from 'react';
import { CreditCardIcon, BellIcon, CogIcon } from '@heroicons/react/outline';

const Settings = () => {
  const [platformSettings, setPlatformSettings] = useState({
    paymentMethods: {
      paypal: true,
      stripe: true,
      bankTransfer: false
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      smsAlerts: false
    },
    fees: {
      transactionFee: 2.5,
      withdrawalFee: 1.0
    }
  });

  const handleSettingChange = (category, setting) => {
    setPlatformSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleFeeChange = (feeType, value) => {
    setPlatformSettings(prev => ({
      ...prev,
      fees: {
        ...prev.fees,
        [feeType]: parseFloat(value)
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foundations-dark">Platform Settings</h1>
          <p className="text-foundations-tertiary mt-2">Configure platform settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Methods Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <CreditCardIcon className="h-6 w-6 text-foundations-primary mr-2" />
              <h2 className="text-xl font-semibold text-foundations-dark">Payment Methods</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(platformSettings.paymentMethods).map(([method, isEnabled]) => (
                <div key={method} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={() => handleSettingChange('paymentMethods', method)}
                      className="h-4 w-4 text-foundations-primary rounded border-gray-300 focus:ring-foundations-primary"
                    />
                    <span className="ml-3 text-foundations-dark capitalize">
                      {method.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <button className="text-foundations-secondary hover:text-foundations-primary text-sm font-medium">
                    Configure
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Preferences Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <BellIcon className="h-6 w-6 text-foundations-primary mr-2" />
              <h2 className="text-xl font-semibold text-foundations-dark">Notifications</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(platformSettings.notifications).map(([type, isEnabled]) => (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={() => handleSettingChange('notifications', type)}
                      className="h-4 w-4 text-foundations-primary rounded border-gray-300 focus:ring-foundations-primary"
                    />
                    <span className="ml-3 text-foundations-dark capitalize">
                      {type.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Fees Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <CogIcon className="h-6 w-6 text-foundations-primary mr-2" />
              <h2 className="text-xl font-semibold text-foundations-dark">Platform Fees</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(platformSettings.fees).map(([feeType, value]) => (
                <div key={feeType} className="space-y-2">
                  <label className="block text-sm font-medium text-foundations-dark capitalize">
                    {feeType.replace(/([A-Z])/g, ' $1').trim()} (%)
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleFeeChange(feeType, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foundations-primary focus:border-foundations-primary"
                    step="0.1"
                    min="0"
                    max="100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="bg-foundations-primary text-white px-6 py-3 rounded-lg hover:bg-foundations-secondary transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;