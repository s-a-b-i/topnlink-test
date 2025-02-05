import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema({
  promoName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Website',
    required: true,
  }],
  discount: {
    type: Number,
    required: true
  },
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  }
},{
    timestamps: true
});

const Promo = mongoose.model('Promo', promoSchema);

export default Promo;