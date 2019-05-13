import React, { Component } from "react";
import NewFeed from "../components/NewFeed";
import HomeUserInfo from "../components/HomeUserInfo";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Empty from "../resources/empty.jpg";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  fetchUserProfileIfNeeded,
  fetchFeedsIfNeeded,
  fetchFollowingListIfNeeded,
  subscribeToFeedsIfNeeded
} from "../actions";

const styles = theme => ({
  layout: {
    margin: "80px 0px",
    padding: 24,
    minHeight: "100vh"
  },
  userInfo: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block"
    }
  },
  avatar: {
    margin: theme.spacing.unit,
    width: 150,
    height: 150
  }
});

class NewsFeedContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUserProfileIfNeeded());
    dispatch(fetchFeedsIfNeeded());
    dispatch(fetchFollowingListIfNeeded());
    dispatch(subscribeToFeedsIfNeeded());
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentUser !== prevProps.currentUser ||
      this.props.feeds.length !== prevProps.feeds.length ||
      this.props.isLoadingProfile !== prevProps.isLoadingProfile
    ) {
      const { dispatch } = this.props;
      dispatch(fetchFeedsIfNeeded());
      dispatch(subscribeToFeedsIfNeeded());
    }
  }

  render() {
    const { classes } = this.props;
    const { feeds, isLoadingProfile, isLoadingFeeds } = this.props;
    return (
      <Grid container spacing={24} className={classes.layout}>
        <Grid
          container
          xs={12}
          sm={12}
          md={12}
          lg={8}
          justify="center"
          alignItems="center"
          direction="column"
          item={true}
        >
          {!isLoadingFeeds &&
            feeds.length !== 0 &&
            feeds.map(feed => {
              return <NewFeed post={feed} />;
            })}
          {isLoadingFeeds && <CircularProgress color="secondary" />}
          {(!isLoadingFeeds && feeds.length === 0) && (
            <Avatar className={classes.avatar} alt="Empty" src={Empty} />
          )}
        </Grid>
        <Grid
          item
          xs={false}
          sm={false}
          md={12}
          lg={4}
          className={classes.userInfo}
        >
          {!isLoadingProfile && <HomeUserInfo />}
        </Grid>
      </Grid>
    );
  }
}

NewsFeedContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  otherUsers: PropTypes.object,
  feeds: PropTypes.array,
  followingList: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  isLoadingProfile: PropTypes.bool.isRequired,
  isLoadingFeeds: PropTypes.bool.isRequired
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

export default withStyles(styles)(connect(mapStateToProps)(NewsFeedContainer));
