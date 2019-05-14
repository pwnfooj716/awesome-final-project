import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Visibility from "@material-ui/icons/VisibilityOutlined";
import People from "@material-ui/icons/PeopleOutlineOutlined";
import { connect } from "react-redux";
import Empty from "../resources/empty.jpg";
import indigo from '@material-ui/core/colors/indigo';
import green from '@material-ui/core/colors/green';

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
    color: '#fff',
    backgroundColor: green[500],
  },
  fwAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: indigo[500],
  },
  avatar: {
    margin: 10,
    width: 100,
    height: 100
  }
});

class HomeUserInfo extends Component {
  render() {
    const { classes } = this.props;
    const { currentUser } = this.props;
    let imgSrc = Empty;
    if (currentUser && currentUser.items && currentUser.items.picture) {
      imgSrc = currentUser.items.picture;
    }
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
            title={currentUser.items.name}
          />
        </Card>
        <Card className={classes.infoCard}>
          <CardContent>
            <List>
              <ListItem>
                <Avatar className={classes.foAvatar}>
                  <People />
                </Avatar >
                <ListItemText primary="Followers" secondary={this.props.fowCount} />
              </ListItem>
              <ListItem>
                <Avatar className={classes.fwAvatar}>
                  <Visibility />
                </Avatar>
                <ListItemText primary="Following" secondary={this.props.folCount} />
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