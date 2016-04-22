import React from 'react';
import ReactDOM from 'react-dom';

import SearchActions from "flux/actions/search_actions";
import SearchStore from "flux/stores/search_store";

const Search = React.createClass({
  onFormSubmit: function(event){
    event.preventDefault()
  },

  onSearchChange: function(event){
    var target = event.currentTarget;
    var query = target.value;

    SearchActions.setQuery(query)
  },

  render: function(){
    return (
      <div id="search">
        <form
          action="/search"
          onSubmit={this.onFormSubmit}
        >
          {/* TODO: Uncomment */}
          {/*<div className="filter-btn">
            <ImageWithText
              _class="btn-gray wrapper"
              image={{src: ICONS.filter.black}}
            />
          </div>*/}

          <input
            autoComplete="off"
            className="input"
            id="search-input"
            onChange={this.onSearchChange}
            placeholder="Search"
            type="text"
            value={SearchStore.getQuery()}
          />
        </form>
      </div>
    )
  }
})

module.exports = Search
