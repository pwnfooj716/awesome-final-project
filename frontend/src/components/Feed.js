import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteFilledIcon from "@material-ui/icons/FavoriteRounded";
import api from "../ApiService";
import Cookies from "universal-cookie";
import {
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent
} from "@material-ui/core";
const cookies = new Cookies();

const styles = theme => ({
  card: {
    width: "100%",
    marginBottom: "40px",
    [theme.breakpoints.up("sm")]: {
      width: "550px"
    }
  },
  header: {
    backgroundColor: "#f7f7f7"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
    backgroundColor: red[500]
  },
  button: {
    outline: "none !important"
  },
  actionArea: {
    outline: "none !important"
  }
});

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      open: false
    };
    this.handleAction = this.handleAction.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  async handleAction() {
    let uid = cookies.get("userId");
    if (this.state.liked) {
      await api.unlike(uid, this.props.post.postId);
      this.setState({ liked: false });
    } else {
      await api.like(uid, this.props.post.postId);
      this.setState({ liked: true });
    }
  }

  async checkLike() {
    let uid = cookies.get("userId");
    return await api.getLikeStatus(uid, this.props.post.postId);
  }

  async componentDidMount() {
    let status = await this.checkLike();
    if (status) {
      this.setState({ liked: true });
    } else {
      this.setState({ liked: false });
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const author = this.props.author;
    let postDate = new Date(this.props.post.createTime._seconds);
    let dateString = postDate.toLocaleDateString(
      "en-US",
      this.props.dateOptions
    );
    const avatar = (
      <Avatar aria-label="DP" className={classes.avatar} src={author.picture} />
    );

    const button = this.state.liked ? (
      <FavoriteFilledIcon color="error" fontSize="large" />
    ) : (
      <FavoriteIcon color="error" fontSize="large" />
    );

    const header = (
      <CardHeader
        avatar={avatar}
        className={classes.header}
        title={author.name}
        subheader={dateString}
        action={
          <IconButton
            className={classes.button}
            aria-label="Action"
            onClick={() => this.handleAction()}
          >
            {button}
          </IconButton>
        }
      />
    );

    const media = (
      <CardMedia
        className={classes.media}
        image={this.props.post.postImage}
        title="Image"
      />
    );

    const content = (
      <CardContent>
        <Typography component="p">{this.props.post.postTextContent}</Typography>
      </CardContent>
    );

    const modal = (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="More Info"
        open={this.state.open}
        onBackdropClick={this.handleClose}
        onEscapeKeyDown={this.handleClose}
      >
        <DialogTitle id={this.props.post.postId} onClose={this.handleClose}>
          {header}
        </DialogTitle>
        <DialogContent>
          {media}
          {content}
        </DialogContent>
      </Dialog>
    );

    return (
      <div>
        {modal}
        <Card className={classes.card} key={this.props.post.postId}>
          <CardActionArea
            className={classes.actionArea}
            onClick={this.handleClickOpen}
          >
            {media}
          </CardActionArea>
          {header}
          {content}
        </Card>
      </div>
    );
  }
}

Feed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Feed);
