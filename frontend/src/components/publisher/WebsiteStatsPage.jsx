import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { FaChevronDown, FaArrowLeft } from 'react-icons/fa';
import { statsService, websiteService } from '../../utils/services';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Chart.js registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Color constants for metrics
const METRIC_COLORS = {
  impressions: '#4CAF50',
  clicks: '#2196F3',
  addToCarts: '#FF9800',
  revenues: '#9C27B0',
  sales: '#F44336',
  positions: '#607D8B',
  favourites: '#FF5722'
};

// Date formatting utility
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit'
  });
};

const MetricSection = ({ title, data, color, isLoading, period, selectedMonth }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const chartData = {
    labels: data?.map(item => {
      // For daily data (in monthly mode)
      if (period === 'monthly' && item.day) {
        // Construct full date using selectedMonth and day value
        const dayStr = String(item.day).padStart(2, '0');
        const fullDate = `${selectedMonth}-${dayStr}`;
        return formatDate(fullDate);
      }
      // Fallback: use date property if available, or month property
      if (item.date) {
        return formatDate(item.date);
      } else if (item.month) {
        return formatDate(item.month);
      }
      return '';
    }) || [],
    datasets: [
      {
        label: title,
        data: data?.map(item => item.value) || [],
        borderColor: color,
        backgroundColor: color + '33', // slight transparency
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2,
        pointBorderColor: color,
        pointBackgroundColor: 'white',
        fill: 'start'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: true,
        position: 'top',
        labels: { color: 'rgba(0, 0, 0, 0.7)', font: { size: 12 } }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: { label: (context) => `${title}: ${context.raw}` }
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        ticks: { stepSize: 0.5, maxTicksLimit: 8, color: 'rgba(0, 0, 0, 0.6)' },
        grid: { color: 'rgba(0, 0, 0, 0.1)' }
      },
      x: { 
        grid: { display: false },
        ticks: { maxRotation: 45, minRotation: 45, maxTicksLimit: 12, color: 'rgba(0, 0, 0, 0.6)' }
      }
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
    elements: { line: { borderCapStyle: 'round' } }
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div 
        className="flex justify-between items-center p-4 bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white cursor-pointer rounded-t-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="font-bold text-sm sm:text-base">{title}</h2>
        <FaChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
      {isExpanded && (
        <div className="p-2 sm:p-4" style={{ height: '300px', minHeight: '300px' }}>
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader />
            </div>
          ) : data?.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm sm:text-base">
              No data available yet
            </div>
          ) : (
            <Line data={chartData} options={options} />
          )}
        </div>
      )}
    </div>
  );
};

const WebsiteStatsPage = () => {
  const { websiteId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [period, setPeriod] = useState('last12months');
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  });

  const [metricsData, setMetricsData] = useState({
    impressions: [],
    clicks: [],
    addToCarts: [],
    revenues: [],
    sales: [],
    favourites: []
  });

  // Fetch website details on component mount
  useEffect(() => {
    if (!websiteId || !user?._id) {
      toast.error('Invalid website ID or user not authenticated');
      navigate('/publisher/products');
      return;
    }

    const fetchWebsiteDetails = async () => {
      try {
        const websiteData = await websiteService.getWebsiteById(websiteId, user._id);
        if (!websiteData) throw new Error('Website not found');
      } catch (err) {
        toast.error(err.message || 'Failed to load website details');
        navigate('/publisher/products');
      }
    };

    fetchWebsiteDetails();
  }, [websiteId, user?._id, navigate]);

  // Fetch statistics based on selected period
  useEffect(() => {
    if (!websiteId || !user?._id) return;

    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
    
      try {
        let stats;
        switch (period) {
          case 'last30days':
            stats = await statsService.getLast30DaysStats(user._id, websiteId);
            break;
          case 'monthly': {
            const [year, month] = selectedMonth.split('-');
            stats = await statsService.getMonthlyStats(user._id, websiteId, parseInt(year), parseInt(month));
            break;
          }
          case 'last12months':
          default:
            stats = await statsService.getLast12MonthsStats(user._id, websiteId);
            break;
        }
        console.log('Fetched stats:', stats);
    
        // If stats is missing any metric, default to an empty array.
        setMetricsData({
          impressions: stats?.impressions || [],
          clicks: stats?.clicks || [],
          addToCarts: stats?.addToCarts || [],
          revenues: stats?.revenues || [],
          sales: stats?.sales || [],
          favourites: stats?.favourites || []
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch statistics');
        toast.error(err.message || 'Failed to load statistics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [websiteId, user?._id, period, selectedMonth]);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/publisher/products')}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-sm sm:text-base"
        >
          <FaArrowLeft className="text-sm" />
          Back to Products
        </button>
        
        <div className="flex flex-wrap gap-3 items-center">
          <select 
            className="p-2 border rounded-md text-sm sm:text-base min-w-[120px]"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="last12months">Last 12 Months</option>
            <option value="last30days">Last 30 Days</option>
            <option value="monthly">Monthly</option>
          </select>
          
          {period === 'monthly' && (
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-2 border rounded-md text-sm sm:text-base"
              max={new Date().toISOString().slice(0, 7)}
            />
          )}
        </div>
      </div>

      {error ? (
        <div className="flex flex-col justify-center items-center h-[50vh] text-red-500 text-center p-4">
          <p className="text-lg sm:text-xl font-bold mb-2">Error loading statistics</p>
          <p className="text-sm sm:text-base">{error}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {Object.entries(metricsData).map(([key, data]) => (
            <MetricSection 
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              data={data}
              color={METRIC_COLORS[key]}
              isLoading={isLoading}
              period={period}
              selectedMonth={selectedMonth}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WebsiteStatsPage;