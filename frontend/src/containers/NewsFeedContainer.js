import React, { Component } from "react";
import NewFeed from "../components/NewFeed";
import HomeUserInfo from "../components/HomeUserInfo";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Cookies from 'universal-cookie';

const styles = theme => ({
  layput: {
    margin: "80px 0px",
    padding: 24,
    minHeight: "100vh"
  },
  userInfo: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block"
    }
  }
});

class NewsFeedContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className={classes.layput}>
        <Grid container xs={12} sm={12} md={12} lg={8}>
          <Grid container direction="column">
            <NewFeed />
            <NewFeed />
            <NewFeed />
          </Grid>
        </Grid>
        <Grid
          item
          xs={false}
          sm={false}
          md={12}
          lg={4}
          className={classes.userInfo}
        >
          <HomeUserInfo />
        </Grid>
      </Grid>
    );
  }
}

NewsFeedContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewsFeedContainer);
