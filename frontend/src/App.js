import React, { Component } from "react";
import NavBar from "./components/NavBar";
import FeedContainer from "./containers/FeedContainer";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
//import Profile from "./containers/userprofile";
import ProfileContainer from "./containers/ProfileContainer";
import Network from "./containers/SuggestionsContainer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import {ProtectedRoute} from './protected/protectedRoute';

const styles = theme => ({
  header: {
    width: "100%",
    backgroundColor: "#283e4a",
    height: "95px",
    position: "fixed",
    zIndex: 1,
    [theme.breakpoints.up("sm")]: {
      height: "77px"
    }
  },
  content: {
    width: "100%",
    backgroundColor: "#f7f7f7"
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <Grid container spacing={24} className={classes.header}>
          <Grid item xs={false} sm={1} md={2} />
          <Grid item xs={12} sm={10} md={8}>
            <NavBar />
          </Grid>
          <Grid item xs={false} sm={1} md={2} />
        </Grid>
        <Grid container spacing={24} className={classes.content}>
          <Grid item xs={false} sm={1} md={2} />
          <Grid item xs={12} sm={10} md={8}>
            <Switch>
              <ProtectedRoute exact path="/home" component={FeedContainer} />
              <ProtectedRoute path="/network" component={Network} />
              <ProtectedRoute path="/userprofile" component={ProfileContainer} />
              {/* <ProtectedRoute path="/userprofile" component={Profile} /> */}
              <Route path="/signin" component={SignIn} />
              <Route exact path="/" component={SignUp} />
              <Route path="*" component={()=>'404 Page Not Found'} />
            </Switch>
          </Grid>
          <Grid item xs={false} sm={1} md={2} />
        </Grid>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
