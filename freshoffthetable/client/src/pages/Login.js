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
import { blue} from "@material-ui/core/colors";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
    formData: {
      password: " ",
      email: " "
    },
    submitted: false
  };

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState ({ submitted: false }), 5000);
    });
  }




  render() {
    const { formData, submitted } = this.state;
  return (
    <div>
      <MuiThemeProvider theme = {theme}>
        <Paper
          style = {{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Typography
            component = "h1"
            variant = "h5"
            style = {{
              textAlign: "center"
            }}
          >
            Login
          </Typography>

         
          <ValidatorForm
            onSubmit = {this.handleSubmit}
          >

          
            <TextValidator
              label = "Email Address"
              onChange = {this.handleChange}
              name = "email"
              validators = {["required"]}
              errorMessages = {["this field is required"]}
              value = {formData.email}
              variant = "outlined"
              fullWidth
              margin = "normal"
              autoFocus
              color = "primary"
            />

            <TextValidator
              label = "Password"
              onChange = {this.handleChange}
              name = "password"
              type = "password"
              validators = {["required"]}
              errorMessages = {["this field is required"]}
              value = {formData.password}
              variant = "outlined"
              fullWidth
              margin = "normal"
              color = "primary"
            />

            <FormControlLabel
              control = {<Checkbox value = "remember" color = "primary" />}
              label = "Remember me"
            />

            <Button 
            label = "submit" 
            name = "submit"
            type = "submit"
            variant = "contained" 
            margin = "normal"
            fullWidth 
            color = "primary"
            disabled = {submitted}

            // NEED TO IMPLEMENT:
            // 1) capture email and password
            // 2) compare email and password to those in dB
            // 3) if match route to Main Page

            onClick = 
            {
              (formData.email !== "" && formData.password !== "") ? <Link href = "/signup" variant = "body2"></Link> : null
            }
            >
              Login
            </Button>
         
          </ValidatorForm>

          <Grid container>
            <Grid item>
              <Link href = "/signup" variant = "body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </MuiThemeProvider>
    </div>
  );
};
}

export default withStyles(styles)(Login);
