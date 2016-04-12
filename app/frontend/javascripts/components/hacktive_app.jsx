var DeveloperList = require("js_root/components/developer_list");
var ICONS = require("js_root/global/icons")
var React = require("react");
var ReactDOM = require("react-dom");
var Search = require("js_root/components/search");
var UiStore = require("flux_root/stores/ui_store");

var HacktiveApp = React.createClass({
  componentDidMount: function(){
    UiStore.addChangeListener(this.onUiStoreChange)
  },

  componentWillUnmount: function(){
    UiStore.removeChangeListener(this.onUiStoreChange)
  },

  onUiStoreChange: function(){
    this.forceUpdate()
  },

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

  render: function(){
    return (
      <div id="body">
        <Search/>

        <DeveloperList/>
      </div>
    )
  }
});

module.exports = HacktiveApp
