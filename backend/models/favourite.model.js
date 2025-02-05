import mongoose from "mongoose";
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  websiteId: { type: Schema.Types.ObjectId, ref: "Website", required: true },
});

const Facourite = mongoose.model("Favourite", favouriteSchema);

export default Facourite;
