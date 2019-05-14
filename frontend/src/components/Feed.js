import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteFilledIcon from "@material-ui/icons/FavoriteRounded";
import api from "../ApiService";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const styles = theme => ({
  card: {
    width: "80%",
    marginBottom: "40px"
  },
  header: {
    //backgroundColor: "#283e4a",
  },
  media: {
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
  }
});

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    };
    this.handleAction = this.handleAction.bind(this);
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
    console.log(status);
    if (status) {
      this.setState({ liked: true });
    } else {
      this.setState({ liked: false });
    }
  }

  render() {
    const { classes } = this.props;
    const author = this.props.author;
    //let postDate = new Date(parseInt(feed.createTime, 10));
    const defaultAvatar = (
      <Avatar aria-label="Recipe" className={classes.avatar}>
        {author ? author.name.charAt(0).toUpperCase() : "U"}
      </Avatar>
    );

    const avatar =
      author && author.picture ? (
        <Avatar
          aria-label="DP"
          className={classes.avatar}
          src={author.picture}
        />
      ) : (
        defaultAvatar
      );

    const button = this.state.liked ? (
      <FavoriteFilledIcon color="error" fontSize="large"/>
    ) : (
      <FavoriteIcon color="error" fontSize="large"/>
    );

    return (
      <Card className={classes.card} key={this.props.post.postId}>
        <CardHeader
          avatar={avatar}
          className={classes.header}
          title={author.name}
          // subheader={postDate}
        />
        <CardMedia
          className={classes.media}
          image={this.props.post.postImage}
          title="Image"
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Action" onClick={() => this.handleAction()}>
            {button}
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography component="p">
            {this.props.post.postTextContent}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Feed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Feed);
