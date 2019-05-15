import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import firebase from "../config/firebaseConfig";
import uuidv4 from "uuidv4"
import apiService from "../ApiService";
import Cookies from "universal-cookie";


const cookies = new Cookies();

class ChangeAvator extends Component {

  constructor(props){
    super(props);
    this.state = {
      input: this.props.image,
      open: false
    };
  }

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

  handlePost = event=> {
    const file = this.state.file;
    const storageRef = firebase.storage().ref();
    const imgRef = storageRef.child('images');
    const newImgRef = imgRef.child(uuidv4());
    const blob = new Blob([file]);

    const thisPopup = this;

    newImgRef.put(blob).then(function(snapshot) {
      snapshot.ref.getDownloadURL().then(downloadUrl=>{
        const userId = cookies.get("userId");
        apiService
        .patchUser(userId, '', downloadUrl)
        .then(response => {
          thisPopup.props.handleRefresh(downloadUrl);
        }).catch(err => {
          console.log(err.message);
        });
      });
    });
  }

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

  render() {
    return (
      <div>
        <img src={this.state.imgFile} alt="Select a piecture" width="100%" height="100%" min-height={500}/>
        <br/>
        <Button color="primary">
          <input type="file" onChange={this.handleFileSelected.bind(this)} />
        </Button>
        <br/>
        <br/>
        <Button onClick={this.handlePost} color="primary" variant="contained">
          SAVE
        </Button>
      </div>
    );
  }
}

export default ChangeAvator;
