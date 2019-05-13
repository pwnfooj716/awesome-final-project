import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Visibility from "@material-ui/icons/VisibilityOutlined";
import People from "@material-ui/icons/PeopleOutlineOutlined";
import AddPost from "./AddPost";
import { connect } from "react-redux";
import Empty from "../resources/empty.jpg";

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
  actions: {
    display: "flex"
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

class HomeUserInfo extends Component {
  state = {
    expanded: false
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    const { currentUser } = this.props;
    const imgSrc = currentUser.picture ? currentUser.picture : Empty
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Card className={classes.userCard}>
          <CardHeader
            avatar={
              <Avatar src={imgSrc} className={classes.avatar} />
            }
            title={currentUser.name}
          />
        </Card>
        <br />
        <Card className={classes.infoCard}>
          <CardActions className={classes.actions} disableActionSpacing>
            <AddPost />
          </CardActions>
        </Card>
        <br />
        <Card className={classes.infoCard}>
          <CardContent>
            <List>
              <ListItem>
                <Avatar>
                  <People />
                </Avatar>
                <ListItemText primary="Followers" secondary={currentUser.followerNum} />
              </ListItem>
              <ListItem>
                <Avatar>
                  <Visibility />
                </Avatar>
                <ListItemText primary="Following" secondary={currentUser.followingNum} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

HomeUserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { currentUser } = state;
  return { currentUser };
}

export default withStyles(styles)(connect(mapStateToProps)(HomeUserInfo));