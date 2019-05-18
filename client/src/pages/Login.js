import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import API from "../utils/API";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { RemoveRedEye } from "@material-ui/icons";
import { InputAdornment } from "@material-ui/core";
import PropTypes from "prop-types";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    }
  }
});

const styles = {
  paper: {
    width: 400,
    height: 500,
    alignItems: "center"
  }
};

const hoveredStyle = {
  cursor: "pointer"
};

class Login extends React.Component {
  state = {
    incorrectUser: {
      open: false
    },

    formData: {
      password: "",
      email: ""
    },
    submitted: false,
    passwordIsMasked: true
  };

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked
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

  handleLogin = () => {
    // Send email and password to backend to check conditionals. Back-end will give a response
    // for each conditional and send that response to the Front-end. Now check to see which
    // conditional in the Back-end was met in order to determine the correct response for the front-end
    API.getUser(this.state.formData).then(res => {
      let error = res.data.error;
      let redirect = true;
      if (error === "User does not exist.") {
        this.setState({ open: true });
        console.log("User does not exist");
        redirect = false;
      }
      if (error === "Incorrect password.") {
        this.setState({ open: true });
        console.log("Incorrect password");
        redirect = false;
      }

      if (redirect) {
        localStorage.setItem("userid", res.data._id);
        document.location.pathname = "/main";
      }

      // need a conditional to check if user is not in error
      console.log(res.data);
    });
  };

  render() {
    const { formData, submitted, passwordIsMasked } = this.state;
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Paper>
            <Typography>
              Welcome to Fresh Off The Table! Fresh Off The Table is an
              application that allows you and others to post and purchase
            </Typography>
          </Paper>
          <Paper
            let
            className="paper"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              padding: "5%"
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{
                textAlign: "center"
              }}
            >
              Login
            </Typography>
            <ValidatorForm onSubmit={this.handleLogin}>
              <TextValidator
                label="Email Address"
                onChange={this.handleChange}
                name="email"
                validators={["required"]}
                errorMessages={["Email required"]}
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
                errorMessages={["Password required"]}
                value={formData.password}
                variant="outlined"
                margin="normal"
                color="primary"
                style={{ width: 700 }}
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

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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
                Login
              </Button>
            </ValidatorForm>

            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Incorrect email or password"}
              </DialogTitle>

              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  The email you entered does not exist or the password you
                  entered for the user is incorrect.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
};

export default withStyles(styles)(Login);
