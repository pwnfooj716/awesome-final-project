import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddAPhoto from "@material-ui/icons/AddAPhotoOutlined";
import AddToPhoto from "@material-ui/icons/AddToPhotosRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import firebase from "../config/firebaseConfig";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import uuidv4 from "uuidv4";
import apiService from "../ApiService";
import Cookies from "universal-cookie";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import Snackbar from "@material-ui/core/Snackbar";
import { Icon } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
const cookies = new Cookies();

const styles = theme => ({
  postPopup: {
    height: "800px",
    width: "800px"
  },
  icon: {
    margin: theme.spacing.unit * 2,
    color: blue[800]
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  button: {
    outline: "none !important"
  }
});

class postPicture extends Component {
  state = {
    input: this.props.image,
    open: false,
    nOpen: false,
    sucess: true,
    imgFile: this.props.image
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

  handleEditEvent = event => {
    console.log(event);

    this.setState({ input: event });
    this.handleClose();
  };

  handlePost = event => {
    const file = this.state.file;
    const storageRef = firebase.storage().ref();
    const imgRef = storageRef.child("images");
    const newImgRef = imgRef.child(uuidv4());
    const blob = new Blob([file]);

    const caption = this.state.caption;
    const stateThis = this;

    newImgRef.put(blob).then(function(snapshot) {
      snapshot.ref.getDownloadURL().then(downloadUrl => {
        const userId = cookies.get("userId");
        apiService
          .addPost(caption, downloadUrl, userId)
          .then(response => {
            stateThis.setState({
              open: false,
              imgFile: ""
            });
            stateThis.handleNotifStatus(true);
          })
          .catch(err => {
            console.log(err.message);
            stateThis.handleNotifStatus(false);
          });
      });
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleNotifClose = () => {
    this.setState({ nOpen: false, success: true });
  };

  handleNotifStatus = status => {
    this.setState({ open: false, nOpen: true, success: status });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCaptionChange = event => {
    this.setState({ caption: event.target.value });
  };

  render() {
    const { classes } = this.props;
    let notifMessage = this.state.success ? (
      <span id="message-id">
        <Icon className={CheckCircleIcon} />
        Picture successfully posted
      </span>
    ) : (
      <span id="message-id">
        <Icon className={ErrorIcon} />
        Picture could not be posted
      </span>
    );

    let preview = "";
    let notifTag = (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={this.state.nOpen}
        autoHideDuration={6000}
        onClose={this.handleNotifClose}
        message={notifMessage}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.button}
            onClick={this.handleNotifClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );

    if (this.state.input) {
      preview = (
        <DialogContent>
          <DialogContentText>
            {/* <PictureEditor
              image={this.state.input}
              handleEditEvent={this.handleEditEvent}
            /> */}
            <img
              src={this.state.imgFile}
              alt="Select a piecture"
              width="100%"
              height="100%"
              min-height={500}
            />
          </DialogContentText>
        </DialogContent>
      );
    }
    return (
      <div>
        <Fab size="medium" color="secondary" aria-label="Edit" className={classes.button} onClick={this.handleClickOpen}>
        <AddAPhoto />
      </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth="sm"
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">
            <IconButton className={classes.button} aria-label="">
              <AddToPhoto color="secondary" />
            </IconButton>
            New Post
          </DialogTitle>
          {preview}
          <Button className={classes.button} color="primary">
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
            <Button className={classes.button} onClick={this.handleClose.bind(this)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handlePost.bind(this)}
              color="primary"
              className={classes.button}
              variant="contained"
            >
              POST
            </Button>
          </DialogActions>
        </Dialog>
        {notifTag}
      </div>
    );
  }
}

postPicture.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(postPicture);
