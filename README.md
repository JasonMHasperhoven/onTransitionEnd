## EventTarget.prototype.onTransitionEnd()

This is a helper which adds `onTransitionEnd()` to `EventTarget`.

Inspired from bootstrap’s implementation, but without any jQuery dependency.

### How it works

It checks which transitionEnd is supported by the client:<br>
`'webkitTransitionEnd', 'transitionend', 'oTransitionEnd otransitionend', 'transitionend'`

And if it’s not supported (IE8 etc.) it will dispatch an `transitionend` event after the provided `transitionDuration`.

Unlike `target.addEventListener('transitionend', fn)`, this will not trigger when a child has finished it’s transition.

### Syntax

```js
target.onTransitionEnd(listener, transitionDuration);
```

Example:

```js
document.querySelector('.button').onTransitionEnd(() => {
  // your code
}, 1000);
```
