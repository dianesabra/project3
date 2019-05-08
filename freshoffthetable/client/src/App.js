import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Main from './pages/Main';
import Login from './pages/Login';
import Customer from './pages/Customer';
import Cook from './pages/Cook';
import NoMatch from './pages/NoMatch';
import LeftPanel from './component/leftpanel';
import MiniDrawer from './component/HomePage';

import './App.css';
const styles = (theme) => ({
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3
	}
});

class App extends Component {
	render() {
		const { classes, theme } = this.props;
		return (
			<Router>
				<Fragment>
					<LeftPanel />
					<MiniDrawer />
					<main className={classes.content}>
						{/* <div className={classes.toolbar} /> */}
						<Switch>
							<Route exact path="/" component={Login} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/main" component={Main} />
							<Route exact path="/requests" component={Customer} />
							<Route exact path="/cook" component={Cook} />
							<Route component={NoMatch} />
						</Switch>
					</main>
				</Fragment>
			</Router>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
