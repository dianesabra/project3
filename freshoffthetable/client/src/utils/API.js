import axios from "axios";

export default {
  saveMeal: function(mealData) {
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
    console.log(userData);
    return axios.post("/api/users", userData);
  }
};
