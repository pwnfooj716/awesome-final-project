import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import Add from "@material-ui/icons/PersonAddRounded";
import Empty from "../resources/empty.jpg";

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

  handleFollow () {
    this.props.handleFollow(this.props.user.userId)
  };

  render() {
    const { classes } = this.props;
    const imgSrc = this.props.user.picture ? this.props.user.picture : Empty;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar src={imgSrc} className={classes.avatar} />}
          title={this.props.user.name}
          subheader={this.props.user.email}
          action={
            <IconButton aria-label="Follow" onClick={this.handleFollow.bind(this)}> 
              <Add />
            </IconButton>
          }
        />
      </Card>
    );
  }
}

SuggestionInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SuggestionInfo);
