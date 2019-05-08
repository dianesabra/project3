import React, { Component } from "react";
import API from "../utils/API";
import { List, ListItem } from "../component/List";

class Cart extends Component {
  state = {
    orders: [],
    userid: ""
  };

  componentDidMount() {
    const username = localStorage.getItem("userid");
    this.setState({ userid: username });
    this.loadData();
  }

  loadData = () => {
    API.getOrder()
      .then(res =>
        this.setState({
          orders: res.data
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <p>Orders</p>
        {this.state.orders.length ? (
          <List>
            {this.state.orders
              .filter(
                order =>
                  order._userID === this.state.userid && !order.qtyFulfilled
              )
              .map(order => (
                <ListItem key={order._id}>
                  <p>{order.mealName}</p>
                  <p>{order.reqQty}</p>
                  <p>{order.pickupAddress}</p>
                  <p>{order.pickupDate}</p>
                  <p>{order.specInstructions}</p>
                  <button onClick={() => this.deleteOrder(order._id)}>
                    Delete Me
                  </button>
                </ListItem>
              ))}
          </List>
        ) : (
          <h3>None</h3>
        )}
      </div>
    );
  }
}

export default Cart;
