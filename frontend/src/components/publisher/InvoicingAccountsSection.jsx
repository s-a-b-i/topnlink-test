import React from 'react';

const InvoicingAccountsSection = ({
  isOpen,
  toggleSection,
  invoicingAccounts,
  handleEditInvoicingAccount,
  handleRemoveInvoicingAccount,
  setShowEditForm,
  setIsEditingOrAdding,
  setEditingAccount
}) => {
  return (
    <>
      <div 
        className="bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white p-4 rounded-lg cursor-pointer flex justify-between items-center mt-6"
        onClick={toggleSection}
      >
        <h2 className="font-medium">
          {isOpen ? '▼' : '►'} Invoicing Accounts
        </h2>
        <span>{isOpen ? 'Close' : 'Open'}</span>
      </div>

      {isOpen && (
        <div>
          {invoicingAccounts.length === 0 ? (
            <div className="text-gray-500 text-center py-4">
              No invoicing accounts found
            </div>
          ) : (
            invoicingAccounts.map((account) => (
              <div
                key={account._id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow mb-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                        account.accountType === 'business'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {account.accountType === 'business' ? 'Business' : 'Personal'}
                    </span>
                    <span className="text-lg font-bold text-gray-700">
                      {account.accountType === 'business'
                        ? account.organizationName
                        : `${account.firstName} ${account.lastName}`}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{account.address}</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="text-yellow-500 hover:text-yellow-600"
                    onClick={() => handleEditInvoicingAccount(account)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveInvoicingAccount(account._id)}
                    title="Remove"
                  >
                    ✖️
                  </button>
                </div>
              </div>
            ))
          )}

          <button
            type="button"
            className="mt-4 flex items-center gap-2 text-white bg-foundations-primary px-4 py-2 rounded-lg"
            onClick={() => {
              setShowEditForm(true);
              setIsEditingOrAdding(true);
              setEditingAccount(null);
            }}
          >
            <span>+</span> Add Invoicing Account
          </button>
        </div>
      )}
    </>
  );
};

export default InvoicingAccountsSection;