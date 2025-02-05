import Promo from '../models/promo.model.js';

// get all promos
export async function getAllPromos(req, res) {
  try {
    const promos = await Promo.find();
    res.status(200).json(promos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching promos', error: error.message });
  }
}


// get recently created 5 promos
export async function getRecentlyCreatedPromos(req, res) {
  try {
    const promos = await Promo.find().sort({ createdAt: -1 }).limit(req.params.limit || 5);
    res.status(200).json(promos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching promos', error: error.message });
  }
}


// Create a new promo
export async function createPromo(req, res) {
  try {

    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
        }

    const newPromo = new Promo(req.body);
    const savedPromo = await newPromo.save();
    res.status(201).json(savedPromo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating promo', error: error.message });
  }
}

// Get all promos for a user
export async function getPromos(req, res) {
  try {

    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
        }

    const promos = await Promo.find({ userId: userId });
    res.status(200).json(promos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching promos', error: error.message });
  }
}

// Get a single promo by ID
export async function getPromo(req, res) {
  try {
    const promo = await Promo.findById(req.params.id);
    if (!promo) {
      return res.status(404).json({ message: 'Promo not found' });
    }
    res.status(200).json(promo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching promo', error: error.message });
  }
}

// Update a promo by ID
export async function updatePromo(req, res) {
  try {
    const updatedPromo = await Promo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPromo) {
      return res.status(404).json({ message: 'Promo not found' });
    }
    res.status(200).json(updatedPromo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating promo', error: error.message });
  }
}

// Delete a promo by ID
export async function deletePromo(req, res) {
  try {
    const deletedPromo = await Promo.findByIdAndDelete(req.params.id);
    if (!deletedPromo) {
      return res.status(404).json({ message: 'Promo not found' });
    }
    res.status(200).json({ message: 'Promo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting promo', error: error.message });
  }
}