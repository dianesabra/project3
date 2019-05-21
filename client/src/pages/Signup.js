import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import API from "../utils/API";
import { RemoveRedEye } from "@material-ui/icons";
import { InputAdornment } from "@material-ui/core";
import PropTypes from "prop-types";
import Background from "../images/food.jpg";
import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    }
  }
});

const styles = {
  paper: {
    padding: "2%",
    width: "50%"
  }
};

const hoveredStyle = {
  cursor: "pointer"
};

class Signup extends React.Component {
  state = {
    open: false,
    formData: {
      password: "",
      repeatPassword: "",
      email: ""
    },
    submitted: false,
    passwordIsMasked: true,
    repeatPasswordIsMasked: true
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.formData.password) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("isEmail", value => {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(value);
    });
  }
  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked
    }));
  };
  toggleRepeatPasswordMask = () => {
    this.setState(prevState => ({
      repeatPasswordIsMasked: !prevState.repeatPasswordIsMasked
    }));
  };

  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
  };

  handleClickOpen = () => {
    debugger;
    API.saveUser(this.state.formData)
      .then(() => {
        this.setState({ open: true });
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      formData,
      submitted,
      passwordIsMasked,
      repeatPasswordIsMasked
    } = this.state;

    return (
      <div
        style={{
          backgroundImage: `url(${Background})`,
          height: "100%",
          width: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <MuiThemeProvider theme={theme}>
          <Grid container justify="center">
            <Paper
              style={{
                width: "75%",
                marginTop: "5%"
              }}
            >
              <Typography
                style={{
                  textAlign: "center",
                  fontFamily: "'Great Vibes', cursive",
                  marginTop: "10px"
                }}
                variant="h2"
              >
                Welcome to Fresh Off The Table!
              </Typography>

              <Typography
                style={{
                  textAlign: "center"
                }}
              >
                <br />
                Don't have time to cook? Want to try something new? Have
                leftovers? Want to share your favorite dishes with those around
                you? Try Fresh Off The Table!
                <br />
                Fresh Off The Table allows you to purchase and share food with
                people around you. Login or Signup now to explore how food is
                supposed to be expereinced!
              </Typography>
            </Paper>
          </Grid>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "74vh" }}
          >
            <Paper
              style={{
                ...styles.paper
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                style={{
                  textAlign: "center"
                }}
              >
                Sign Up
              </Typography>

              <ValidatorForm onSubmit={this.handleClickOpen}>
                <TextValidator
                  label="Email Address"
                  onChange={this.handleChange}
                  name="email"
                  validators={["required", "isEmail"]}
                  errorMessages={["This field is required.", "Invalid email."]}
                  value={formData.email}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  autoFocus
                  color="primary"
                />

                <TextValidator
                  label="Password"
                  onChange={this.handleChange}
                  name="password"
                  type={passwordIsMasked ? "password" : "text"}
                  validators={["required"]}
                  errorMessages={["This field is required."]}
                  value={formData.password}
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <RemoveRedEye
                          style={hoveredStyle}
                          onClick={this.togglePasswordMask}
                        />
                      </InputAdornment>
                    )
                  }}
                />

                <TextValidator
                  label="Repeat password"
                  onChange={this.handleChange}
                  name="repeatPassword"
                  type={repeatPasswordIsMasked ? "password" : "text"}
                  validators={["required", "isPasswordMatch"]}
                  errorMessages={[
                    "This field is required.",
                    "Passwords do not match."
                  ]}
                  value={formData.repeatPassword}
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <RemoveRedEye
                          style={hoveredStyle}
                          onClick={this.toggleRepeatPasswordMask}
                        />
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  label="submit"
                  name="submit"
                  type="submit"
                  variant="contained"
                  margin="normal"
                  fullWidth
                  color="primary"
                  disabled={submitted}
                >
                  Create Account
                </Button>

                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Congratulations!"}
                  </DialogTitle>

                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Your account has been created.
                    </DialogContentText>
                  </DialogContent>

                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      <Link to={"/login"}>Return to Login</Link>
                    </Button>
                  </DialogActions>
                </Dialog>
              </ValidatorForm>
            </Paper>
          </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
};

export default withStyles(styles)(Signup);
