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
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import PictureEditor from "./PictureEditor"

function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

class AddPost extends Component {
  state = {
    input: null,
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

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
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
          PaperComponent={PaperComponent}
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
          <DialogContent>
            <DialogContentText>
              {/* <img src={this.state.input} alt={"New"} /> */}
              <PictureEditor image={this.state.input}/>
            </DialogContentText>
          </DialogContent>
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
