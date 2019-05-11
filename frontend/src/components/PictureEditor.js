import React, { Component } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";

class PictureEditor extends Component {
  state = {
    input: this.props.image,
    open: false
  };
  editorRef = React.createRef();

  handleClickButton = () => {
    const editorInstance = this.editorRef.current.getInstance();
    editorInstance.flipX();
  };

  render() {
    return (
      <>
        <ImageEditor
          ref={this.editorRef}
          includeUI={{
            loadImage: {
              path: this.state.input,
              name: "SampleImage"
            },
            menu: ["shape", "filter"],
            initMenu: "filter",
            uiSize: {
              width: "500px",
              height: "500px"
            },
            menuBarPosition: "bottom"
          }}
          cssMaxHeight={500}
          cssMaxWidth={500}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70
          }}
          usageStatistics={true}
        />
        <button onClick={this.handleClickButton}>Flip image by X Axis!</button>
      </>
    );
  }
}

export default PictureEditor;
