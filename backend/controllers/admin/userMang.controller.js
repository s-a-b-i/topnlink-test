import { User } from '../../models/user.model.js';
import {sendCustomEmail} from '../../mailtrap/emails.js';

/**
 * POST /api/admin/users/search
 * Body: { adminId, query }
 * Searches users by name or email. Only an admin can perform this.
 */
export const searchUsers = async (req, res) => {
  try {
    const { adminId, query } = req.body;

    // Check admin
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    // Search by regex on name or email
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ],
      isAdmin: false,
    }).lean();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/admin/users/all
 * Body: { adminId }
 * Returns all non-admin users (isAdmin: false). Only an admin can perform this.
 */
export const getAllUsers = async (req, res) => {
  try {
    const { adminId } = req.body;

    // Check admin
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    // Fetch only non-admin users
    const users = await User.find({ isAdmin: false }).lean();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/admin/users/status
 * Body: { adminId, active }  // active should be boolean
 * Fetch all users with the given status. Only an admin can perform this.
 */
export const getUsersByStatus = async (req, res) => {
  try {
    const { adminId, active } = req.body;

    // Check admin
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    const users = await User.find({ status: !!active,isAdmin : false }).lean();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/admin/users/verification
 * Body: { adminId, isVerified }
 * Returns users filtered by verification status (true/false). Only an admin can perform this.
 */
export const getUsersByVerification = async (req, res) => {
  try {
    const { adminId, isVerified } = req.body;

    // Check admin
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    // Fetch users by isVerified
    const users = await User.find({ isVerified: !!isVerified,isAdmin 
      : false
     }).lean();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/admin/users/change-status
 * Body: { adminId, userId, status }  // status should be boolean
 * Changes the status (active/inactive) of a user. Only an admin can perform this.
 */
export const changeUserStatus = async (req, res) => {
  try {
    const { adminId, userId, status } = req.body;

    // Check admin
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: !!status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.status(200).json({ message: 'Status updated successfully', user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/admin/users/delete
 * Body: { adminId, userId }
 * Deletes a user by ID. Only an admin can perform this.
 */
export const deleteUser = async (req, res) => {
  try {
    const { adminId, userId } = req.body;

    // Check admin
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



/**
 * POST /api/admin/users/send-email
 * Body: { adminId, email, subject, message }
 * Sends an email to the specified recipient. Only an admin can perform this.
 */
export const sendEmailByAdmin = async (req, res) => {
  try {
    const { adminId, email, subject, message } = req.body;

    // Check admin
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    // Validate email and fields
    if (!email || !subject || !message) {
      return res.status(400).json({ error: 'Missing email, subject, or message' });
    }

    // Send email using sendCustomEmail
    const success = await sendCustomEmail(email, subject, message);
    if (!success) {
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};