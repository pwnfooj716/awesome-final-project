import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { refreshUserId, fetchOtherUsersIfNeeded, fetchFollowingListIfNeeded } from "../actions";
import Empty from "../resources/empty.jpg";
import Avatar from "@material-ui/core/Avatar";
import Add from "@material-ui/icons/PersonAddRounded";
import Remove from "@material-ui/icons/PersonAddDisabledRounded";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import api from "../ApiService";
import Cookies from "universal-cookie";
const cookies = new Cookies();

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
  gridList: {
    width: "80%",
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

class SuggestionsContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(refreshUserId());
    dispatch(fetchOtherUsersIfNeeded());
    dispatch(fetchFollowingListIfNeeded());
  }

  async handleFollow (targetId) {
    let uid = cookies.get("userId");
    const { dispatch } = this.props;
    await api.follow(uid, targetId)
    console.log(`insid follow---${uid}---${targetId}`)
    dispatch(fetchOtherUsersIfNeeded());
    dispatch(fetchFollowingListIfNeeded());
  };

  async handleUnFollow (targetId) {
    let uid = cookies.get("userId");
    const { dispatch } = this.props;
    await api.unFollow(uid, targetId);
    dispatch(fetchOtherUsersIfNeeded());
    dispatch(fetchFollowingListIfNeeded());
  };

  render() {
    const { classes } = this.props;
    const { otherUsers, followingList } = this.props;
    return (
      <Grid>
      <Grid
        container
        spacing={24}
        justify="center"
        direction="row"
        className={classes.layout}
      >
      <GridList cellHeight={300} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">Suggestions</ListSubheader>
          </GridListTile>
          {!otherUsers.isLoading && otherUsers.items.length === 0 && (
            <Avatar className={classes.avatar} alt="Empty" src={Empty} />
          )}
          {otherUsers.isLoading && <CircularProgress color="secondary" />}
          {!otherUsers.isLoading &&
            otherUsers.items.length !== 0 && otherUsers.items.map(otherUser => (
            <GridListTile key={otherUser.userId}>
              <img src={otherUser.picture ? otherUser.picture: Empty} alt={otherUser.userId} />
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
        </Grid>
        <Grid
        container
        spacing={24}
        justify="center"
        direction="row"
        className={classes.layout}
      >
      <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">Currently Following</ListSubheader>
          </GridListTile>
          {!followingList.isLoading && followingList.items.length === 0 && (
            <Avatar className={classes.avatar} alt="Empty" src={Empty} />
          )}
          {followingList.isLoading && <CircularProgress color="secondary" />}
          {!followingList.isLoading &&
            followingList.items.length !== 0 && followingList.items.map(following => (
            <GridListTile key={following.userId}>
              <img src={following.picture ? following.picture: Empty} alt={following.userId} />
              <GridListTileBar
                title={following.name}
                subtitle={following.email}
                actionIcon={
                  <IconButton
                    className={classes.icon}
                    onClick={() => this.handleUnFollow(following.userId)}
                  >
                    <Remove />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        </Grid>
        </Grid>
    );
  }
}

SuggestionsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  otherUsers: PropTypes.object,
  followingList: PropTypes.object, 
};

function mapStateToProps(state) {
  const { otherUsers, followingList } = state;

  return {
    otherUsers, followingList
  };
}

export default withStyles(styles)(
  connect(mapStateToProps)(SuggestionsContainer)
);
