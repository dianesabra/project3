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

class Signup extends React.Component {
  state = {
    open: false,
    formData: {
      password: "",
      repeatPassword: "",
      email: ""
    },
    submitted: false
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.formData.password) {
        return false;
      }
      return true;
    });
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
    const { formData, submitted } = this.state;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Paper
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
              Signup
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

              <TextValidator
                label="Repeat password"
                onChange={this.handleChange}
                name="repeatPassword"
                type="password"
                validators={["required", "isPasswordMatch"]}
                errorMessages={[
                  "this field is required",
                  "passwords do not match"
                ]}
                value={formData.repeatPassword}
                variant="outlined"
                margin="normal"
                fullWidth
                color="primary"
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
                onClick={
                  formData.email !== "" &&
                  formData.password !== "" &&
                  formData.repeatPassword !== ""
                    ? this.handleClickOpen
                    : null
                }
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
        </MuiThemeProvider>
      </div>
    );
  }
}
export default withStyles(styles)(Signup);
