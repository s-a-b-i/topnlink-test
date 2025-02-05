import mongoose from 'mongoose';

const invoiceAccountSchema = new mongoose.Schema({
  accountType: {
    type: String,
    enum: ['personal', 'business'],
    required: true
  },
  firstName: {
    type: String,
    required: function() { return this.accountType === 'personal'; }
  },
  lastName: {
    type: String,
    required: function() { return this.accountType === 'personal'; }
  },
  vatNumber: {
    type: String,
    required: function() { return this.accountType === 'business'; }
  },
  organizationName: {
    type: String,
    required: function() { return this.accountType === 'business'; }
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const InvoiceAccount = mongoose.model('InvoiceAccount', invoiceAccountSchema);

export default InvoiceAccount;