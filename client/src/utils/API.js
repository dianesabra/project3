import axios from "axios";

export default {
  saveMeal: function(mealData) {
    return axios.post("/api/meals", mealData);
  },
  getMeal: function() {
    return axios.get("/api/meals");
  },
  deleteMeal: function(id) {
    debugger;
    return axios.delete("/api/meals/" + id);
  },
  saveOrder: function(orderData) {
    return axios.post("/api/orders", orderData);
  },
  getRequests: function(id) {
    return axios.get("/api/requests/" + id);
  },
  getOrder: function(id) {
    return axios.get("/api/orders/" + id);
  },
  deleteOrder: function(id) {
    return axios.delete("/api/orders/" + id);
  },
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },

  // data has the values from formData in Login.js
  getUser: function(data) {
    return axios.post("/api/users/login", data);
  },
  getMealByCook: function(id) {
    return axios.get("/api/meals/" + id);
  },
  getOrderForCart: function(cartData) {
    return axios.get(
      "/api/orders/" + cartData.userid + "/" + cartData.qtyFulfilled
    );
  },
  updateMeal: function(cartData) {
    return axios.put(
      "/api/orders/" +
        cartData.mealID +
        "/" +
        cartData.qtyOutstanding +
        "/" +
        cartData.orderID
    );
  }
};
