import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  emailLanguage: {
    type: String,
    required: true
  },
  publisherCompanyName: {
    type: String,
    required: true
  },
  avatar: {
    type: String, // URL of the uploaded image
    required: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;