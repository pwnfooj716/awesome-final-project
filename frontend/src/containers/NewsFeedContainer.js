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
    //dispatch(subscribeToFeedsIfNeeded());
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.feeds.isLoadingProfile !== prevProps.feeds.isLoadingProfile ||
      this.props.feeds.items !== prevProps.feeds.items
    ) {
      const { dispatch } = this.props;
      //dispatch(fetchFeedsIfNeeded());
      //dispatch(subscribeToFeedsIfNeeded());
    }
  }

  render() {
    const { classes } = this.props;
    const { feeds, currentUser } = this.props;
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
            feeds.items.length !== 0 &&
            feeds.items.map(feed => {
              return <NewFeed post={feed} />;
            })}
          {currentUser.isLoading && <CircularProgress color="secondary" />}
          {!currentUser.isLoading && feeds.items.length === 0 && (
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
          {!currentUser.isLoading && <HomeUserInfo />}
        </Grid>
      </Grid>
    );
  }
}

NewsFeedContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  feeds: PropTypes.object,
  followingList: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { currentUser, followingList, feeds } = state;

  return {
    currentUser,
    followingList,
    feeds
  };
}

export default withStyles(styles)(connect(mapStateToProps)(NewsFeedContainer));
