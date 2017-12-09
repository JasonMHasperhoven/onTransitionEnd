const getTransitionEnd = () => {
  const el = document.createElement('div');

  const TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend',
  };

  Object.entries(TransitionEndEvent).forEach(([styleName, eventName]) => {
    if (el.style[styleName] !== undefined) {
      return eventName;
    }
  });

  return false;
};

const transitionEndSupport = getTransitionEnd();
const transitionEnd = transitionEndSupport || 'transitionend';

EventTarget.prototype.transitionEndFallback = function (duration) {
  if (transitionEndSupport) {
    return this;
  }

  const transitionendEvent = document.createEvent('TransitionEvent');
  transitionendEvent.initEvent('transitionend', true, true);

  window.setTimeout(() => {
    this.dispatchEvent(transitionendEvent);
  }, duration);

  return this;
};

EventTarget.prototype.onTransitionEnd = function (fn, duration) {
  const transitionEndListener = (event, fn) => {
    if (this === event.target) {
      this.removeEventListener(transitionEnd, transitionEndListenerWithFallback);
      fn();
    }

    return this;
  };

  const transitionEndListenerWithFallback = (event) => {
    transitionEndListener(event, fn).transitionEndFallback(duration);
  };

  this.addEventListener(transitionEnd, transitionEndListenerWithFallback);

  return this;
};
