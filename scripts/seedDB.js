const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/freshoffthetable"
);

const mealSeed = [
  {
    mealName: "Tabouli",
    cookName: "Chef Ramsey",
    dietRestrictions: "Vegan",
    mealDesc:
      "Tabbouleh is a Levantine vegetarian salad made mostly of finely chopped parsley, with tomatoes, mint, onion, bulgur, and seasoned with olive oil, lemon juice, salt and pepper. Some variations add garlic or lettuce, or use couscous instead of bulgur.",
    qtyOutstanding: 12,
    price: 13,
    _userID: "5cd0f06b572da53ac8386868",
    orderPaid: false,
    image:
      "http://prod.static9.net.au/_/media/2017/10/26/14/27/the-shahrouk-sisters-tabouli-recipe.jpg"
  },
  {
    mealName: "Jollof Rice",
    cookName: "Suzie T.",
    dietRestrictions: "N/A",
    mealDesc:
      "Jollof rice or just jollof, also called Benachin, is a one-pot rice dish popular in many West African countries.",
    qtyOutstanding: 5,
    price: 20,
    _userID: "5cd0f06b572da53ac8386868",
    orderPaid: false,
    image:
      "https://healthynibblesandbits.com/wp-content/uploads/2017/04/Vegan-Jollof-Rice-1.jpg"
  },
  {
    mealName: "Pepperoni",
    cookName: "Clayton Gray",
    dietRestrictions: "N/A",
    mealDesc:
      "Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients baked at a high temperature, traditionally in a wood-fired oven.",
    qtyOutstanding: 20,
    price: 5,
    _userID: "5cd0f06b572da53ac8386868",
    orderPaid: false,
    image:
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Frecipes%2Fck%2Fgluten-free-cookbook%2Fpepperoni-pizza-ck-x.jpg%3Fitok%3DNWreajsZ&w=450&c=sc&poi=face&q=85"
  },
  {
    mealName: "Crepes",
    cookName: "Jean-Paul",
    dietRestrictions: "Contains Nuts",
    mealDesc:
      "A crêpe or crepe is a type of very thin pancake. Crêpes are usually of two types: sweet crêpes and savoury galettes. Crêpes are served with a variety of fillings, from the simplest with only sugar to flambéed crêpes Suzette or elaborate savoury galettes.",
    qtyOutstanding: 7,
    price: 10,
    _userID: "5cd0f06b572da53ac8386868",
    orderPaid: false,
    image:
      "https://www.fifteenspatulas.com/wp-content/uploads/2010/12/Crepes-Fifteen-Spatulas-1.jpg"
  },
  {
    mealName: "Chocolate Lava Cake",
    cookName: "Nikki B.",
    dietRestrictions: "Not For Dieters!",
    mealDesc:
      "A petit gâteau, or chocolate fondant, is a dessert composed of a small chocolate cake with crunchy rind and mellow filling that is conventionally served hot with vanilla ice cream on a plate. In French, the terms for the chocolate cake are 'gâteau fondant au chocolat' or simply 'fondant au chocolat.'",
    qtyOutstanding: 7,
    price: 10,
    _userID: "5cd0f06b572da53ac8386868",
    orderPaid: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTxMvqvlWtDAs3CKsoeM26GRWPC7M2DaSCyejzuwHOmnQTcLqn3w"
  }
];

db.Meals.remove({})
  .then(() => db.Meals.collection.insertMany(mealSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
