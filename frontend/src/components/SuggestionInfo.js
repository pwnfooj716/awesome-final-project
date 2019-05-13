import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import Add from '@material-ui/icons/PersonAddRounded';
import Empty from "../resources/empty.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Visibility from "@material-ui/icons/VisibilityOutlined";
import People from "@material-ui/icons/PeopleOutlineOutlined";

const styles = theme => ({
  card: {
    maxWidth: 600,
    minWidth: 400,
    marginRight: "50px",
    marginBottom: "40px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px"
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class SuggestionInfo extends Component {
  render() {
    const { classes } = this.props;
    const imgSrc = this.props.user.picture ? this.props.user.picture : Empty
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar src={imgSrc} className={classes.avatar} />}
          title={this.props.user.name}
          subheader={this.props.user.email}
          action={
            <IconButton>
              <Add />
            </IconButton>
          }
        />
        <CardContent>
            <List>
              <ListItem>
                <Avatar>
                  <People />
                </Avatar>
                <ListItemText primary="Followers" secondary={this.props.user.followerNum} />
              </ListItem>
              <ListItem>
                <Avatar>
                  <Visibility />
                </Avatar>
                <ListItemText primary="Following" secondary={this.props.user.followingNum} />
              </ListItem>
            </List>
          </CardContent>
      </Card>
    );
  }
}

SuggestionInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SuggestionInfo);
