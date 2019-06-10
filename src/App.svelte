<script>
  import Gamepad from "./Gamepad.svelte";

  function gamepadConnected(event) {
    console.log(`app: gamepad ${event.detail.gamepadIndex} connected`);
  }
  function APressed(event) {
    console.log("A pressed")
  }
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<Gamepad gamepadIndex={0} on:connected={gamepadConnected} on:Apressed={APressed} />
<h1>svelte-gamepad</h1>
