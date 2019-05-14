import React, { Component } from "react";
import "../styles/profile.css";
import { connect } from "react-redux";
import {
  refreshUserId,
  fetchUserProfileIfNeeded,
  fetchUserPostsIfNeeded,
  fetchFollowingListIfNeeded,
  fetchFollowerListIfNeeded
} from "../actions";
import PropTypes from "prop-types";
import Empty from "../resources/empty.jpg";
import EmptyFeeds from "../resources/emptyFeeds.svg";
import { Redirect } from "react-router";
import ApiService from "../ApiService";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ChangeAvator from "../components/ChangeAvator";
import {
  List,
  Avatar,
  ListItemText,
  ListItem,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  withStyles,
  CircularProgress
} from "@material-ui/core";

const styles = theme => ({
  listRoot: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  gridRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 150,
    height: 150
  }
});

class ProfileContainer extends Component {
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.updataName(this.state.username, this.state.userId);
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(refreshUserId());
    dispatch(fetchUserProfileIfNeeded());
    dispatch(fetchUserPostsIfNeeded());
    dispatch(fetchFollowingListIfNeeded());
    dispatch(fetchFollowerListIfNeeded());
  };

  render() {
    const { classes } = this.props;
    const { userPost, currentUser, followingList, followerList } = this.props;
    let reader = new FileReader();
    
    const listFollowing = !followingList.isLoading &&
      followingList.items &&
      followingList.items.length > 0 && (
        <List className={classes.listRoot}>
          {followingList.items.map(following => {
            return (
            <ListItem>
              <Avatar
                alt={following.userData.name}
                src={following.userData.picture}
                className={classes.avatar}
              />
              <ListItemText
                primary={following.userData.name}
                secondary={following.userData.email}
              />
            </ListItem>
          )})}
        </List>
      );

    const listFollowers = !followerList.isLoading &&
      followerList.items &&
      followerList.items.length > 0 && (
        <List className={classes.listRoot}>
          {followerList.items.map(follower => {
            return (
            <ListItem>
              <Avatar
                alt={follower.userData.name}
                src={follower.userData.picture}
                className={classes.avatar}
              />
              <ListItemText
                primary={follower.userData.name}
                secondary={follower.userData.email}
              />
            </ListItem>
          )})}
        </List>
      );

    const listPosts = !userPost.isLoading && userPost.items.length > 0 && (
      <GridList cellHeight={200} className={classes.gridRoot} cols={2}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Posts</ListSubheader>
        </GridListTile>
        {userPost.items.map(post => {
          return (
          <GridListTile key={post.postId}>
            <img src={post.postImage} alt={post.post} />
            <GridListTileBar
              title={post.postTextContent}
              //subtitle={post.createTime}
            />
          </GridListTile>
        )})}
      </GridList>
    );

    return (
      <div style={{ padding: "0 50px", marginTop: 64 }}>
        {!userPost.isLoading && userPost.items.length === 0 && (
          <Avatar className={classes.avatar} alt="Empty" src={EmptyFeeds} />
        )}
        {userPost.isLoading && <CircularProgress color="secondary" />}
        {listPosts}
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  userPost: PropTypes.object,
  followingList: PropTypes.object,
  followerList: PropTypes.object
};

function mapStateToProps(state) {
  const { currentUser, userPost, followingList, followerList } = state;

  return {
    currentUser,
    userPost,
    followingList,
    followerList
  };
}

export default withStyles(styles)(connect(mapStateToProps)(ProfileContainer));
