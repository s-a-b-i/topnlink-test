import InvoiceAccount from '../models/invoiceAccount.model.js';

// Create a new invoice account
export async function createInvoiceAccount(req, res) {
  try {

    const userId = req.body.userId;

    if(!userId){
        return res.status(400).json({ message: 'User ID is required' });
    }

    const newInvoiceAccount = new InvoiceAccount(req.body);
    const savedInvoiceAccount = await newInvoiceAccount.save();
    res.status(201).json(savedInvoiceAccount);
  } catch (error) {
    res.status(500).json({ message: 'Error creating invoice account', error: error.message });
  }
}

// Get all invoice accounts
export async function getInvoiceAccounts(req, res) {
  try {

    const userId = req.body.userId;

    if(!userId){
        return res.status(400).json({ message: 'User ID is required' });
    }

    const invoiceAccounts = await InvoiceAccount.find({ userId: userId });
    res.status(200).json(invoiceAccounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoice accounts', error: error.message });
  }
}

// Get a single invoice account by ID
export async function getInvoiceAccount(req, res) {
  try {
    const invoiceAccount = await InvoiceAccount.findById(req.params.id);
    if (!invoiceAccount) {
      return res.status(404).json({ message: 'Invoice account not found' });
    }
    res.status(200).json(invoiceAccount);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoice account', error: error.message });
  }
}

// Update an invoice account by ID
export async function updateInvoiceAccount(req, res) {
  try {
    const updatedInvoiceAccount = await InvoiceAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInvoiceAccount) {
      return res.status(404).json({ message: 'Invoice account not found' });
    }
    res.status(200).json(updatedInvoiceAccount);
  } catch (error) {
    res.status(500).json({ message: 'Error updating invoice account', error: error.message });
  }
}

// Delete an invoice account by ID
export async function deleteInvoiceAccount(req, res) {
  try {
    const deletedInvoiceAccount = await InvoiceAccount.findByIdAndDelete(req.params.id);
    if (!deletedInvoiceAccount) {
      return res.status(404).json({ message: 'Invoice account not found' });
    }
    res.status(200).json({ message: 'Invoice account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting invoice account', error: error.message });
  }
}