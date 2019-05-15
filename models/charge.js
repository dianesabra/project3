const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChargeSchema = new Schema({
  token: { type: String }
});

module.exports = mongoose.model("Charge", ChargeSchema);
