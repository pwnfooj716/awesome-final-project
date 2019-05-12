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
class SignUp extends Component {
    constructor(props) {
        super(props);
    this.state ={
        email:'',
        password:'',
        name:''
    }}

    signUp = (newUser) => {
      
        firebaseConfig.auth().createUserWithEmailAndPassword(
            newUser.email, 
            newUser.password).then(resp => {
            //    console.log(resp);
                firebaseConfig.firestore().collection('users').doc(resp.user.uid).set({
                  Email: newUser.email,
                  Name: newUser.name
                });
                }).then((response => {
                    
                    console.log("creation success");
                    this.props.history.push("/signin");
                   
                    
                })).catch((err) => {
                    console.log(err);
                });
        
    }

    handleChange = (e) =>{
        this.setState({
        [e.target.id]: e.target.value
    })}
    handleSubmit = (e) =>{
        e.preventDefault();
        this.signUp(this.state);
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
                Register
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
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input id="name" name="name" autoComplete="name" onChange={this.handleChange} autoFocus />
                </FormControl>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Register
                </Button>
              </form>
            </Paper>
          </main>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired
};
  

export default withStyles(styles)(SignUp);