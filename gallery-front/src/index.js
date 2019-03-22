import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Students from "./students.js";
import { BrowserRouter as Router } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Router>
    <Students />
  </Router>,
  document.getElementById("root")
);
