<script>
  import Gamepad from "./Gamepad.svelte";

  let state = {
    leftAxis: { x: 0, y: 0 },
    rightAxis: { x: 0, y: 0 },
    buttons: {}
  };

  function gamepadConnected(event) {
    console.log(`app: gamepad ${event.detail.gamepadIndex} connected`);
  }
  function APressed(event) {
    state.buttons["A"] = event.detail;
    console.log("A pressed");
  }

  function RTPressed(event) {
    state.buttons["RT"] = event.detail;
    console.log(event.detail);
    console.log("RT pressed");
  }

  function LeftStick(event) {
    state.leftAxis = event.detail;
  }

  function RightStick(event) {
    state.rightAxis = event.detail;
  }
</script>

<style>
  .rt {
    width: 20px;
    height: 20px;
    background: red;
  }
  h1 {
    color: purple;
  }

  .stick-container {
    position: relative;
    width: 200px;
    height: 20px;
  }

  .stick {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 100px;
    right: 100px;
    background: red;
  }

  .stick-go-left {
    left: 100px;
  }
  .stick-go-right {
    right: 100px;
  }
</style>

<h1>svelte-gamepad</h1>

<Gamepad
  gamepadIndex={0}
  on:Connected={gamepadConnected}
  on:A={APressed}
  on:RT={RTPressed}
  on:LeftStick={LeftStick}
  on:RightStick={RightStick} />

<div class="stick-container">
  <span
    class="stick stick-go-left"
    style="left:{100 + state.leftAxis.x * 100}px" />
  <span
    class="stick stick-go-right"
    style="right:{100 - state.leftAxis.x * 100}px" />
</div>

<div class="stick-container">
  <span
    class="stick stick-go-left"
    style="left:{100 + state.leftAxis.y * 100}px" />
  <span
    class="stick stick-go-right"
    style="right:{100 - state.leftAxis.y * 100}px" />
</div>

<div class="stick-container">
  <span
    class="stick stick-go-left"
    style="left:{100 + state.rightAxis.x * 100}px" />
  <span
    class="stick stick-go-right"
    style="right:{100 - state.rightAxis.x * 100}px" />
</div>

<div>
  A:
  {#if state.buttons.A}{state.buttons.A.value}{/if}
</div>

<div>
  RT:
  {#if state && state.buttons.RT}
    <div class="rt" style="width:{state.buttons.RT.value * 200}px" />
  {/if}
</div>
