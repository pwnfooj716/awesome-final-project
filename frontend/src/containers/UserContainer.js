import React, { Component } from "react";
import NewFeed from "../components/NewFeed";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  layput: {
    margin: "80px 0px",
    padding: 24,
    minHeight: "100vh"
  },
  userInfo: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block"
    }
  }
});

class UserContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className={classes.layput}>
        <Grid container direction="column">
            <NewFeed />
            <NewFeed />
            <NewFeed />
        </Grid>
      </Grid>
    );
  }
}

UserContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserContainer);
