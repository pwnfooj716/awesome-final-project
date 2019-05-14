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
import FavoriteFilledIcon from "@material-ui/icons/FavoriteBorderRounded";
import api from "../ApiService";
import Empty from "../resources/empty.jpg";

const styles = theme => ({
  card: {
    width: "80%",
    marginBottom: "40px",
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
    this.handleLike.bind(this);
    this.handleUnlike.bind(this);
    this.checkLike.bind(this);
  }
  async handleLike() {
    await api.like(this.props.userId, this.props.post.postId);
  }

  async handleUnlike() {
    await api.like(this.props.userId, this.props.post.postId);
  }

  async checkLike() {
    return await api.getLikeStatus(this.props.userId, this.props.post.postId);
  }

  render() {
    const { classes } = this.props;
    const author = this.props.author;

    console.log(author.picture);
    //let postDate = new Date(parseInt(feed.createTime, 10));
    const defaultAvatar = (
      <Avatar aria-label="Recipe" className={classes.avatar}>
        {author ? author.name.charAt(0).toUpperCase() : "U"}
      </Avatar>
    );

    const avatar =
      author && author.picture ? (
        <Avatar aria-label="DP" className={classes.avatar} src={author.picture} />
      ) : (
        defaultAvatar
      );

    const liked = (
      <IconButton color="inherit" onClick={this.handleLike}>
        <FavoriteIcon />
      </IconButton>
    );

    const unliked = (
      <IconButton aria-label="Add to favorites" onClick={this.handleUnlike}>
        <FavoriteFilledIcon />
      </IconButton>
    );

    const likeButton = this.checkLike() ? liked : unliked;

    return (
      <Card className={classes.card} key={this.props.post.postId}>
        <CardHeader
          avatar={defaultAvatar}
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
          {likeButton}
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
