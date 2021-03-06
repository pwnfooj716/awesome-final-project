import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import firebaseConfig from "../../config/firebaseConfig";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import apiService from "../../ApiService";
import Cookies from "universal-cookie";
import { Redirect } from 'react-router';

const cookies = new Cookies();

const styles = theme => ({
  main: {
    marginTop: theme.spacing.unit * 10,
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.error.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    color: "white",
    backgroundColor: "#283e4a",
    height: "45px",
    outline: "none !important",
    "&:hover": {
      color: "white",
      backgroundColor: "#283e4a",
      textDecoration: "none"
    },
    "&:active": {
      color: "white",
      backgroundColor: "#283e4a",
      textDecoration: "none"
    },
    "&:focus": {
      color: "white",
      backgroundColor: "#283e4a",
      textDecoration: "none"
    }
  }
});
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }

  signUp = newUser => {
    firebaseConfig
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        let d = new Date();
        let minutes = 100;
        d.setTime(d.getTime() + minutes * 60 * 1000);
        let name = this.state.name;

        firebaseConfig
          .auth()
          .currentUser.getIdToken(false)
          .then(function(idToken) {
            cookies.set("token", idToken, { path: "/", expires: d });
            apiService
              .login(idToken, name)
              .then(response => {
                this.props.history.push("/network");
                cookies.set("userId", response.userId, {
                  path: "/",
                  expires: d
                });
                cookies.set("email", response.email, { path: "/", expires: d });
                cookies.set("name", response.name, { path: "/", expires: d });
                console.log("creation success");
              })
              .catch(err => {
                console.log(err.message);
              });
          });
      })
      .then(response => {
        this.props.history.push("/signin");
      })
      .catch(err => {
        alert(err.message);
      });
  };

  handleChange = e => {
    console.log(e.target.id, e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.signUp(this.state);
  };

  render() {
    if(cookies.get("AuthCookie") && cookies.get("userId")){
      return(<Redirect to="/home" />);
    }
    const { classes } = this.props;
    return (
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
              <Input
                id="email"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.handleChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                value={this.state.password}
                autoComplete="current-password"
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                value={this.state.name}
                onChange={this.handleChange}
                autoFocus
              />
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
          <br />
          <Typography component="p">
            Already a user?{" "}
            <Link component={RouterLink} to="/signin">
              Sign In
            </Link>
          </Typography>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
