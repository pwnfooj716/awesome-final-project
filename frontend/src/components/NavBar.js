import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import logo from "../resources/logo.png";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import PowerOff from "@material-ui/icons/PowerOff";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Home from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: "inherit"
  },
  link: {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      color: "white",
      textDecoration: "none"
    },
    "&:active": {
      color: "white",
      textDecoration: "none"
    },
    "&:focus": {
      color: "white",
      textDecoration: "none"
    }
  },
  nav: {
    backgroundColor: "inherit",
    "box-shadow": "none",
    [theme.breakpoints.up("sm")]: {
      marginTop: "6px",
      height: "57px"
    }
  },
  grow: {
    flexGrow: 1
  },
  title: {
    height: "51px",
    display: "block",
    [theme.breakpoints.up("sm")]: {
      height: "51px"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class NavBar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      />
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <Link component={RouterLink} to="/" className={classes.link}>
            <IconButton color="inherit">
              <Home />
            </IconButton>
            <p>Home</p>
          </Link>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <Link
            component={RouterLink}
            to="/userprofile"
            className={classes.link}
          >
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <p>My Profile</p>
          </Link>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <Link
            component={RouterLink}
            to="/signintest"
            className={classes.link}
          >
            <IconButton color="inherit">
              <PowerOff />
            </IconButton>
            <p>Logout</p>
          </Link>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.nav}>
          <Toolbar>
            <img src={logo} className={classes.title} alt={"logo"} />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Tooltip title="Home" placement="bottom">
                <Link component={RouterLink} to="/" className={classes.link}>
                  <IconButton color="inherit">
                    <Home />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title="Notifications" placement="bottom">
                <IconButton color="inherit">
                  <Badge badgeContent={11} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Profile" placement="bottom">
                <Link
                  component={RouterLink}
                  to="/userprofile"
                  className={classes.link}
                >
                  <IconButton color="inherit">
                    <AccountCircle />
                  </IconButton>
                </Link>
              </Tooltip>
              <Link
                component={RouterLink}
                to="/signintest"
                className={classes.link}
              >
                <Tooltip title="Logout" placement="bottom">
                  <IconButton color="inherit">
                    <PowerOff />
                  </IconButton>
                </Tooltip>
              </Link>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
