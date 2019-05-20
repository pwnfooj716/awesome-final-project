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
  ListItemAvatar,
  Divider,
  Typography
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Visibility from "@material-ui/icons/GradeRounded";
import People from "@material-ui/icons/PeopleOutlineOutlined";
import { connect } from "react-redux";
import Empty from "../resources/empty.jpg";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  root: {
    position: "fixed",
    top: "90px",
    width: "270px"
  },
  listRoot: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
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
    margin: 0,
    width: 50,
    height: 50
  },
  profileAvatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  listHeader: {
    backgroundColor: "#f7f7f7",
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0
  },
  listFooter: {
    backgroundColor: "#f7f7f7",
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
    outline: "none !important"
  },
  modal: {
    minHeight: "40vh",
    maxHeight: "80vh",
    minWidth: "40%",
    maxWidth: "40%"
  },
  border: {
    backgroundColor: "#283e4a"
  },
  content: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    }
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
        classes={{ paper: classes.modal }}
        onClose={this.handleClose}
        aria-labelledby="Follower List"
        open={this.state.openFollower}
        onBackdropClick={this.handleClose}
        onEscapeKeyDown={this.handleClose}
      >
        <DialogTitle id={"FollowerModal"} className={classes.listHeader}>
          <Typography variant="h6">Follower List</Typography>
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{listFollowers}</DialogContent>
        <DialogTitle
          id={"FollowerModalFooter"}
          className={classes.listFooter}
        />
      </Dialog>
    );
    const followingModal = (
      <Dialog
        classes={{ paper: classes.modal }}
        onClose={this.handleClose}
        aria-labelledby="Following List"
        open={this.state.openFollowing}
        onBackdropClick={this.handleClose}
        onEscapeKeyDown={this.handleClose}
      >
        <DialogTitle id={"FollowingModal"} className={classes.listHeader}>
          <Typography variant="h6">Following List</Typography>
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{listFollowing}</DialogContent>
        <DialogTitle
          id={"FollowingModalFooter"}
          className={classes.listFooter}
        />
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
              avatar={<Avatar src={imgSrc} className={classes.profileAvatar} />}
              title={currentUser.items.name}
            />
          </Card>
          <Card className={classes.infoCard}>
            <CardContent className={classes.border} />
            <CardContent className={classes.content}>
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
                <Divider />
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
            <CardContent className={classes.border} />
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
