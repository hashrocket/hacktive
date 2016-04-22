import Dispatcher from 'flux/dispatchers/dispatcher';
import assign from 'object-assign';

const HacktiveDispatcher = assign({}, Dispatcher.prototype, {});

module.exports = HacktiveDispatcher;
