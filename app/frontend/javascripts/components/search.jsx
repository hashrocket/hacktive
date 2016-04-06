var React = require("react");
var ReactDOM = require("react-dom");

// Search
var Search = React.createClass({
  onFormSubmit: function(event){
    // Prevent default form submission
    event.preventDefault()
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
            onChange={this.props.onSearchChange}
            placeholder="Search"
            type="text"
          />
        </form>
      </div>
    )
  }
})

module.exports = Search
