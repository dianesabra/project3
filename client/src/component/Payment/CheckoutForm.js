import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Redirect } from "react-router-dom";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  state = {
    toFoodFeed: false
  };

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) {
      alert("Purchase Complete!");
      this.setState({ toFoodFeed: true });
    }

    // console.log("Purchase Complete!");
  }

  render() {
    if (this.state.toFoodFeed === true) {
      return <Redirect to="/main/" />;
    }
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
