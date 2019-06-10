# Commands

dev server => npm run dev

# Info

Gamepads go from 0 to 3.

**caniuse gamepad**
Based on:
https://github.com/luser/gamepadtest/blob/master/gamepadtest.js
https://github.com/SBRK/react-gamepad

91% of the browsers. Mobile has more support than desktop 😂.

# Decisions (the higher, the most recent)

- Going to use the react-gamepad strategy to connect/disconnect. Basically check if there are navigator.getGamepads().
- The name comes from svelte + gamepad.
