<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { addGamepad } from "./gamepadController.js";

  const dispatch = createEventDispatcher();
  export let gamepadIndex;

  const methods = {
    onConnected: () => {
      dispatch("connected", { gamepadIndex });
    },
    onAPressed: () => {
      dispatch("aPressed");
    }
  };

  onMount(() => {
    console.log("mount");
    const cleanup = addGamepad(gamepadIndex, methods);

    return cleanup;
  });
</script>

<div>Gamepad {gamepadIndex}</div>
