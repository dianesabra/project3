const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
// const app = express();
const PORT = process.env.PORT || 3001;
const app = require("express")();
const stripe = require("stripe")("sk_test_2BL0C2mSd1kSID9fQXdAIzFD00xjjx36SG");

app.use(require("body-parser").text());
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/freshoffthetable"
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

app.post("/charge", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });
    console.log(status);
    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});
