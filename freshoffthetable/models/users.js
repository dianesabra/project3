const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  GlutenFree: { type: Boolean },
  Vegan: { type: Boolean },
  TreeNuts: { type: Boolean },
  Veg: { type: Boolean },
  Pesct: { type: Boolean },
  DairyFree: { type: Boolean }
});

module.exports = mongoose.model("User", UserSchema);
