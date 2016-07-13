import React from 'react';
import ICONS from "javascripts/global/icons"

import UiStore from "flux/stores/ui_store";

import DeveloperList from "components/developer_list";
import Search from "components/search";
import Squares from "components/squares";

function startServiceWorker(){
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("service_worker.js")
      .then(function(registration){
        console.log("service worker registered")
      }).catch(function(error){
        console.log("service worker registration failed. error: ", error)
      })
  }
}

const HacktiveApp = React.createClass({
  componentDidMount: function(){
    UiStore.addChangeListener(this.onUiStoreChange)
    startServiceWorker()
  },

  componentWillUnmount: function(){
    UiStore.removeChangeListener(this.onUiStoreChange)
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
