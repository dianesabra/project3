import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const styles = theme => ({
  card: {
    maxWidth: "30%",
    minWidth: "30%",
    marginTop: 10,
    marginBottom: 10
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "#5692E8"
  }
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  componentDidMount() {
    console.log(this.props);
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              ${this.props.price}
            </Avatar>
          }
          title={this.props.mealName}
          subheader={this.props.cookName}
        />

        <CardMedia
          className={classes.media}
          image={this.props.image}
          title={this.props.mealName}
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            color="primary"
            className={classes.button}
            aria-label="Add to shopping cart"
            onClick={() => this.props.onClickOpenOrder()}
          >
            <AddShoppingCartIcon />
          </IconButton>
          <Typography
            component="p"
            style={{
              marginLeft: "60px",
              justifyContent: "space-between",
              color: "green"
            }}
          >
            Quantity Remaining: {this.props.qtyOutstanding}
          </Typography>
        </CardActions>
        <CardContent>
          <Typography component="p">{this.props.mealDesc}</Typography>
        </CardContent>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
