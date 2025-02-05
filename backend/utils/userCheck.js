import {User} from '../models/user.model.js';

export const checkUserAndBlockStatus = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found or not authorized');
  }

  if (user.status === false) {
    throw new Error('This user account has been deactivated');
  }

  return user;
};