import mongoose from 'mongoose';

const daySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  value: { type: Number, default: 0 }
});

const monthSchema = new mongoose.Schema({
  month: { type: Number, required: true },
  days: [daySchema]
});

const yearSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  impressions: [monthSchema],
  clicks: [monthSchema],
  revenues: [monthSchema],
  sales: [monthSchema],
  addToCarts: [monthSchema],
  positions: [monthSchema],
  favourites: [monthSchema]
});

const statsSchema = new mongoose.Schema({
  websiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Website', required: true },
  years: [yearSchema],
},{
  timestamps: true,
});

const Stats = mongoose.model('Stats', statsSchema);
export default Stats;