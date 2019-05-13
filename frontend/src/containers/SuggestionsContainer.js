import React, { Component } from "react";
import SuggestionInfo from "../components/SuggestionInfo";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fetchOtherUsersIfNeeded } from "../actions";
import Empty from "../resources/empty.jpg";
import Avatar from "@material-ui/core/Avatar";

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

class SuggestionsContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchOtherUsersIfNeeded());
  }

  render() {
    const { classes } = this.props;
    const { otherUsers } = this.props;
    return (
      <Grid container spacing={24} className={classes.layput}>
        <Grid container justify="center" alignItems="center" direction="row">
          {!otherUsers.isLoading &&
            otherUsers.items.length !== 0 &&
            otherUsers.items.map(otherUser => {
              return <SuggestionInfo user={otherUser} />;
            })}
          {otherUsers.isLoading && <CircularProgress color="secondary" />}
          {!otherUsers.isLoading && otherUsers.items.length === 0 && (
            <Avatar className={classes.avatar} alt="Empty" src={Empty} />
          )}
        </Grid>
      </Grid>
    );
  }
}

SuggestionsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  otherUsers: PropTypes.object
};

function mapStateToProps(state) {
  const { otherUsers } = state;

  return {
    otherUsers
  };
}

export default withStyles(styles)(
  connect(mapStateToProps)(SuggestionsContainer)
);
