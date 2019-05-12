import React, {Component} from 'react';
import firebaseConfig from '../../config/firebaseConfig';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });


class SignIn extends Component {
    constructor(props) {
        super(props);
    this.state ={
        email:'',
        password:''
    }
}

    
      
    login = (newUser) =>{
        firebaseConfig.auth().signInWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
           const user={ user:resp.user.email,
                   id:resp.user.uid};
                   let d = new Date();
                   let minutes = 100;
                   d.setTime(d.getTime() + (minutes*60*1000));
            cookies.set('AuthCookie', user, { path: '/',expires: d });              
            console.log("login success");
  //          console.log(cookies.get('AuthCookie'));
            this.props.history.push("/");
        }).catch((err) => {
            console.log(err);
        });
    }
    handleChange = (e) =>{
        this.setState({
        [e.target.id]: e.target.value
    })}
    handleSubmit = (e) =>{
        e.preventDefault();
        this.login(this.state);
        console.log(this.state); 
    }
    render(){

        const { classes } = this.props; 
        return(
            <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input id="email" name="email" autoComplete="email" onChange={this.handleChange} autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange}/>
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign in
                </Button>
              </form>
            </Paper>
          </main>
        )
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired
};
  

export default withStyles(styles)(SignIn);