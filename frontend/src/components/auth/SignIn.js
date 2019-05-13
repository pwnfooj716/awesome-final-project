import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import firebaseConfig from "../../config/firebaseConfig";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Cookies from "universal-cookie";
import green from "@material-ui/core/colors/green";
import { connect } from "react-redux";
import { setUserId } from "../../actions";
import auth from "../../protected/auth";

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
    backgroundColor: green[500]
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

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  login = newUser => {
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        this.handleLogin(resp.user)
        const user = { user: resp.user.email, id: resp.user.uid };
        let d = new Date();
        let minutes = 100;
        d.setTime(d.getTime() + minutes * 60 * 1000);
        cookies.set("AuthCookie", user, { path: "/", expires: d });
        auth.login();
        console.log("login success");
        this.props.history.push("/network");
      })
      .catch(err => {
        alert(err.message);
      });
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.login(this.state);
  };
  handleLogin = e => {
    const { dispatch } = this.props;
    dispatch(setUserId(e.uid));
  };
  render() {
    const { classes } = this.props;
    return (
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
              <Input
                id="email"
                name="email"
                autoComplete="email"
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
                autoComplete="current-password"
                onChange={this.handleChange}
              />
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
          <br />
          <Typography component="p">
            New user?{" "}
            <Link component={RouterLink} to="/">
              Register
            </Link>
          </Typography>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {};
}

export default withStyles(styles)(connect(mapStateToProps)(SignIn));
