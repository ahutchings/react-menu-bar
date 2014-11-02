var EventEmitter = require('events').EventEmitter;

function MenuBarEvents () {
  var eventEmitter = new EventEmitter();
  eventEmitter.setMaxListeners(Infinity);

  this.eventEmitter = eventEmitter;
}

MenuBarEvents.prototype.addMouseOverListener = function (listener) {
  this.eventEmitter.addListener('mouseover', listener);
};

MenuBarEvents.prototype.removeMouseOverListener = function (listener) {
  this.eventEmitter.removeListener('mouseover', listener);
};

MenuBarEvents.prototype.emitMouseOver = function (event) {
  this.eventEmitter.emit('mouseover', event);
};

module.exports = MenuBarEvents;