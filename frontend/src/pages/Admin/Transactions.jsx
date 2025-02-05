import React, { useState, useEffect } from 'react';

const Skeleton = ({ width, height }) => {
  return (
    <div
      className="animate-pulse bg-gray-200 rounded"
      style={{ width: width || '100%', height: height || '20px' }}
    />
  );
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setTransactions([
        {
          id: 1,
          type: 'withdrawal',
          amount: 1500.00,
          publisher: 'Tech Media Group',
          status: 'pending',
          date: '2025-01-29',
          description: 'Monthly earnings withdrawal'
        },
        {
          id: 2,
          type: 'sale',
          amount: 2500.00,
          publisher: 'Digital Marketing Pro',
          advertiser: 'Brand Solutions Inc',
          status: 'completed',
          date: '2025-01-28',
          description: 'Advertisement package purchase'
        },
        {
          id: 3,
          type: 'dispute',
          amount: 750.00,
          publisher: 'Content Creators Ltd',
          advertiser: 'Global Ads Network',
          status: 'disputed',
          date: '2025-01-27',
          description: 'Service delivery dispute'
        }
      ]);
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
  }, []);

  const handleApprove = (id) => {
    setTransactions(prevTransactions =>
      prevTransactions.map(transaction =>
        transaction.id === id ? { ...transaction, status: 'approved' } : transaction
      )
    );
  };

  const handleReject = (id) => {
    setTransactions(prevTransactions =>
      prevTransactions.map(transaction =>
        transaction.id === id ? { ...transaction, status: 'rejected' } : transaction
      )
    );
  };

  const handleResolveDispute = (id) => {
    setTransactions(prevTransactions =>
      prevTransactions.map(transaction =>
        transaction.id === id ? { ...transaction, status: 'resolved' } : transaction
      )
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Transaction Management</h1>
          <p className="mt-2 text-gray-600">Monitor and manage platform transactions</p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {loading ? (
            <>
              <Skeleton width="100%" height="80px" />
              <Skeleton width="100%" height="80px" />
              <Skeleton width="100%" height="80px" />
              <Skeleton width="100%" height="80px" />
            </>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700">Pending Withdrawals</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {transactions.filter(t => t.type === 'withdrawal' && t.status === 'pending').length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700">Active Disputes</h3>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {transactions.filter(t => t.type === 'dispute' && t.status === 'disputed').length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700">Today's Sales</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  ${transactions.filter(t => t.type === 'sale' && t.date === '2025-01-30')
                    .reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700">Total Transactions</h3>
                <p className="text-3xl font-bold text-purple-600 mt-2">{transactions.length}</p>
              </div>
            </>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Type
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="all">All Types</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="sale">Sales</option>
                <option value="dispute">Disputes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="disputed">Disputed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex items-end">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Publisher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton width="50%" height="20px" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton width="30%" height="20px" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton width="30%" height="20px" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton width="40%" height="20px" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton width="30%" height="20px" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton width="30%" height="20px" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton width="50%" height="20px" />
                    </td>
                  </tr>
                ))
              ) : (
                transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{transaction.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${transaction.type === 'withdrawal' ? 'bg-blue-100 text-blue-800' :
                          transaction.type === 'sale' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${transaction.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.publisher}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'disputed' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {transaction.type === 'withdrawal' && transaction.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(transaction.id)}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(transaction.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {transaction.type === 'dispute' && transaction.status === 'disputed' && (
                        <button
                          onClick={() => handleResolveDispute(transaction.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Resolve
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setIsModalOpen(true);
                        }}
                        className="text-gray-600 hover:text-gray-900 ml-3"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">97</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Transaction Details
              </h3>
              <div className="space-y-3">
                <p><span className="font-medium">ID:</span> #{selectedTransaction.id}</p>
                <p><span className="font-medium">Type:</span> {selectedTransaction.type}</p>
                <p><span className="font-medium">Amount:</span> ${selectedTransaction.amount}</p>
                <p><span className="font-medium">Publisher:</span> {selectedTransaction.publisher}</p>
                {selectedTransaction.advertiser && (
                  <p><span className="font-medium">Advertiser:</span> {selectedTransaction.advertiser}</p>
                )}
                <p><span className="font-medium">Status:</span> {selectedTransaction.status}</p>
                <p><span className="font-medium">Date:</span> {selectedTransaction.date}</p>
                <p><span className="font-medium">Description:</span> {selectedTransaction.description}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;