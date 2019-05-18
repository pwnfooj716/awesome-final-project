import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import {
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  ListItemAvatar
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Visibility from "@material-ui/icons/VisibilityOutlined";
import People from "@material-ui/icons/PeopleOutlineOutlined";
import { connect } from "react-redux";
import Empty from "../resources/empty.jpg";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  root: {
    position: "fixed",
    top: "90px",
    width: "270px"
  },
  userCard: {
    width: "100%",
    backgroundColor: "#f7f7f7",
    "box-shadow": "none"
  },
  infoCard: {
    width: "100%",
    marginLeft: "10px"
  },
  foAvatar: {
    margin: 10,
    color: "#fff",
    outline: "none !important",
    backgroundColor: green[900],
    "&:hover": {
      color: "#fff",
      backgroundColor: green[600],
      textDecoration: "none"
    },
    "&:active": {
      color: "#fff",
      backgroundColor: green[900],
      textDecoration: "none"
    },
    "&:focus": {
      color: "#fff",
      backgroundColor: green[900],
      textDecoration: "none"
    }
  },
  fwAvatar: {
    margin: 10,
    color: "#fff",
    outline: "none !important",
    backgroundColor: red[500],
    "&:hover": {
      color: "#fff",
      textDecoration: "none",
      backgroundColor: red[900]
    },
    "&:active": {
      color: "#fff",
      backgroundColor: red[500],
      textDecoration: "none"
    },
    "&:focus": {
      color: "#fff",
      backgroundColor: red[500],
      textDecoration: "none"
    }
  },
  avatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  listHeader: {
    backgroundColor: "#f7f7f7"
  }
});

class HomeUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFollower: false,
      openFollowing: false
    };
    this.handleOpenFollower = this.handleOpenFollower.bind(this);
    this.handleOpenFollowing = this.handleOpenFollowing.bind(this);
  }

  handleOpenFollower = () => {
    this.setState({
      openFollower: true,
      openFollowing: false
    });
  };

  handleOpenFollowing = () => {
    this.setState({
      openFollowing: true,
      openFollower: false
    });
  };

  handleClose = () => {
    this.setState({
      openFollowing: false,
      openFollower: false
    });
  };
  render() {
    const { classes } = this.props;
    const { currentUser, followingList, followerList } = this.props;
    let imgSrc = Empty;
    if (currentUser && currentUser.items && currentUser.items.picture) {
      imgSrc = currentUser.items.picture;
    }
    const listFollowing = !followingList.isLoading &&
      followingList.items &&
      followingList.items.length > 0 && (
        <List className={classes.listRoot}>
          {followingList.items.map(following => {
            return (
              <ListItem key={following.userData.userId}>
                <ListItemAvatar>
                  <Avatar
                    alt={following.userData.name}
                    src={following.userData.picture}
                    className={classes.avatar}
                  />
                </ListItemAvatar>
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
              <ListItem key={follower.userData.userId}>
                <ListItemAvatar>
                  <Avatar
                    alt={follower.userData.name}
                    src={follower.userData.picture}
                    className={classes.avatar}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={follower.userData.name}
                  secondary={follower.userData.email}
                />
              </ListItem>
            );
          })}
        </List>
      );
    const followerModal = (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="Follower List"
        open={this.state.openFollower}
        onBackdropClick={this.handleClose}
        onEscapeKeyDown={this.handleClose}
      >
        <DialogTitle
          id={"FollowerModal"}
          onClose={this.handleClose}
          className={classes.listHeader}
        >
          Follower List
        </DialogTitle>
        <DialogContent>{listFollowers}</DialogContent>
      </Dialog>
    );
    const followingModal = (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="Following List"
        open={this.state.openFollowing}
        onBackdropClick={this.handleClose}
        onEscapeKeyDown={this.handleClose}
      >
        <DialogTitle
          id={"FollowingModal"}
          onClose={this.handleClose}
          className={classes.listHeader}
        >
          Following List
        </DialogTitle>
        <DialogContent>{listFollowing}</DialogContent>
      </Dialog>
    );
    return (
      <div>
        {followerModal}
        {followingModal}
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Card className={classes.userCard}>
            <CardHeader
              avatar={<Avatar src={imgSrc} className={classes.avatar} />}
              title={currentUser.items.name}
            />
          </Card>
          <Card className={classes.infoCard}>
            <CardContent>
              <List>
                <ListItem>
                  <IconButton
                    className={classes.foAvatar}
                    aria-label="View Followers"
                    onClick={() => this.handleOpenFollower()}
                  >
                    <People />
                  </IconButton>
                  <ListItemText
                    primary="Followers"
                    secondary={followerList.items.length}
                  />
                </ListItem>
                <ListItem>
                  <IconButton
                    className={classes.fwAvatar}
                    aria-label="View Following"
                    onClick={() => this.handleOpenFollowing()}
                  >
                    <Visibility />
                  </IconButton>
                  <ListItemText
                    primary="Following"
                    secondary={followingList.items.length}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

HomeUserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  followingList: PropTypes.object.isRequired,
  followerList: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { currentUser, followingList, followerList } = state;
  return { currentUser, followingList, followerList };
}

export default withStyles(styles)(connect(mapStateToProps)(HomeUserInfo));
