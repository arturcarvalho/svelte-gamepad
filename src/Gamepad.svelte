<script>
  import layout from "./layouts/XBOX.js";
  import { onMount, createEventDispatcher } from "svelte";
  import { addGamepad } from "./gamepadController.js";

  export let gamepadIndex;
  export let stickThreshold = 0.2; // default threshold

  const dispatch = createEventDispatcher();
  let gamepadState = null;

  function onChange(data) {
    if (!gamepadState) {
      dispatch("Connected", { gamepadIndex });
    }

    gamepadState = { ...data };

    // handle buttons
    Object.keys(gamepadState.buttons).forEach(key => {
      const button = gamepadState[key];

      if (button && button.pressed) {
        dispatch(key, btn);
      }
    });

    // handle axes
    Object.keys(gamepadState.axes).forEach(key => {
      const axis = gamepadState.axes[key];

      if (axis) {
        dispatch(key, axis); // "LeftStick" , {x: 10, y:0}
      }
    });
  }

  const args = {
    layout,
    onChange,
    stickThreshold
  };

  onMount(() => {
    console.log("mount");
    const cleanup = addGamepad(gamepadIndex, args);

    return cleanup;
  });
</script>

<style>
  .rt {
    width: 20px;
    height: 20px;
    background: red;
  }
</style>

<div>Gamepad {gamepadIndex}</div>
<div>
  A:
  {#if gamepadState && gamepadState.buttons && gamepadState.buttons.A}
    {gamepadState.buttons.A.pressed}
  {/if}
</div>

<div>
  RT:
  {#if gamepadState && gamepadState.buttons.RT}
    <div class="rt" style="width:{gamepadState.buttons.RT.value * 200}px" />
  {/if}
</div>
