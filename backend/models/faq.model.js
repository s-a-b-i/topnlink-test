import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Category = mongoose.model('Category', categorySchema);
const FAQ = mongoose.model('FAQ', faqSchema);

export { Category, FAQ };