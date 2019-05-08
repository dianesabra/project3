import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { blue, amber } from "@material-ui/core/colors";

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

const Login = props => {
  const { classes } = props;

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Paper
          className={classes.paper}
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

          <form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button type="submit" fullWidth variant="contained" color="primary">
              Login
            </Button>
          </form>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </MuiThemeProvider>
    </div>
  );
};

export default withStyles(styles)(Login);
