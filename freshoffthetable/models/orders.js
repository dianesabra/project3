const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  _mealID: {
    type: Schema.Types.ObjectId,
    ref: "Meals"
  },
  mealName: { type: String, required: true },
  reqQty: { type: Number, required: true },
  pickupAddress: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  specInstructions: { type: String, required: true }
});

module.exports = mongoose.model("Order", OrderSchema);
