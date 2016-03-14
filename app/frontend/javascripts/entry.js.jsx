var $ = require('jquery')
var React = require('react');
var ReactDOM = require('react-dom');

//*****************************************************************//
//************************Table of Contents************************//
//*****************************************************************//
// * Class Extensions..............................[Class Extensions]
// * Variables............................................[Variables]
// * Render DOM..........................................[Render DOM]
//   - Common Components..............................[Render Common]
//   - App...............................................[Render App]
//   - Search.........................................[Render Search]
//   - Developer List.........................[Render Developer List]

//*****Start: Class Extensions*****//
//-----Start: Array-----//
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if(!Array.prototype.map){
  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this|
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal
    //    method of O with the argument 'length'.
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len)
    //    where Array is the standard built-in constructor with that name and
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal
        //     method of callback with T as the this value and argument
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}
//-----End: Array-----//

//-----Start: Math-----//
/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// Decimal round
if (!Math.round10) {
  Math.round10 = function(value, exp) {
    return decimalAdjust('round', value, exp);
  };
}

// Decimal floor
if (!Math.floor10) {
  Math.floor10 = function(value, exp) {
    return decimalAdjust('floor', value, exp);
  };
}

// Decimal ceil
if (!Math.ceil10) {
  Math.ceil10 = function(value, exp) {
    return decimalAdjust('ceil', value, exp);
  };
}
//-----End: Math-----//

//-----Start: Number-----//
// Method: abbreviate
// Desc: Abbreviate large numbers to readable form
Number.prototype.abbreviate = function(){
  var num = this;
  var thousands = num / 1000;
  var thMagnitude = 0

  if(thousands > 1){
    var powerAbbrevs = ['K', 'M', 'B', 'Tr'];

    while(thousands > 1000){
      thMagnitude += 1
      thousands /= 1000
    }

    return (
      Math.floor10(thousands.toFixed(2), -1)+
      powerAbbrevs[thMagnitude]
    ).trim()
  } else {
    return +num
  }
}
//-----End: Number-----//
//*****End: Class Extensions*****//

