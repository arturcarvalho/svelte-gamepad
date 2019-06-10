let frame = null;
let gamepads = {
  0: { connected: false },
  1: { connected: false },
  2: { connected: false },
  3: { connected: false }
};

let watcherRunning = false;

function loop() {
  // console.log("professor loopin");
  const pads = navigator.getGamepads();

  for (let i = 0; i <= pads.length; i++) {
    const pad = pads[i];
    const gamepad = gamepads[i];
    if (pad && gamepad && gamepad.methods) {
      processOnConnected(gamepad);

      if (gamepad.methods.onAPressed && pad.buttons[0].pressed) {
        console.log("a fn", pad.buttons[0]);
      }
    }
  }

  // may need => if (window && window.requestAnimationFrame) AND this
  frame = requestAnimationFrame(loop);
}

function processButton() {}

/**
 * Process onConnected functions
 */
function processOnConnected(gamepad) {
  if (!gamepad.connected && gamepad.methods.onConnected) {
    gamepad.connected = true;
    gamepad.methods.onConnected();
  }
}

/**
 * Checks for gamepads. When it finds one, start looping.
 * Until then, verify every x milliseconds.
 */
function startGamepadWatcher() {
  console.log("watcher");
  watcherRunning = true;

  const pads = navigator.getGamepads();

  // Start loop if one of the 4 pads available.
  if (pads[0] || pads[1] || pads[2] || pads[3]) {
    loop();
  } else {
    setTimeout(startGamepadWatcher, 500);
  }
}

export function addGamepad(gamepadIndex, methods) {
  console.log("add");
  gamepads[gamepadIndex].methods = methods;

  if (!watcherRunning) startGamepadWatcher();
  return () => cancelAnimationFrame(frame);
}
