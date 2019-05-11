import React, { Component } from "react";
//import "tui-image-editor/dist/tui-image-editor.css";
//import ImageEditor from "tui-image-editor";

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
        {/* <ImageEditor
          ref={this.editorRef}
          includeUI={{
            loadImage: {
              path: this.state.input,
              name: "SampleImage"
            },
            menu: ["shape", "filter"],
            initMenu: "filter",
            uiSize: {
              width: "900px",
              height: "700px"
            },
            menuBarPosition: "bottom"
          }}
          cssMaxHeight={700}
          cssMaxWidth={900}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70
          }}
          usageStatistics={false}
        /> */}
      </>
    );
  }
}

export default PictureEditor;
