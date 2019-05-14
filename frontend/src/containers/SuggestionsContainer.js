import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  refreshUserId,
  fetchOtherUsersIfNeeded,
  fetchFollowingListIfNeeded,
  fetchFollowerListIfNeeded
} from "../actions";
import Empty from "../resources/empty.jpg";
import Avatar from "@material-ui/core/Avatar";
import Add from "@material-ui/icons/PersonAddRounded";
import Remove from "@material-ui/icons/PersonAddDisabledRounded";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import api from "../ApiService";
import Cookies from "universal-cookie";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EmptyFeeds from "../resources/emptyFeeds.svg";
const cookies = new Cookies();

function TabContainer(props) {
  return (
    <Typography align="center" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "80px 0px",
    padding: 24,
    minHeight: "100vh"
  },
  gridList: {
    width: "100%"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  avatar: {
    margin: theme.spacing.unit,
    width: 150,
    height: 150
  }
});

class SuggestionsContainer extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(refreshUserId());
    dispatch(fetchOtherUsersIfNeeded());
    dispatch(fetchFollowingListIfNeeded());
    dispatch(fetchFollowerListIfNeeded());
  }

  async handleFollow(targetId) {
    let uid = cookies.get("userId");
    const { dispatch } = this.props;
    await api.follow(uid, targetId);
    dispatch(fetchOtherUsersIfNeeded());
    dispatch(fetchFollowingListIfNeeded());
  }

  async handleUnFollow(targetId) {
    let uid = cookies.get("userId");
    const { dispatch } = this.props;
    await api.unFollow(uid, targetId);
    dispatch(fetchOtherUsersIfNeeded());
    dispatch(fetchFollowingListIfNeeded());
  }

  render() {
    const { classes } = this.props;
    const { otherUsers, followingList, followerList } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            className={classes.tab}
            centered
          >
            <Tab label="Suggestions" icon={<Add />} />
            <Tab label="Following" icon={<FavoriteIcon />} />
            <Tab label="Followers" icon={<PersonPinIcon />} />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            {!otherUsers.isLoading && otherUsers.items.length === 0 && (
              <Avatar className={classes.avatar} alt="Empty" src={EmptyFeeds} />
            )}
            {otherUsers.isLoading && <CircularProgress color="secondary" />}
            {!otherUsers.isLoading && otherUsers.items.length !== 0 && (
              <GridList cellHeight={200} className={classes.gridList} cols={3}>
                {otherUsers.items.map(otherUser => (
                  <GridListTile key={otherUser.userId}>
                    <img
                      src={otherUser.picture ? otherUser.picture : Empty}
                      alt={otherUser.userId}
                    />
                    <GridListTileBar
                      title={otherUser.name}
                      subtitle={otherUser.email}
                      actionIcon={
                        <IconButton
                          className={classes.icon}
                          onClick={() => this.handleFollow(otherUser.userId)}
                        >
                          <Add />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            )}
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            {!followingList.isLoading && followingList.items.length === 0 && (
              <Avatar className={classes.avatar} alt="Empty" src={EmptyFeeds} />
            )}
            {followingList.isLoading && <CircularProgress color="secondary" />}
            {!followingList.isLoading && followingList.items.length !== 0 && (
              <GridList cellHeight={200} className={classes.gridList} cols={3}>
                {followingList.items.map(following => (
                  <GridListTile key={following.userData.userId}>
                    <img
                      src={
                        following.userData.picture
                          ? following.userData.picture
                          : Empty
                      }
                      alt={following.userData.userId}
                    />
                    <GridListTileBar
                      title={following.userData.name}
                      subtitle={following.userData.email}
                      actionIcon={
                        <IconButton
                          className={classes.icon}
                          onClick={() =>
                            this.handleUnFollow(following.userData.userId)
                          }
                        >
                          <Remove />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            )}
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            {!followerList.isLoading && followerList.items.length === 0 && (
              <Avatar className={classes.avatar} alt="Empty" src={EmptyFeeds} />
            )}
            {followerList.isLoading && <CircularProgress color="secondary" />}
            {!followerList.isLoading && followerList.items.length !== 0 && (
              <GridList cellHeight={200} className={classes.gridList} cols={3}>
                {followerList.items.map(follower => (
                  <GridListTile key={follower.userData.userId}>
                    <img
                      src={
                        follower.userData.picture
                          ? follower.userData.picture
                          : Empty
                      }
                      alt={follower.userData.userId}
                    />
                    <GridListTileBar
                      title={follower.userData.name}
                      subtitle={follower.userData.email}
                    />
                  </GridListTile>
                ))}
              </GridList>
            )}
          </TabContainer>
        )}
      </div>
    );
  }
}

SuggestionsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  otherUsers: PropTypes.object,
  followingList: PropTypes.object,
  followerList: PropTypes.object
};

function mapStateToProps(state) {
  const { otherUsers, followingList, followerList } = state;

  return {
    otherUsers,
    followingList,
    followerList
  };
}

export default withStyles(styles)(
  connect(mapStateToProps)(SuggestionsContainer)
);
