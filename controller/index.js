const db = require("../models");
module.exports = {
  // food feed
  getMeals(req, res) {
    db.Meals.find(req.body)
      .where("qtyOutstanding")
      .gt(0)
      .then(function(dbMeals) {
        res.json(dbMeals);
      });
  },
  // Cook sees posted meals
  getMealByCook(req, res) {
    db.Meals.find({ _userID: req.body }).then(function(dbMeals) {
      res.json(dbMeals);
    });
  },
  // Cook sees posted meals
  getOrderForCart(req, res) {
    db.Orders.find({
      _userID: req.params.id,
      qtyFulfilled: req.params.qtyFulfilled
    }).then(function(dbMeals) {
      res.json(dbMeals);
    });
  },
  // anyone can post
  postMeal(req, res) {
    db.Meals.create(req.body).then(function(dbMeals) {
      res.json(dbMeals);
    });
  },
  // only cook can delete
  deleteMeal(req, res) {
    db.Meals.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(res => {
        db.Orders.deleteMany({ _mealID: req.params.id });
      })
      .then(function(dbMeals) {
        res.json(dbMeals);
      })
      .catch(err => console.log(err));
  },
  // only for the cook
  getOrders(req, res) {
    db.Orders.find(req.body).then(function(dbOrders) {
      res.json(dbOrders);
      // filter by user ID and meal ID
    });
  },
  // anyone can post
  postOrders(req, res) {
    db.Orders.create(req.body).then(function(dbOrders) {
      res.json(dbOrders);
    });
  },
  // only cook
  deleteOrders(req, res) {
    db.Orders.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(function(dbOrders) {
        res.json(dbOrders);
      });
  },

  getUser(req, res) {
    db.User.find({ email: req.body.email })
      .then(function(user) {
        if (user.length < 1) return res.json({ error: "User does not exist." });
        if (user[0].password !== req.body.password)
          return res.json({ error: "Incorrect password." });
        // anything in the res.json is sent to the .then function in the front-end to resolve the promise
        res.json(user[0]);
        // Would crash if there is no user and there is no method to catch the error
      })
      .catch(err => {
        console.log(err);
      });
  },
  // anyone can
  postUser(req, res) {
    db.User.find({ email: req.body.email }).then(function(user) {
      if (user.length > 0) return res.json({ error: "User already exists." });
      db.User.create(req.body)
        .then(function(dbUser) {
          res.json(dbUser);
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
  postCharge(req, res) {
    db.Charge.create(req.body).then(function(dbCharge) {
      res.json(dbCharge);
    });
  },

  updateQty(req, res) {
    db.Meals.findById({ _id: req.params.id }).then(dbModel => {
      db.Meals.update(
        {
          _id: req.params.id
        },
        {
          qtyOutstanding: dbModel.qtyOutstanding - req.params.qtyFulfilled
        }
      ).then(function(dbMeals) {
        db.Orders.update(
          {
            _id: req.params.orderID
          },
          {
            qtyFulfilled: true
          }
        ).then(console.log("Diane"));

        res.json(dbMeals);
      });
    });
  }
};
