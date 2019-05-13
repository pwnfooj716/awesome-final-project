import React, { Component } from "react";
import NewFeed from "../components/NewFeed";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fetchUsersIfNeeded } from "../actions";

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

class UserContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUsersIfNeeded());
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className={classes.layput}>
        <Grid container justify="center"
          alignItems="center"
          direction="column">
            <NewFeed />
            <NewFeed />
            <NewFeed />
        </Grid>
      </Grid>
    );
  }
}

UserContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {
    currentUser,
    followingList,
    feeds,
    isLoadingProfile,
    isLoadingFeeds,
    isLoadingFollowing
  } = state;

  return {
    currentUser,
    followingList,
    feeds,
    isLoadingProfile,
    isLoadingFeeds,
    isLoadingFollowing
  };
}

export default withStyles(styles)(connect(mapStateToProps)(UserContainer));
