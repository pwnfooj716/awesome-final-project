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
import TextField from '@material-ui/core/TextField';
import firebase from "../config/firebaseConfig";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import uuidv4 from "uuidv4"
import apiService from "../ApiService";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const styles = theme => ({
  postPopup: {
    height: "400px",
    width: "400px"
  }
});

class postPicture extends Component {
  state = {
    input: this.props.image,
    open: false,
    imgFile: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleFileSelected = event => {
    var file = event.target.files[0];
    let reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({
        input: reader.result,
        file: file,
        imgFile: URL.createObjectURL(file),
        caption: ""
      });
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  };

  // This is post callback.
  handleEditEvent = event => {
    console.log(event);
    
    this.setState({ input: event });
    this.handleClose();
  };

  handlePost = event=> {
    const file = this.state.file;
    const storageRef = firebase.storage().ref();
    const imgRef = storageRef.child('images');
    const newImgRef = imgRef.child(uuidv4());
    const blob = new Blob([file]);

    const thisDialog = this;
    newImgRef.put(blob).then(function(snapshot) {
      snapshot.ref.getDownloadURL().then(downloadUrl=>{
        console.log("downloadUrl", downloadUrl);

        const userId = cookies.get("userId");
        apiService
        .addPost(thisDialog.state.caption, downloadUrl, userId)
        .then(response => {
          thisDialog.setState({ open: false });
          console.log(response)
        }).catch(err => {
          console.log(err.message);
        });
      });
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCaptionChange = (event) => {
    this.setState({ caption: event.target.value });
  }

  render() {
    const { classes } = this.props;
    let preview = "";
    if (this.state.input) {
      preview = (
        <DialogContent>
          <DialogContentText>
            {/* <PictureEditor
              image={this.state.input}
              handleEditEvent={this.handleEditEvent}
            /> */}
            <img src={this.state.imgFile} alt="Select a piecture" width="100%" height="100%" min-height={500}/>
          </DialogContentText>
        </DialogContent>
      );
    }
    return (
      <div>
        <ListItem>
          <IconButton
            aria-label="Add to favorites"
            onClick={this.handleClickOpen}>
            <AddAPhoto />
          </IconButton>
          <ListItemText primary="Post a picture" />
        </ListItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth='sm'
          aria-labelledby="draggable-dialog-title">
          <DialogTitle id="draggable-dialog-title">
            <IconButton
              aria-label="">
              <AddToPhoto color="secondary" />
            </IconButton>
            New Post
          </DialogTitle>
          {preview}
          <Button color="primary">
            <input type="file" onChange={this.handleFileSelected.bind(this)} />
          </Button>
          <TextField
            id="outlined-multiline-flexible"
            label="Write a caption..."
            multiline
            rowsMax="4"
            value={this.state.caption}
            // onChange={this.handleChange('multiline')}
            // className={classes.textField}
            margin="normal"
            // helperText="Comments"
            variant="outlined"
            onChange={this.handleCaptionChange.bind(this)}
          />
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handlePost} color="primary" className={classes.button} variant="contained">
              POST
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

postPicture.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(postPicture);
