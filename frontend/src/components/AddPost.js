import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddAPhoto from "@material-ui/icons/AddAPhotoOutlined";
import AddToPhoto from "@material-ui/icons/AddToPhotosRounded";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PictureEditor from "./PictureEditor";

class AddPost extends Component {
  state = {
    input: this.props.image,
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleUpload = event => {
    var file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({
        input: reader.result
      });
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  };

  handleEditEvent = event => {
    this.setState({ input: event });
    this.handleClose();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let preview = "";
    if (this.state.input) {
      preview = (
        <DialogContent>
          <DialogContentText>
            <PictureEditor
              image={this.state.input}
              handleEditEvent={this.handleEditEvent}
            />
          </DialogContentText>
        </DialogContent>
      );
    }
    return (
      <div>
        <ListItem>
          <IconButton
            aria-label="Add to favorites"
            onClick={this.handleClickOpen}
          >
            <AddAPhoto />
          </IconButton>
          <ListItemText primary="Add a picture" />
        </ListItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">
            <IconButton
              aria-label="Add to favorites"
              onClick={this.handleClickOpen}
            >
              <AddToPhoto color="secondary" />
            </IconButton>
            New Post
          </DialogTitle>
          {preview}
          <DialogActions>
            <Button color="primary">
              <input type="file" onChange={this.handleUpload.bind(this)} />
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddPost;
