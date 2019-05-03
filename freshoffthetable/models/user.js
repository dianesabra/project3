const mongoose = require("mongoose");
const userSchema = mongoose.Schema;

const UserSchema = new userSchema({
  userName: { type: String, required: true },
  GlutenFree: { type: Boolean },
  Vegan: { type: Boolean },
  TreeNuts: { type: Boolean },
  Veg: { type: Boolean },
  Pesct: { type: Boolean },
  DairyFree: { type: Boolean }
});

module.exports = mongoose.model("User", UserSchema);
