<script>
  import layout from "./layouts/XBOX.js";
  import { onMount, createEventDispatcher } from "svelte";
  import { addGamepad } from "./gamepadController.js";

  export let gamepadIndex;
  export let stickThreshold = 0.2; // default threshold

  const dispatch = createEventDispatcher();
  let gamepadState = null;

  function onChange(newGamepadState) {
    if (!gamepadState) {
      dispatch("Connected", { gamepadIndex });
    }

    // handle buttons
    Object.keys(newGamepadState.buttons).forEach(key => {
      const button = newGamepadState.buttons[key];

      if (button && button.pressed) {
        dispatch(key, button); // e.g. "RT" , {pressed: true, value: 0.2}
      }

      // Send null when player stops pressing button
      // Needs to check if the previous state is marked as pressed
      if (
        button &&
        !button.pressed &&
        gamepadState &&
        gamepadState.buttons[key].pressed
      ) {
        dispatch(key, null);
      }
    });

    // handle axes
    Object.keys(newGamepadState.axes).forEach(key => {
      const axis = newGamepadState.axes[key];

      if (axis) {
        dispatch(key, axis); // e.g. "LeftStick" , {x: 10, y:0}
      }
    });

    gamepadState = { ...newGamepadState };
  }

  const args = {
    layout,
    onChange,
    stickThreshold
  };

  onMount(() => {
    const cleanup = addGamepad(gamepadIndex, args);
    return cleanup;
  });
</script>
