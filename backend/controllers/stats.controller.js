import Stats from '../models/stats.model.js';
import { checkUserAndBlockStatus } from '../utils/userCheck.js';

// Helper function to get the number of days in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

// Create or Update Stats
export const createOrUpdateStats = async (req, res) => {
  try {
    const {userId, websiteId, year, month, day, updates } = req.body;
    if (!userId || !websiteId || !year || !month || !day || !updates) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Find the stats document for the website
    let stats = await Stats.findOne({ websiteId });
    if (!stats) {
      stats = new Stats({ websiteId, years: [] });
    }

    // Find or initialize the year data
    let yearData = stats.years.find(y => y.year === year);
    if (!yearData) {
      yearData = { year, impressions: [], clicks: [], revenues: [], sales: [], addToCarts: [], positions: [], favourites: [] };
      stats.years.push(yearData);
    }

    // Update each field in the updates object
    for (const [field, value] of Object.entries(updates)) {
      // Ensure the field is initialized as an array
      if (!yearData[field]) {
        yearData[field] = [];
      }

      // Find or initialize the month data
      const fieldData = yearData[field];
      let monthData = fieldData.find(m => m.month === month);
      if (!monthData) {
        const daysInMonth = getDaysInMonth(year, month);
        monthData = { month, days: Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, value: 0 })) };
        fieldData.push(monthData);
      }

      // Find or initialize the day data
      const dayData = monthData.days.find(d => d.day === day);
      if (dayData) {
        dayData.value += value; // Increment the value
      } else {
        monthData.days.push({ day, value });
      }
    }

    // Update the yearData in the stats object
    const yearIndex = stats.years.findIndex(y => y.year === year);
    stats.years[yearIndex] = yearData;

    // Save the updated stats document
    await stats.save();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Stats by Year and Month
export const getStatsByYearAndMonth = async (req, res) => {
  try {
    const { userId, websiteId, year, month } = req.body;
    if (!userId || !websiteId || !year || !month) {
      return res.status(400).json({ error: 'User ID, Website ID, Year, and Month are required' });
    }

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const stats = await Stats.findOne({ websiteId });
    if (!stats) {
      return res.status(404).json({ error: 'Stats not found' });
    }

    const yearData = stats.years.find(y => y.year === year);
    if (!yearData) {
      return res.status(404).json({ error: 'Year not found' });
    }

    const result = {};
    ['impressions', 'clicks', 'revenues', 'sales', 'addToCarts', 'positions', 'favourites'].forEach(field => {
      const monthData = yearData[field].find(m => m.month === month);
      result[field] = monthData ? monthData.days : [];
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Last 30 Days Stats
export const getLast30DaysStats = async (req, res) => {
  try {
    const { userId, websiteId } = req.body;
    if (!userId || !websiteId) {
      return res.status(400).json({ error: 'User ID and Website ID are required' });
    }

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const stats = await Stats.findOne({ websiteId });
    if (!stats) {
      return res.status(404).json({ error: 'Stats not found' });
    }

    const result = {};
    const today = new Date();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date;
    }).reverse();

    ['impressions', 'clicks', 'revenues', 'sales', 'addToCarts', 'positions', 'favourites'].forEach(field => {
      result[field] = last30Days.map(date => {
        const yearData = stats.years.find(y => y.year === date.getFullYear());
        if (!yearData) return { date: date.toISOString().split('T')[0], value: 0 };

        const monthData = yearData[field].find(m => m.month === date.getMonth() + 1);
        if (!monthData) return { date: date.toISOString().split('T')[0], value: 0 };

        const dayData = monthData.days.find(d => d.day === date.getDate());
        return { date: date.toISOString().split('T')[0], value: dayData ? dayData.value : 0 };
      });
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Last 12 Months Stats
export const getLast12MonthsStats = async (req, res) => {
  try {
    const { userId, websiteId } = req.body;
    if (!userId || !websiteId) {
      return res.status(400).json({ error: 'User ID and Website ID are required' });
    }

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const stats = await Stats.findOne({ websiteId });
    if (!stats) {
      return res.status(404).json({ error: 'Stats not found' });
    }

    const result = {};
    const today = new Date();
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      return date;
    }).reverse();

    ['impressions', 'clicks', 'revenues', 'sales', 'addToCarts', 'positions', 'favourites'].forEach(field => {
      result[field] = last12Months.map(date => {
        const yearData = stats.years.find(y => y.year === date.getFullYear());
        if (!yearData) return { month: date.toISOString().split('T')[0], value: 0 };

        const monthData = yearData[field].find(m => m.month === date.getMonth() + 1);
        const monthValue = monthData ? monthData.days.reduce((sum, day) => sum + day.value, 0) : 0;
        return { month: date.toISOString().split('T')[0], value: monthValue };
      });
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