$(document).ready(function(){
  //*****Start: Variables*****//
  var ICONS = {
    filter: {
      black: '/assets/icons/filter_black.png'
    },
    star: {
      black: '/assets/icons/star_black.png',
      gray: '/assets/icons/star_gray.png'
    },
    stubs: {
      avatar: '/assets/stubs/avatar_stub.png',
      user: '/assets/stubs/user_stub.png'
    }
  }
  //*****End: Variables*****//

  // Flux Constants
  var UiConstants = {
    DATETIME_FORMATS: {
      FORMAT0: 'ddd, MMMM Do YYYY @ hh:mma',
      FORMAT1: 'MMM Do, YYYY @ hh:mma',
      FORMAT2: 'MMM Do, YYYY'
    }
  };

  //*****Start: Render DOM*****//
  //-----Start: Render Common-----//
  // Image With Text
  var ImageWithText = React.createClass({
    getImageStyle: function(url){
      return {
        backgroundImage: 'url('+url+')'
      }
    },

    render: function(){
      var _class = this.props._class;
      var _image0 = this.props.image;
      var _image1 = this.props.image1
      var _text = this.props.text;
      var class0 = 'image-with-text';

      if(_class){
        class0 += (' '+_class)
      }

      if(typeof(_image0) !== 'undefined'){
        var class1 = 'image image-0'

        if(_image0.src){
          var image0Style = this.getImageStyle(_image0.src);
        }

        if(_image0._class){
          class1 += (' '+_image0._class)
        }

        var image0 = (
          <td className='image-cell image-cell-0'>
            <div className={class1} style={image0Style}/>
          </td>
        );
      }

      if(_text){
        var class2 = 'text';

        if(_text._class){
          class2 += (' '+_text._class)
        }

        var text = (
          <td className='text-cell'>
            <span className={class2}>{_text.content}</span>
          </td>
        )
      }

      if(typeof(_image1) !== 'undefined'){
        var class3 = 'image image-1';

        if(_image1._class){
          class3 += (' '+_image1._class)
        }

        if(_image1.src){
          var image1Style = this.getImageStyle(_image1.src);
        }

        var image1 = (
          <td className='image-cell image-cell-1'>
            <div className={class3} style={image1Style}/>
          </td>
        );
      }

      return (
        <table
          className={class0}
          onClick={this.props.onClick}
        >
          <tbody>
            <tr>
              {image0}
              {text}
              {image1}
            </tr>
          </tbody>
        </table>
      )
    }
  })

  //-----End: Render Common-----//

  //-----Start: Render App-----//
  var HacktiveApp = React.createClass({
    render: function(){
      return (
        <div id='app'>
          <HacktiveApp.Header/>
          <HacktiveApp.Body/>
        </div>
      )
    }
  })

  HacktiveApp.Header = React.createClass({
    render: function(){
      return (
        <div id='header'>
          <a data-no-turbolink='true' href='/'>
            <table className='header-0'>
              <tbody>
                <tr>
                  <td>
                    <img className='logo x-reflect' src={ICONS.stubs.avatar}/>
                  </td>
                  <td>
                    <h1 className='title'>{'Hacktive'}</h1>
                  </td>
                  <td>
                    <img className='logo' src={ICONS.stubs.avatar}/>
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
        <div id='body'>
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
  //-----End: Render App-----//

  //-----Start: Render Search-----//
  // Search
  var Search = React.createClass({
    onFormSubmit: function(event){
      // Prevent default form submission
      event.preventDefault()
    },

    render: function(){
      return (
        <div id='search'>
          <form
            action='/search'
            onSubmit={this.onFormSubmit}
          >
            {/* TODO: Uncomment */}
            {/*<div className='filter-btn'>
              <ImageWithText
                _class='btn-gray wrapper'
                image={{src: ICONS.filter.black}}
              />
            </div>*/}

            <input
              autoComplete='off'
              className='input'
              onChange={this.props.onSearchChange}
              placeholder='Search'
              type='text'
            />
          </form>
        </div>
      )
    }
  });
  //-----End: Render Search-----//
  //
  //-----Start: Render Developer List-----//
  // Developer List
  var developers = [];
  var DeveloperList = React.createClass({
    componentDidMount: function(){
      var self = this;

      this.fetch()

      setInterval(function(){
        self.fetch()
      }, 5000)
    },

    fetch: function(){
      var self = this;

      $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        success: function(response){
          developers = response
          self.forceUpdate()
        },
        type: 'GET',
        url: '/developers'
      })
    },

    getInitialState: function(){
      return {
        developers: []
      }
    },

    renderDeveloperCards: function(){
      var activityLookup = {
        IssuesEvent: 'Issue opened at',
        PullRequestEvent: 'Pull request at',
        PushEvent: 'Committed at',
        WatchEvent: 'Starred at'
      };
      var filterRegex = new RegExp(this.props.filter, "gi");

      var filteredDevelopers = developers.filter(function(developer){
        return developer.name.match(filterRegex)
      })

      var developerCards = filteredDevelopers.map(function(developer, i){
        var mostRecentActivity = developer.activities[0];
        var timestamp = moment(
          mostRecentActivity.event_occurred_at
        ).format(UiConstants.DATETIME_FORMATS.FORMAT1);

        return (
          <li
            className='developer'
            key={i}
          >
            <table>
              <tbody>
                <tr>
                  <td className='img-cell'>
                    <img
                      className='avatar'
                      src={`https://avatars.githubusercontent.com/u/${developer.id}`}
                    />
                  </td>

                  <td className='text-cell'>
                    {/* User */}
                    <div className='user'>
                      <span className='text name'>{developer.name}</span>
                      {/*TODO: Finish*/}
                      {/*(<span>{developer.activity}</span>*/}
                    </div>

                    {/* Project */}
                    <div className='project'>
                      <a
                        href={`https://github.com/${mostRecentActivity.repo_name}`}
                        target='_blank'
                      >
                        <span className='text project'>
                          {mostRecentActivity.repo_name}
                        </span>
                      </a>
                    </div>

                    <div className='stats'>
                      {/* Last Commit */}
                      <span className='text commit-datetime'>
                        {`${activityLookup[mostRecentActivity.event_type]}: ${timestamp}`}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        )
      })

      return developerCards
    },

    render: function(){
      return (
        <div id='developers-list'>
          <ul className='list'>
            {this.renderDeveloperCards()}
          </ul>
        </div>
      )
    }
  });
  //-----End: Render Developer List-----//
  ReactDOM.render(
    <HacktiveApp/>,
    document.getElementById('hacktive')
  )
})
