# Installation
> npm install --save svelte-gamepad

# Usage example

```js
// file.svelte
<script>
  import Gamepad from "./Gamepad.svelte";

  let leftAxis = { x: 0, y: 0 };
  let rightAxis = { x: 0, y: 0 };

  function gamepadConnected(event) {
    console.log(`app: gamepad ${event.detail.gamepadIndex} connected`);
  }
  function APressed(event) {
    console.log("A pressed");
  }

  function RTPressed(event) {
    console.log("RT pressed", event.detail.value);
  }

  function LeftStick(event) {
    leftAxis = event.detail;
  }

  function RightStick(event) {
    rightAxis = event.detail;
  }
</script>

<Gamepad
  gamepadIndex={0}
  on:Connected={gamepadConnected}
  on:A={APressed}
  on:RT={RTPressed}
  on:LeftStick={LeftStick}
  on:RightStick={RightStick}
/>
```

# API

**stickThreshold**

Threshold above which `LeftStick` and `RightStick` are triggered.
**Default: 0.2**.

**Functions**

## Buttons

Each button gets a GameButton that has a:

- pressed: boolean
- touched: boolean
- value: decimal

```
on: A
on: B
on: X
on: Y
on: LB
on: RB
on: LT
on: RT
on: Back
on: Start
on: LS
on: RS
on: DPadUp
on: DPadDown
on: DPadLeft
on: DPadRight


## Sticks
Each stick gets an object with an x and y in the interval [-1, 1].
```

on: LeftStick
on: RightStick

```

# Info

- Gamepads go from gamepadIndex 0 to 3.
- gamepadController loops and returns the gamepad state
- Gamepad is a component that serves intermediary between the world and gamepadController

## Caniuse gamepad

Based on:
https://github.com/luser/gamepadtest/blob/master/gamepadtest.js
https://github.com/SBRK/react-gamepad

91% of the browsers. Mobile has more support than desktop 😂.

# Decisions (higher is more recent)

- Going to use the react-gamepad strategy to connect/disconnect. Basically check if there are navigator.getGamepads().
- The name comes from svelte + gamepad.
```
