import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = (theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto'
	},
	table: {
		minWidth: 700
	},
	tablecell: {
		fontSize: '20pt'
	},
	responsecell: {
		fontSize: '14pt'
	}
});

function SpanningTable(props) {
	const { classes } = props;
	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell className={classes.tablecell}>Meal</TableCell>

						<TableCell className={classes.tablecell} align="left">
							Address
						</TableCell>
						<TableCell className={classes.tablecell} align="left">
							Pickup Date
						</TableCell>
						<TableCell className={classes.tablecell} align="right">
							Qty
						</TableCell>
						<TableCell className={classes.tablecell} align="right">
							Price
						</TableCell>
						<TableCell className={classes.tablecell} align="right">
							Delete Meal
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.orders.map((row) => (
						<TableRow key={row.id}>
							<TableCell className={classes.responsecell}>{row.mealName}</TableCell>
							<TableCell className={classes.responsecell} align="left">
								{row.pickupAddress}
							</TableCell>
							<TableCell className={classes.responsecell} align="left">
								{row.pickupDate}
							</TableCell>
							<TableCell className={classes.responsecell} align="right">
								{row.reqQty}
							</TableCell>
							<TableCell className={classes.responsecell} align="right">
								{row.price}
							</TableCell>
							<TableCell className={classes.responsecell} align="right">
								<DeleteIcon>Delete</DeleteIcon>
							</TableCell>
						</TableRow>
					))}

					<TableRow>
						<TableCell className={classes.responsecell} colSpan={2}>
							Total
						</TableCell>
						<TableCell align="right" />
					</TableRow>
				</TableBody>
			</Table>
		</Paper>
	);
}

SpanningTable.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SpanningTable);
