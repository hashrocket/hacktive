var Dispatcher = require('./Dispatcher');
var assign = require('object-assign');

var HacktiveDispatcher = assign({}, Dispatcher.prototype, {
});

module.exports = HacktiveDispatcher;
