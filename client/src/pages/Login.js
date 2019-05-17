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
import { blue, red } from "@material-ui/core/colors";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import API from "../utils/API";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

class Login extends React.Component {
  state = {
    incorrectUser: {
      open: false
    },

    formData: {
      password: "",
      email: ""
    },
    submitted: false
  };
  componentDidMount() {
    // document.body.style.background = "linear-gradient(red, yellow)";
  }
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
        document.location.pathname = "/main";
      }

      // need a conditional to check if user is not in error
      console.log(res.data);
    });
  };

  render() {
    const { formData, submitted } = this.state;
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Paper
            let
            className="paper"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
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
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator
                label="Email Address"
                onChange={this.handleChange}
                name="email"
                validators={["required"]}
                errorMessages={["this field is required"]}
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
                type="password"
                validators={["required"]}
                errorMessages={["this field is required"]}
                value={formData.password}
                variant="outlined"
                fullWidth
                margin="normal"
                color="primary"
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
                // NEED TO IMPLEMENT:
                // 1) capture email and password
                // 2) compare email and password to those in dB
                // 3) if match route to Main Page

                onClick={() =>
                  formData.email !== "" && formData.password !== ""
                    ? this.handleLogin()
                    : null
                }
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

export default withStyles(styles)(Login);
