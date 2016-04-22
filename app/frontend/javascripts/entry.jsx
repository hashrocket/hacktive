import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";

import HacktiveApp from "components/hacktive_app";

$(document).ready(function(){
  ReactDOM.render(
    <HacktiveApp/>,
    document.getElementById("hacktive")
  )
})
