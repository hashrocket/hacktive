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
    //    method of O with the argument "length".
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

//-----start: Math-----//
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
	if (typeof exp === "undefined" || +exp === 0) {
		return Math[type](value);
	}
	value = +value;
	exp = +exp;
	// If the value is not a number or the exp is not an integer...
	if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
		return NaN;
	}
	// Shift
	value = value.toString().split("e");
	value = Math[type](+(value[0] + "e" + (value[1] ? (+value[1] - exp) : -exp)));
	// Shift back
	value = value.toString().split("e");
	return +(value[0] + "e" + (value[1] ? (+value[1] + exp) : exp));
}

// Decimal round
if (!Math.round10) {
	Math.round10 = function(value, exp) {
		return decimalAdjust("round", value, exp);
	};
}

// Decimal floor
if (!Math.floor10) {
	Math.floor10 = function(value, exp) {
		return decimalAdjust("floor", value, exp);
	};
}

// Decimal ceil
if (!Math.ceil10) {
	Math.ceil10 = function(value, exp) {
		return decimalAdjust("ceil", value, exp);
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
		var powerAbbrevs = ["K", "M", "B", "Tr"];

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
			black: "/assets/icons/filter_black.png"
		},
		star: {
			black: "/assets/icons/star_black.png",
			gray: "/assets/icons/star_gray.png"
		},
		stubs: {
			avatar: "/assets/stubs/avatar_stub.png",
			user: "/assets/stubs/user_stub.png"
		}
	}
	//*****End: Variables*****//

	// Flux Constants
	var UiConstants = {
		DATETIME_FORMATS: {
			FORMAT0: "ddd, MMMM Do YYYY @ hh:mma",
			FORMAT1: "MMM Do, YYYY @ hh:mma",
			FORMAT2: "MMM Do, YYYY"
		},
	};

	//*****Start: Render DOM*****//
	//-----Start: Render Common-----//
	// Image With Text
	var ImageWithText = React.createClass({
		getImageStyle: function(url){
			return {
				backgroundImage: "url("+url+")"
			}
		},

		render: function(){
			var _class = this.props._class;
			var _image0 = this.props.image;
			var _image1 = this.props.image1
			var _text = this.props.text;
			var class0 = "image-with-text";

			if(_class){
				class0 += (" "+_class)
			}

			if(typeof(_image0) !== "undefined"){
				var class1 = "image image-0"

				if(_image0.src){
					var image0Style = this.getImageStyle(_image0.src);
				}

				if(_image0._class){
					class1 += (" "+_image0._class)
				}

				var image0 = (
					<td className="image-cell image-cell-0">
						<div className={class1} style={image0Style}/>
					</td>
				);
			}

			if(_text){
				var class2 = "text";

				if(_text._class){
					class2 += (" "+_text._class)
				}

				var text = (
					<td className="text-cell">
						<span className={class2}>{_text.content}</span>
					</td>
				)
			}

			if(typeof(_image1) !== "undefined"){
				var class3 = "image image-1";

				if(_image1._class){
					class3 += (" "+_image1._class)
				}

				if(_image1.src){
					var image1Style = this.getImageStyle(_image1.src);
				}

				var image1 = (
					<td className="image-cell image-cell-1">
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
	// App
	var App = React.createClass({
		render: function(){
			return (
				<div id="app-content">
					<App.Header/>
					<App.Body/>
				</div>
			)
		}
	});

	// App Header
	App.Header = React.createClass({
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
										<h1 className="title">{"Hothackers"}</h1>
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

	// App Body
	App.Body = React.createClass({
		render: function(){
			return (
				<div id="body">
					<Search/>
					<DeveloperList/>
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
				<div id="search">
					<form
						action="/search"
						onSubmit={this.onFormSubmit}
					>
						<div className="filter-btn">
							<ImageWithText
								_class="btn-gray wrapper"
								image={{src: ICONS.filter.black}}
							/>
						</div>

						<input
							autoComplete="off"
							className="input"
							placeholder="Search"
							type="text"
						/>
					</form>
				</div>
			)
		}
	});
	//-----End: Render Search-----//

	//-----Start: Render Developer List-----//
	var _developers = [
		{
			activity: "commited to",
			avatar: "https://avatars3.githubusercontent.com/u/735821?v=3&s=460",
			name: "Vidal Ekechukwu",
			project: "Hackers",
			stars: 3,
			username: "VEkh"
		},
		{
			activity: "pulled from",
			avatar: "https://avatars3.githubusercontent.com/u/694063?v=3&s=400",
			name: "Josh Branchaud",
			project: "TIL",
			stars: 3000,
			username: "jbranchaud"
		},
		{
			activity: "forked",
			avatar: "https://avatars2.githubusercontent.com/u/597909?v=3&s=400",
			name: "Chris Erin",
			project: "Seq27",
			stars: 3 * Math.pow(10, 6),
			username: "chriserin"
		}
	];

	// Developer List
	var DeveloperList = React.createClass({
		renderDevelopers: function(){
			var developers = _developers.map(function(_developer, i){
				var timestamp = moment().format(UiConstants.DATETIME_FORMATS.FORMAT2);

				return (
					<li
						className="developer"
						key={i}
					>
						<table>
							<tbody>
								<tr>
									<td className="img-cell">
										<img className="avatar" src={_developer.avatar}/>
									</td>

									<td className="text-cell">
										{/* User */}
										<div className="user">
											<span className="text name">{_developer.name}</span>
											<span className="text username">{"(@"+_developer.username+")"}</span>
											<span>{_developer.activity}</span>
										</div>

										{/* Project */}
										<div className="project">
											<a
												href="//github.com"
												target="_blank"
											>
												<span className="text project">
													{_developer.username+"/"+_developer.project}
												</span>
											</a>
										</div>

										<div className="stats">
											{/* Last Commit */}
											<span className="text commit-datetime">
												{"Last Commit: "+timestamp}
											</span>

											{/* Stars */}
											<ImageWithText
												_class="stars inline"
												image={{src: ICONS.star.black}}
												text={{content: _developer.stars.abbreviate()}}
											/>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</li>
				)
			})

			return developers
		},

		render: function(){
			return (
				<div id="developers-list">
					<ul className="list">
						{this.renderDevelopers()}
					</ul>
				</div>
			)
		}
	})
	//-----End: Render Developer List-----//

	// Render DOM
	ReactDOM.render(
		<App/>,
		document.getElementById("app")
	)
	//*****End: Render DOM*****//
})
