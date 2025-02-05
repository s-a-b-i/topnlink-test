import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  websiteId: { type: Schema.Types.ObjectId, ref: 'Website', required: true }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;