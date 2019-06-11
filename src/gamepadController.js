// This file sends the updated state to Gamepad.svelte.
// Does a rAF loop when gamepad connected.

import mapRange from "./utils/mapRange.js";

let frame = null;
let gamepads = {
  0: { layout: null },
  1: { layout: null },
  2: { layout: null },
  3: { layout: null }
};

let watcherRunning = false;

/**
 * Update the Gamepad states by calling onChange
 */
function loop() {
  const pads = navigator.getGamepads();

  for (let i = 0; i <= pads.length; i++) {
    const pad = pads[i];
    const gamepad = gamepads[i];
    if (pad && gamepad && gamepad.onChange) {
      const newState = mapLayout(pad, gamepad.layout, gamepad.stickThreshold);
      gamepad.onChange(newState);
    }
  }

  // may need => if (window && window.requestAnimationFrame) AND webkit prefixes
  frame = requestAnimationFrame(loop);
}

function mapLayout(gamepad, layout, stickThreshold) {
  const mappedValues = {};
  mappedValues.buttons = mapButtons(gamepad, layout);
  mappedValues.axes = mapAxes(gamepad, layout, stickThreshold);
  return mappedValues;
}

function mapButtons(gamepad, layout) {
  const buttons = {};
  for (let i = 0; i < layout.buttons.length; i++) {
    const mappedName = layout.buttons[i];
    buttons[mappedName] = gamepad.buttons[i];
  }
  return buttons;
}

function mapAxes(gamepad, layout, stickThreshold) {
  const leftStick = { x: 0, y: 0 };
  const rightStick = { x: 0, y: 0 };

  for (let i = 0; i < layout.axis.length; i++) {
    const mappedName = layout.axis[i];

    const val = gamepad.axes[i];

    if (mappedName === "LeftStickX") {
      leftStick.x = fixThreshold(val, stickThreshold);
    } else if (mappedName === "LeftStickY") {
      leftStick.y = fixThreshold(val, stickThreshold);
    } else if (mappedName === "RightStickX") {
      rightStick.x = fixThreshold(val, stickThreshold);
    } else if (mappedName === "RightStickY") {
      rightStick.y = fixThreshold(val, stickThreshold);
    }
  }

  return { LeftStick: leftStick, RightStick: rightStick };
}

/**
 * threshold === 0.2
 * 0.1 => 0
 * 0.2 => 0
 * 0.6 => 0.5
 * 1 => 1
 *
 * -0.1 => 0
 * -0.2 => 0
 * -0.6 => -0.5
 * -1 => -1
 * @param {*} value
 * @param {*} threshold
 */
function fixThreshold(value, threshold) {
  // below or equal threshold
  if (value < 0 && value >= -threshold) return 0;
  if (value >= 0 && value <= threshold) return 0;

  // above threshold
  if (value >= 0 && value > threshold)
    return mapRange(value, threshold, 1, 0, 1);

  if (value < 0 && value < -threshold)
    return mapRange(value, -1, -threshold, -1, 0);

  // add tests dummy.
  // console.log(mapRange(0.2, 0.2, 1, 0, 1));
  // console.log(mapRange(1, 0.2, 1, 0, 1));
  // console.log(mapRange(1, 0.2, 1, 0, 1));
  // console.log(50, mapRange(0.6, 0.2, 1, 0, 1));
  // console.log(25, mapRange(0.4, 0.2, 1, 0, 1));
  // console.log(75, mapRange(0.8, 0.2, 1, 0, 1));
}

/**
 * Checks for gamepads. When it finds one, start looping.
 * Until then, verify every x milliseconds.
 */
function startGamepadWatcher() {
  watcherRunning = true;

  const pads = navigator.getGamepads();

  // Start loop if one of the 4 pads available.
  if (pads[0] || pads[1] || pads[2] || pads[3]) {
    loop();
  } else {
    setTimeout(startGamepadWatcher, 500);
  }
}

export function addGamepad(gamepadIndex, args) {
  console.log("add");
  gamepads[gamepadIndex] = args;

  if (!watcherRunning) startGamepadWatcher();
  return () => cancelAnimationFrame(frame);
}
