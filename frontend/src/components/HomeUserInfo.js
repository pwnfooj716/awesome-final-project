import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import green from "@material-ui/core/colors/green";
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ImageIcon from "@material-ui/icons/Image";
import Visibility from "@material-ui/icons/VisibilityOutlined";
import People from "@material-ui/icons/PeopleOutlineOutlined";
import PostPic from "./PostPic";

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
    backgroundColor: green[500],
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
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
          />
        </Card>
        <br />
        <Card className={classes.infoCard}>
          <CardActions className={classes.actions} disableActionSpacing>
            <PostPic />
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
                <ListItemText primary="Followers" secondary="100" />
              </ListItem>
              <ListItem>
                <Avatar>
                  <Visibility />
                </Avatar>
                <ListItemText primary="Following" secondary="100" />
              </ListItem>
              <ListItem>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary="Posts" secondary="100" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

HomeUserInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeUserInfo);
