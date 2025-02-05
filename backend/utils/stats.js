import Stats from '../models/stats.model.js';

// Helper function to get the number of days in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

// Utility function to create or update stats
export const createOrUpdateStats = async ({ userId, websiteId, year, month, day, updates }) => {
  if (!userId || !websiteId || !year || !month || !day || !updates) {
    throw new Error('All fields are required');
  }

  // Find the stats document for the user and website
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
  return stats;
};