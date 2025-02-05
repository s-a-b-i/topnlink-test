import Website from '../../models/website.model.js';
import {User} from '../../models/user.model.js';
import { sendCustomEmail } from '../../mailtrap/emails.js';

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
 * Get websites count by status
 */
export const getWebsitesCountByStatus = async (req, res) => {
  try {
    const { adminId, status } = req.body;
    await checkAdmin(adminId);

    const count = await Website.countDocuments({ status });
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Search websites
 */
export const searchWebsites = async (req, res) => {
  try {
    const { adminId, searchInput } = req.body;
    await checkAdmin(adminId);

    const websites = await Website.find({
      $or: [
        { webDomain: { $regex: searchInput, $options: 'i' } },
        { mediaName: { $regex: searchInput, $options: 'i' } },
        { mediaType: { $regex: searchInput, $options: 'i' } },
        // Add other fields as needed
      ],
    }).lean();

    return res.status(200).json(websites);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Get websites by status
 */
export const getWebsitesByStatus = async (req, res) => {
  try {
    const { adminId, status } = req.body;
    await checkAdmin(adminId);

    const websites = await Website.find({ status }).lean();
    return res.status(200).json(websites);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Change website status
 */
export const changeWebsiteStatus = async (req, res) => {
  try {
    const { adminId, websiteId, status } = req.body;
    await checkAdmin(adminId);

    const website = await Website.findByIdAndUpdate(
      websiteId,
      { status },
      { new: true }
    );

    if (!website) {
      return res.status(404).json({ error: 'Website not found.' });
    }
    return res.status(200).json({ message: 'Status updated successfully', website });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Delete website
 */
export const deleteWebsite = async (req, res) => {
  try {
    const { adminId, websiteId } = req.body;
    await checkAdmin(adminId);

    const website = await Website.findByIdAndDelete(websiteId);
    if (!website) {
      return res.status(404).json({ error: 'Website not found.' });
    }
    return res.status(200).json({ message: 'Website deleted successfully', website });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Get website data
 */
export const getWebsiteData = async (req, res) => {
  try {
    const { adminId, websiteId } = req.body;
    await checkAdmin(adminId);

    const website = await Website.findById(websiteId).lean();
    if (!website) {
      return res.status(404).json({ error: 'Website not found.' });
    }
    return res.status(200).json(website);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Send email
 */
export const sendEmail = async (req, res) => {
  try {
    const { adminId, email, subject, message } = req.body;
    await checkAdmin(adminId);

    const success = await sendCustomEmail(email, subject, message);
    if (!success) {
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


/**
 * Get user by ID
 */
export const getUserById = async (req, res) => {
  try {
    const { adminId, userId } = req.body;
    await checkAdmin(adminId);

    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};