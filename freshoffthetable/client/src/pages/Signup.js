import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors'



const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[500]
            // light:
            // dark:
        },
        // secondary: {
        //     main: 
        //     light:
        //     dark:
        // }
    }
})


const styles = {
    paper:{
        width: 400,
        height: 500,
        alignItems: 'center'
    }
}

class Signup extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render(){

    
    return(
        <div>
           <MuiThemeProvider theme = {theme}>
            <Paper 
                
                
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    
                
                    }}>

            <Typography 
                component = "h1" 
                variant = "h5"
                style = {{
                    textAlign: 'center'
                }}>
                Signup
            </Typography>

            <form
                onSubmit={(e) => { e.preventDefault()}}>
                <TextField
                    variant = 'outlined'
                    margin = 'normal'
                    required
                    fullWidth
                    id = 'email'
                    label = 'Email Address'
                    name = 'email'
                    autoFocus
                    color = 'primary'
                />

                <TextField
                    variant = 'outlined'
                    margin = 'normal'
                    required
                    fullWidth
                    id = 'password'
                    label = 'Password'
                    name = 'password'
                    type = 'password'
                    color = 'primary'
                />
                <TextField
                    variant = 'outlined'
                    margin = 'normal'
                    required
                    fullWidth
                    id = 'password'
                    label = 'Confirm Password'
                    name = 'password'
                    type = 'password'
                    color = 'primary'
                />
                
                {/* <Button
                    type = 'submit'
                    fullWidth
                    variant = 'contained'
                    color = "primary"
                >
                   Create Account
                </Button> */}

                <Button 
                    variant = 'outlined' 
                    color = 'primary' 
                    onClick = {this.handleClickOpen} 
                    type = 'submit'
                    fullWidth
                    >
                    Create Account
                </Button>
                <Dialog
                    open = {this.state.open}
                    onClose = {this.handleClose}
                    aria-labelledby = 'alert-dialog-title'
                    aria-describedby = 'alert-dialog-description'
                >
                    <DialogTitle id = 'alert-dialog-title'>
                        {'Congratulations!'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                        id = 'alert-dialog-description'>
                            Your account has been created.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick = {this.handleClose} color = 'primary'>
                            Return to Login
                        </Button>
                    </DialogActions>

                </Dialog>

            </form>
               
            </Paper>
            </MuiThemeProvider>
            
          
        </div>
    )

}
}


export default withStyles(styles)(Signup);