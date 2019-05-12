import React, { Component } from "react";
import ImageEditor from 'react-cropper-image-editor';

class AvatorEditor extends Component {
  render() {
    return (
      <div>
        <ImageEditor
          ref='cropper'
          crossOrigin='true'
          src={this.props.image}
          style={{minHeight: 400, minWidth: 400}}
          aspectRatio={16 / 9}
          guides={true}
          rotatable={true}
          imageName='editedImage'
          saveImage={this.props.handleEditEvent.bind(this)}
          responseType='blob/base64'
        />
      </div>
    );
  }
}

export default AvatorEditor;
