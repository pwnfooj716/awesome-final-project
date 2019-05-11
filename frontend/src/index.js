import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "../node_modules/react-cropper-image-editor/node_modules/cropperjs/dist/cropper.css";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
