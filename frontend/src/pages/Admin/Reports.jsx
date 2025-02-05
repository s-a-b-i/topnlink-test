import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  DownloadIcon, 
  CalendarIcon, 
  ChartBarIcon,
  DocumentDownloadIcon 
} from '@heroicons/react/outline';

const Skeleton = ({ width, height }) => {
  return (
    <div
      className="animate-pulse bg-gray-200 rounded"
      style={{ width: width || '100%', height: height || '20px' }}
    />
  );
};

const Reports = () => {
  const [dateRange, setDateRange] = useState('last7days');
  const [selectedReport, setSelectedReport] = useState('revenue');
  const [loading, setLoading] = useState(true);

  // Sample data - replace with actual data from your backend
  const revenueData = [
    { date: '2024-01-24', revenue: 4500, campaigns: 12, users: 450 },
    { date: '2024-01-25', revenue: 5200, campaigns: 15, users: 520 },
    { date: '2024-01-26', revenue: 4800, campaigns: 13, users: 480 },
    { date: '2024-01-27', revenue: 6000, campaigns: 18, users: 600 },
    { date: '2024-01-28', revenue: 5500, campaigns: 16, users: 550 },
    { date: '2024-01-29', revenue: 4900, campaigns: 14, users: 490 },
    { date: '2024-01-30', revenue: 5800, campaigns: 17, users: 580 },
  ];

  const campaignData = [
    { name: 'Display Ads', value: 35 },
    { name: 'Video Ads', value: 25 },
    { name: 'Native Ads', value: 20 },
    { name: 'Social Ads', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleExport = (format) => {
    // Implement export logic here
    console.log(`Exporting data in ${format} format`);
  };

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-4">
          {/* Date Range Selector */}
          <div className="relative">
            <select
              className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          {/* Report Type Selector */}
          <div className="relative">
            <select
              className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none"
              value={selectedReport}
 onChange={(e) => setSelectedReport(e.target.value)}
            >
              <option value="revenue">Revenue Report</option>
              <option value="campaigns">Campaign Performance</option>
              <option value="users">User  Activity</option>
            </select>
            <ChartBarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          {/* Export Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <DocumentDownloadIcon className="h-5 w-5 mr-2" />
              Export CSV
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <DownloadIcon className="h-5 w-5 mr-2" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {loading ? (
            <>
              <Skeleton width="100%" height="80px" />
              <Skeleton width="100%" height="80px" />
              <Skeleton width="100%" height="80px" />
              <Skeleton width="100%" height="80px" />
            </>
          ) : (
            <>
              <SummaryCard
                title="Total Revenue"
                value="$36,700"
                change="+12.5%"
                isPositive={true}
              />
              <SummaryCard
                title="Active Campaigns"
                value="105"
                change="+5.2%"
                isPositive={true}
              />
              <SummaryCard
                title="Conversion Rate"
                value="3.2%"
                change="-0.8%"
                isPositive={false}
              />
              <SummaryCard
                title="Active Users"
                value="3,670"
                change="+8.1%"
                isPositive={true}
              />
            </>
          )}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Revenue Trend Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
            <div className="h-[300px]">
              {loading ? (
                <Skeleton width="100%" height="100%" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#4F46E5" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Campaign Distribution */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Campaign Distribution</h2>
            <div className="h-[300px]">
              {loading ? (
                <Skeleton width="100%" height="100%" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={campaignData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {campaignData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Stats Table */}
        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b">
            <h2 className="text-lg font-semibold">Detailed Statistics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 ">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaigns</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Users</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  Array.from({ length: 7 }).map((_, index) => (
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
                        <Skeleton width="30%" height="20px" />
                      </td>
                    </tr>
                  ))
                ) : (
                  revenueData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.revenue}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.campaigns}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.users}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
      <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change} from last period
      </p>
    </div>
  );
};

export default Reports;