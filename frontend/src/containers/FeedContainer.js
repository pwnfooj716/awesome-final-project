import React, { Component } from "react";
import HomeUserInfo from "../components/HomeUserInfo";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Empty from "../resources/emptyFeeds.svg";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Feed from "../components/Feed";
import {
  refreshUserId,
  fetchUserProfileIfNeeded,
  fetchFeedsIfNeeded,
  fetchFollowingListIfNeeded,
  fetchFollowerListIfNeeded
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
  },
  actions: {
    display: "flex"
  }
});

class FeedContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(refreshUserId());
    dispatch(fetchFollowingListIfNeeded());
    dispatch(fetchUserProfileIfNeeded());
    dispatch(fetchFeedsIfNeeded());
    dispatch(fetchFollowerListIfNeeded());
  }

  render() {
    const { classes } = this.props;
    const { feeds, currentUser, followingList, followerList } = this.props;
    let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
          {!currentUser.isLoading &&
            !followingList.isLoading &&
            !feeds.isLoading &&
            feeds.items.length > 0 &&
            feeds.items.map(feed => {
              let author = followingList.items.find(
                following => (following.userData.userId === feed.authorUserId)
              );
              if(!author){
                return "";
              }
              return (
                  <Feed key={feed.postId}
                    post={feed}
                    author={author.userData}
                    userId={currentUser.userId}
                    dateOptions={dateOptions}
                  />
              );
            })}
          {(currentUser.isLoading ||
            feeds.isLoading ||
            followingList.isLoading) && <CircularProgress color="secondary" />}
          {!currentUser.isLoading &&
            currentUser.items &&
            feeds.items.length === 0 && (
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
          {!currentUser.isLoading &&
            currentUser.items &&
            !followingList.isLoading && !followerList.isLoading && (
              <HomeUserInfo folCount={followingList.items.length} fowCount={followerList.items.length}/>
            )}
        </Grid>
      </Grid>
    );
  }
}

FeedContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  feeds: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { currentUser, feeds, followingList, followerList } = state;

  return {
    currentUser,
    feeds,
    followingList,
    followerList
  };
}

export default withStyles(styles)(connect(mapStateToProps)(FeedContainer));
