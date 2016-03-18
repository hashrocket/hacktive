var DeveloperList = require("js_root/components/developer_list");
var ICONS = require("js_root/global/icons")
var React = require("react");
var ReactDOM = require("react-dom");
var Search = require("js_root/components/search");

var HacktiveApp = React.createClass({
  render: function(){
    return (
      <div id="app">
        <HacktiveApp.Header/>
        <HacktiveApp.Body/>
      </div>
    )
  }
})

HacktiveApp.Header = React.createClass({
  render: function(){
    return (
      <div id="header">
        <a data-no-turbolink="true" href="/">
          <table className="header-0">
            <tbody>
              <tr>
                <td>
                  <img className="logo x-reflect" src={ICONS.stubs.avatar}/>
                </td>
                <td>
                  <h1 className="title">{"Hacktive"}</h1>
                </td>
                <td>
                  <img className="logo" src={ICONS.stubs.avatar}/>
                </td>
              </tr>
            </tbody>
          </table>
        </a>
      </div>
    )
  }
});

HacktiveApp.Body = React.createClass({
  getInitialState: function(){
    return {
      filter: ""
    }
  },

  onSearchChange: function(event){
    var target = event.currentTarget;

    this.setState({
      filter: target.value
    })
  },

  render: function(){
    return (
      <div id="body">
        <Search
          onSearchChange={this.onSearchChange}
        />

        <DeveloperList
          filter={this.state.filter}
        />
      </div>
    )
  }
});

module.exports = HacktiveApp
