import { Category, FAQ } from '../../models/faq.model.js';
import {User} from '../../models/user.model.js';

/**
 * Check if the user is an admin
 */
const checkAdmin = async (adminId) => {
  const adminUser = await User.findById(adminId);
  if (!adminUser || !adminUser.isAdmin) {
    throw new Error('Admin privileges required');
  }
};

/**
 * Add category
 */
export const addCategory = async (req, res) => {
  try {
    const { adminId, name } = req.body;
    await checkAdmin(adminId);

    const category = new Category({ name, userId: adminId });
    await category.save();

    return res.status(201).json({ message: 'Category added successfully', category });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Delete category
 */
export const deleteCategory = async (req, res) => {
  try {
    const { adminId, categoryId } = req.body;
    await checkAdmin(adminId);

    const category = await Category.findOneAndDelete({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    await FAQ.deleteMany({ category: categoryId });

    return res.status(200).json({ message: 'Category and related FAQs deleted successfully', category });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Get all categories
 */
export const getAllCategories = async (req, res) => {
  try {
    const { adminId } = req.body;
    await checkAdmin(adminId);

    const categories = await Category.find().lean();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Create FAQ
 */
export const createFAQ = async (req, res) => {
  try {
    const { adminId, question, category, answer } = req.body;
    await checkAdmin(adminId);

    const faq = new FAQ({ question, category, answer, userId: adminId });
    await faq.save();

    return res.status(201).json({ message: 'FAQ created successfully', faq });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Update FAQ
 */
export const updateFAQ = async (req, res) => {
  try {
    const { adminId, faqId, question, category, answer, active } = req.body;
    await checkAdmin(adminId);

    const faq = await FAQ.findByIdAndUpdate(
      faqId,
      { question, category, answer, active },
      { new: true }
    );

    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found.' });
    }

    return res.status(200).json({ message: 'FAQ updated successfully', faq });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Delete FAQ
 */
export const deleteFAQ = async (req, res) => {
  try {
    const { adminId, faqId } = req.body;
    await checkAdmin(adminId);

    const faq = await FAQ.findByIdAndDelete(faqId);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found.' });
    }

    return res.status(200).json({ message: 'FAQ deleted successfully', faq });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Change FAQ status
 */
export const changeFAQStatus = async (req, res) => {
  try {
    const { adminId, faqId, active } = req.body;
    await checkAdmin(adminId);

    const faq = await FAQ.findByIdAndUpdate(
      faqId,
      { active },
      { new: true }
    );

    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found.' });
    }

    return res.status(200).json({ message: 'FAQ status updated successfully', faq });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Admin API: Search FAQs by question
 */
export const searchFAQsByQuestionAdmin = async (req, res) => {
  try {
    const { adminId, query } = req.body;
    await checkAdmin(adminId);

    const faqs = await FAQ.find({ question: { $regex: query, $options: 'i' } }).lean();
    return res.status(200).json(faqs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Get FAQs by category
 */
export const getFAQsByCategory = async (req, res) => {
    try {
      const { adminId, categoryId } = req.body;
      await checkAdmin(adminId);
  
      const faqs = await FAQ.find({ category: categoryId }).lean();
      return res.status(200).json(faqs);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


  /**
 * Public API: Get all categories
 */
export const getAllCategoriesPublic = async (req, res) => {
    try {
      const categories = await Category.find().lean();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  /**
   * Public API: Get FAQs by category
   */
  export const getFAQsByCategoryPublic = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const faqs = await FAQ.find({ category: categoryId,active : true }).lean();
      return res.status(200).json(faqs);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  /**
 * Public API: Search FAQs by question
 */
export const searchFAQsByQuestion = async (req, res) => {
  try {
    const { query } = req.query;
    const faqs = await FAQ.find({ question: { $regex: query, $options: 'i' }, active : true }).lean();
    return res.status(200).json(faqs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};