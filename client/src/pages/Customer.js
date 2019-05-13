import React, { Component } from 'react';
import API from '../utils/API';
import { List, ListItem } from '../component/List';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

class Customer extends Component {
	state = {
		search: '',
		orders: [],
		open: false
	};

	componentDidMount() {
		const username = localStorage.getItem('userid');
		this.setState({ userid: username });
		this.loadData();
	}

	loadData = () => {
		API.getOrder()
			.then((res) =>
				this.setState({
					orders: res.data
				})
			)
			.catch((err) => console.log(err));
	};

	handleInputChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleFormSearch = (e) => {
		e.preventDefault();
	};

	deleteOrder = (id) => {
		API.deleteOrder(id)
			.then((res) => {
				// make sound when post is made
				this.loadData();
			})
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<div>
				<p>Orders</p>
				{this.state.orders.length ? (
					<List>
						{this.state.orders.filter((meal) => meal._userID === this.state.userid).map((order) => (
							<Card>
								<CardContent>
									<ListItem key={order._id}>
										<p>{order.mealName}</p>
										<p>{order.reqQty}</p>
										<p>{order.pickupAddress}</p>
										<p>{order.pickupDate}</p>
										<p>{order.specInstructions}</p>
										<button onClick={() => this.deleteOrder(order._id)}>Delete Me</button>
									</ListItem>
								</CardContent>
							</Card>
						))}
					</List>
				) : (
					<h3>None</h3>
				)}
			</div>
		);
	}
}

export default Customer;
