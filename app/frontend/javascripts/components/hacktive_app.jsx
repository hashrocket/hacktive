import React from 'react';
import ICONS from "javascripts/global/icons";
import ServiceWorkerController from "javascripts/global/service_worker_controller";

import UiStore from "flux/stores/ui_store";

import DeveloperList from "components/developer_list";
import Search from "components/search";
import Squares from "components/squares";

const HacktiveApp = React.createClass({
  componentDidMount: function(){
    ServiceWorkerController.start();
    UiStore.addChangeListener(this.onUiStoreChange);

    window.addEventListener("beforeinstallprompt", this.handleInstallPrompt)
  },

  componentWillUnmount: function(){
    UiStore.removeChangeListener(this.onUiStoreChange)

    window.removeEventListener("beforeinstallprompt", this.handleInstallPrompt)
  },

  handleInstallPrompt: function(domEvent){
    if(localStorage.installPrompt){
      domEvent.preventDefault();

      return false;
    }

    domEvent.userChoice.then(function(choice){
      localStorage.installPrompt = choice.outcome;
    });
  },

  onUiStoreChange: function(){
    this.forceUpdate()
  },

  render: function(){
    return (
      <div className="site">
        <Header/>
        <DeveloperList/>
        <Footer/>
      </div>
    )
  }
});

const Footer = React.createClass({
  render: function(){
    return (
      <footer id="footer">
        <Squares count={60}/>

        <div className="container">
          <a href="http://hashrocket.com" target="_blank">
            <img src={ICONS.logos.hashrocketFull} alt="Hashrocket"/>
          </a>
        </div>
      </footer>
    )
  }
});

const Header = React.createClass({
  render: function(){
    return (
      <header id="header">
        <Squares count={100}/>

        <div className="container">
          <a
            className="logo"
            href="/"
          >
            <img
              alt="Hashrocket"
              src={ICONS.logos.hacktive}
            />
          </a>

          <h2>
            <img src={ICONS.logos.hashrocketIcon} alt="Hashrocket"/>

            <span>{"A"}</span>
            <a href="http://www.hashrocket.com" target="_blank">
              {"Hashrocket"}
            </a>
            <span>{"Project"}</span>
          </h2>

          <Search/>
        </div>
      </header>
    );
  }
});

export default HacktiveApp;