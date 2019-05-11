import axios from "axios";

export default {
  saveMeal: function(mealData) {
    console.log(mealData);
    return axios.post("/api/meals", mealData);
  },
  getMeal: function() {
    return axios.get("/api/meals");
  },
  deleteMeal: function(id) {
    return axios.delete("/api/meals/" + id);
  },
  saveOrder: function(orderData) {
    return axios.post("/api/orders", orderData);
  },
  getOrder: function() {
    return axios.get("/api/orders");
  },
  deleteOrder: function(id) {
    return axios.delete("/api/orders/" + id);
  },
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },
  
  // data has the values from formData in Login.js
  getUser: function(data) {
    return axios.post('/api/users/login', data)
  },
  getMealByCook: function(id) {
    return axios.get("/api/meals/" + id);
  },
  getOrderForCart: function(cartData) {
    return axios.get("/api/meals/", cartData);
  }
};
