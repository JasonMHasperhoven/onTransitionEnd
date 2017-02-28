'use strict';

var getTransitionEnd = function getTransitionEnd() {
  if (window.QUnit) {
    return false;
  }

  var el = document.createElement('div');

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  for (var name in TransitionEndEvent) {
    if (el.style[name] !== undefined) {
      return TransitionEndEvent[name];
    }
  }

  return false;
};

var transitionEndSupport = getTransitionEnd();
var transitionEnd = transitionEndSupport ? transitionEndSupport : 'transitionend';

EventTarget.prototype.transitionEndFallback = function(duration) {
  if (transitionEndSupport) {
    return this;
  }

  var transitionendEvent = document.createEvent('TransitionEvent');
  transitionendEvent.initEvent('transitionend', true, true);

  window.setTimeout(function() {
    this.dispatchEvent(transitionendEvent);
  }.bind(this), duration);

  return this;
};

EventTarget.prototype.onTransitionEnd = function(fn, duration) {
  var transitionEndListener = function(fn) {
    if (this === event.target) {
      this.removeEventListener(transitionEnd, transitionEndListenerWithFallback);
      fn();
    }

    return this;
  }.bind(this);

  var transitionEndListenerWithFallback = function(event) {
    transitionEndListener(fn).transitionEndFallback(duration);
  };

  this.addEventListener(transitionEnd, transitionEndListenerWithFallback);

  return this;
};
