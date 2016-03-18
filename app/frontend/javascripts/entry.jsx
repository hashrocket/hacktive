var $ = require("jquery")
var HacktiveApp = require("js_root/components/hacktive_app");
var React = require("react");
var ReactDOM = require("react-dom");

$(document).ready(function(){
  //*****Start: Render DOM*****//
  ReactDOM.render(
    <HacktiveApp/>,
    document.getElementById("hacktive")
  )
})
