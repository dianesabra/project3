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
import { RemoveRedEye } from '@material-ui/icons';
import { InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';

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
}

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
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== this.state.formData.password) {
            return false;
        }
        return true;
    });
}
togglePasswordMask = () => {
  this.setState(prevState => ({
    passwordIsMasked : !prevState.passwordIsMasked,
  }));
}
toggleRepeatPasswordMask = () => {
  this.setState(prevState => ({
    repeatPasswordIsMasked : !prevState.repeatPasswordIsMasked,
  }));
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

  render() {
    const { formData, submitted, passwordIsMasked, repeatPasswordIsMasked } = this.state;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Paper
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
              SignUp
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
                type={passwordIsMasked ? "password" : "text"}
                validators={["required"]}
                errorMessages={["this field is required"]}
                value={formData.password}
                variant="outlined"
                fullWidth
                margin="normal"
                color="primary"

                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <RemoveRedEye 
                        style={hoveredStyle}
                        onClick={this.togglePasswordMask}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <TextValidator
                label="Repeat password"
                onChange={this.handleChange}
                name="repeatPassword"
                type={repeatPasswordIsMasked ? "password" : "text"}
                validators={["required", "isPasswordMatch" ]}
                errorMessages={[
                  "this field is required",
                  "passwords do not match"
                ]}
                value={formData.repeatPassword}
                variant="outlined"
                margin="normal"
                fullWidth
                color="primary"

                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <RemoveRedEye 
                        style={hoveredStyle}
                        onClick={this.toggleRepeatPasswordMask}
                      />
                    </InputAdornment>
                  ),
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

Signup.propTypes= {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
}


export default withStyles(styles)(Signup);
