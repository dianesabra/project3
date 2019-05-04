const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  mealName: { type: String, required: true },
  cookName: { type: String, required: true },
  dietRestrictions: { type: String },
  mealDesc: { type: String, required: true },
  qtyOutstanding: { type: Number, required: true },
  price: { type: Number, required: true },
  _userID: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Meal", mealSchema);
