import React from 'react';

import ICONS from "javascripts/global/icons"

import UiStore from "flux/stores/ui_store";

import Squares from "components/squares";

const HacktiveApp = React.createClass({
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
        <Header/>
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
					<h1>{"Hacktive"}</h1>
					<h2>
						<img src={ICONS.logos.hashrocketIcon} alt="Hashrocket"/>

						<span>{"A"}</span>
						<a href="http://www.hashrocket.com" target="_blank">
							{"Hashrocket"}
						</a>
						<span>{"Project"}</span>
					</h2>

					<form>
						<fieldset>
							<input type="search" placeholder="Search"/>
						</fieldset>
					</form>
				</div>
			</header>
    )
  }
});

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
