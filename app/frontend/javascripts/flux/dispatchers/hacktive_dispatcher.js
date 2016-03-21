var Dispatcher = require('flux_root/dispatchers/dispatcher');
var assign = require('object-assign');

var HacktiveDispatcher = assign({}, Dispatcher.prototype, {
});

module.exports = HacktiveDispatcher;
