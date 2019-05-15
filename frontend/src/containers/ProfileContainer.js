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
import { Redirect } from "react-router";
import ApiService from "../ApiService";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import ChangeAvator from "../components/ChangeAvator";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import {
  List,
  Avatar,
  ListItemText,
  ListItem,
  GridList,
  GridListTile,
  GridListTileBar,
  withStyles
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
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 0,
    width: 300,
    height: 300
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
    outline: "none !important"
  }
});

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postPic: this.props.postPic,
      avatar: this.props.avatar,
      userId: this.props.userId,
      username: this.props.username,
      user_avatar: this.props.user_avatar
    };
  }
  setAvatar(avatar) {
    if (this.state.user_avatar === undefined) {
      this.setState({
        user_avatar: avatar
      });
      console.log("change to: " + this.state.user_avatar);
    }
  }
  setPic(pic) {
    this.setState({
      postPic: pic
    });
  }
  setUser(user) {
    if (this.state.username === undefined) {
      this.setState({
        username: user
      });
      console.log("change to: " + this.state.username);
    }
  }
  setUser2(user) {
    this.setState({
      username: user
    });
    console.log("change to: " + this.state.username);
  }

  setUserId(id) {
    if (this.state.userId === undefined) {
      this.setState({
        userId: id
      });
    }
  }

  handleRefresh() {
    console.log("upload success!");
    window.location.reload();
  }

  updataName(text, userid) {
    ApiService.updateUser(text, userid).catch(err => {
      console.log(err.message);
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.updataName(this.state.username, this.state.userId);
    alert("update success!");
  };

  componentWillMount() {}
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(refreshUserId());
    dispatch(fetchUserProfileIfNeeded());
    dispatch(fetchUserPostsIfNeeded());
    dispatch(fetchFollowingListIfNeeded());
    dispatch(fetchFollowerListIfNeeded());
  }

  render() {
    const { classes } = this.props;
    const { userPost, currentUser, followingList, followerList } = this.props;
    try {
      const FollowerNumb = followerList.items.length;
      const FollowingNumb = followingList.items.length;

      const postNumb = userPost.items.length;

      this.setUser(currentUser.items.name);
      this.setUserId(currentUser.items.userId);
      this.setAvatar(currentUser.items.picture);

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
              );
            })}
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
              );
            })}
          </List>
        );

      const listPosts = !userPost.isLoading && userPost.items.length > 0 && (
        <GridList cellHeight={200} className={classes.gridRoot} cols={3}>
          {userPost.items.map(post => {
            return (
              <GridListTile key={post.postId}>
                <img src={post.postImage} alt={post.post} />
                <GridListTileBar
                  title={post.postTextContent}
                  actionIcon={
                    <IconButton
                      onClick={() => this.setPic(post.postImage)}
                      data-toggle="modal"
                      data-target="#postModal"
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            );
          })}
        </GridList>
      );

      return (
        <div style={{ padding: "0 50px", marginTop: 64 }}>
          <div style={{ margin: "0 auto", width: "100%" }}>
            <div
              className="modal fade"
              id="followerModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Follower:
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">{listFollowers}</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="followingModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Following:
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">{listFollowing}</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="postModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modalsize" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Post:
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <img
                      className="postPic"
                      src={this.state.postPic}
                      alt="Posted Pic"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="EditModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog EditModal cascading-modal modal-avatar modal-sm"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <img
                      src={this.state.user_avatar}
                      alt="avatar"
                      className="avatar rounded-circle img-responsive pointer"
                      data-toggle="modal"
                      data-target="#AvatarModal"
                    />
                  </div>
                  <div className="modal-body text-center mb-1">
                    <h4 className="mt-1 mb-2">Update Name</h4>

                    <form onSubmit={this.handleSubmit}>
                      <FormControl margin="normal" required>
                        <Input
                          id="username"
                          name="username"
                          autoComplete="username"
                          value={this.state.username}
                          onChange={this.handleChange}
                          autoFocus
                        />
                      </FormControl>
                      <div className="text-center mt-4">
                        <button
                          type="button"
                          className="btn btn-secondary EditModalInput"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className="btn btn-primary submit EditModalInput"
                        >
                          submit
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="AvatarModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Change Avator:
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div className="modal-body">
                    <ChangeAvator handleRefresh={this.handleRefresh} />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <header>
              <img
                className="userPic rounded-circle pointer"
                src={this.state.user_avatar}
                alt={"img of " + currentUser.items.name}
                data-toggle="modal"
                data-target="#AvatarModal"
              />
              <div className="userInfo">
                <h1 className="name">{this.state.username}</h1>
                <button
                  className="editBtn"
                  type="button"
                  data-toggle="modal"
                  data-target="#EditModal"
                >
                  Edit Profile
                </button>
                <h2 className="email">{currentUser.items.email}</h2>
                <div className="follow">
                  {" "}
                  <b>{postNumb} </b> <strong>Posts</strong>{" "}
                </div>
                <div
                  className="follow pointer"
                  data-toggle="modal"
                  data-target="#followerModal"
                >
                  {" "}
                  <b>{FollowerNumb} </b> <strong>Followers</strong>
                </div>
                <div
                  className="follow pointer"
                  data-toggle="modal"
                  data-target="#followingModal"
                >
                  {" "}
                  <b>{FollowingNumb} </b> <strong>Following</strong>
                </div>
              </div>
            </header>
          </div>
          <div className="postbox">
            <div>{listPosts}</div>
          </div>
        </div>
      );
    } catch {
      return <Redirect to="/" />;
    }
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
