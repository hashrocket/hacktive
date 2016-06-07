import React from "react";
import ReactDOM from "react-dom";

import SearchActions from "flux/actions/search_actions";
import SearchStore from "flux/stores/search_store";

const Search = React.createClass({
  onFormSubmit: function(event){
    event.preventDefault()
  },

  onSearchChange: function(event){
    const target = event.currentTarget;
    const query = target.value;

    SearchActions.setQuery(query)
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
						type="search"
						value={SearchStore.getQuery()}
					/>
				</fieldset>
			</form>
    );
  }
});

export default Search;
