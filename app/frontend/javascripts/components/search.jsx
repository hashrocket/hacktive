import React from "react";
import ReactDOM from "react-dom";

import UiStore from "flux/stores/ui_store";

import SearchActions from "flux/actions/search_actions";
import SearchStore from "flux/stores/search_store";

const Search = React.createClass({
	componentDidMount: function(){
		document.addEventListener("keydown", this.onDocumentKeydown);
	},

  componentWillUnmount: function(){
		document.removeEventListener("keydown", this.onDocumentKeydown);
	},

  onFormSubmit: function(event){
    event.preventDefault()
  },

  onSearchChange: function(event){
    const target = event.currentTarget;
    const query = target.value;

    SearchActions.setQuery(query)
  },

  onDocumentKeydown: function(event){
    if(!UiStore.inputFocused()){
      switch(event.which){
        case 191: { // Ctrl + /
					if(event.ctrlKey){
						event.preventDefault();
						const searchInput = ReactDOM.findDOMNode(this.refs.input);

						searchInput.focus();
					}
        }
      };
    }
  },

  render: function(){
    return (
			<form
				action="/search"
				onSubmit={this.onFormSubmit}
			>
				<fieldset>
					<input
						autoComplete="off"
						onChange={this.onSearchChange}
						placeholder="Search"
						ref="input"
						type="search"
						value={SearchStore.getQuery()}
					/>
				</fieldset>
			</form>
    );
  }
});

export default Search;
