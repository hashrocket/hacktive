var React = require("react");
var ReactDOM = require("react-dom");

var SearchActions = require("flux_root/actions/search_actions");
var SearchStore = require("flux_root/stores/search_store");

// Search
var Search = React.createClass({
  onFormSubmit: function(event){
    // Prevent default form submission
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
