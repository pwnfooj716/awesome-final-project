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
import PowerOff from "@material-ui/icons/PowerSettingsNewOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Home from "@material-ui/icons/Home";
import Network from "@material-ui/icons/People";
import MoreIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import { setUserId } from "../actions";
import Cookies from "universal-cookie";
import auth from '../protected/auth';
const cookies = new Cookies();

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: "inherit"
  },
  link: {
    color: "#283e4a",
    textDecoration: "none",
    "&:hover": {
      color: "#283e4a",
      textDecoration: "none"
    },
    "&:active": {
      color: "#283e4a",
      textDecoration: "none"
    },
    "&:focus": {
      color: "#283e4a",
      textDecoration: "none"
    },
    [theme.breakpoints.up("md")]: {
      color: "white",
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
    mobileMoreAnchorEl: null
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleLogout = () => {
    const { dispatch } = this.props;
    auth.logout();
    dispatch(setUserId(null));
    cookies.remove("AuthCookie");
  };

  handleMobileMenuCloseL = () => {
    console.log("asd");

    cookies.remove("AuthCookie");
    this.setState({ mobileMoreAnchorEl: null });
  };

  expCookie = () => {
    // alert(cookies.get('AuthCookie'));

    cookies.remove("AuthCookie");

    // console.log("123");
  };

  render() {
    const { mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const homeNav = (
      <Link component={RouterLink} to="/home" className={classes.link}>
        <IconButton color="inherit">
          <Badge
            badgeContent={0}
            color="error"
          >
            <Home />
          </Badge>
        </IconButton>
      </Link>
    );

    const networkNav = (
      <Link component={RouterLink} to="/network" className={classes.link}>
        <IconButton color="inherit">
          <Network />
        </IconButton>
      </Link>
    );

    const profileNav = (
      <Link component={RouterLink} to="/userprofile" className={classes.link}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Link>
    );

    const logoutNav = (
      <Link component={RouterLink} to="/signin" className={classes.link}>
        <IconButton color="inherit" onClick={this.handleLogout}>
          <PowerOff />
        </IconButton>
      </Link>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>{homeNav}</MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>{networkNav}</MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>{profileNav}</MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>{logoutNav}</MenuItem>
      </Menu>
    );

    const logedin = (
      <div className={classes.sectionDesktop}>
        {homeNav}
        {networkNav}
        {profileNav}
        {logoutNav}
      </div>
    );

    const links = this.props.userId ? logedin : "";

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.nav}>
          <Toolbar>
            <Link component={RouterLink} to="/home" className={classes.link}>
              <img src={logo} className={classes.title} alt={"logo"} />
            </Link>
            <div className={classes.grow} />
            {links}
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
        {this.props.userId && [renderMobileMenu]}
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  userId: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { userId } = state;
  return {
    userId
  };
}

export default withStyles(styles)(connect(mapStateToProps)(NavBar));
