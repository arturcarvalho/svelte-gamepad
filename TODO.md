- onConnet not triggering for next gamepads
- Instead of scanning for gamepads on every loop, do it on connect/disconnect (is this possible everywhere?)
- Test on Safari
  - check if rAF is called correctly
  - check if webkitgamepadconnected is called on safari

```js
rAF =
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;
```
