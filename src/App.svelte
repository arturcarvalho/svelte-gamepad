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

<style>
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
  <span class="stick stick-go-left" style="left:{100 + leftAxis.x * 100}px" />
  <span class="stick stick-go-right" style="right:{100 - leftAxis.x * 100}px" />
</div>

<div class="stick-container">
  <span class="stick stick-go-left" style="left:{100 + leftAxis.y * 100}px" />
  <span class="stick stick-go-right" style="right:{100 - leftAxis.y * 100}px" />
</div>

<div class="stick-container">
  <span class="stick stick-go-left" style="left:{100 + rightAxis.x * 100}px" />
  <span
    class="stick stick-go-right"
    style="right:{100 - rightAxis.x * 100}px" />
</div>
