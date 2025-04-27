import { DragControls } from "three/examples/jsm/controls/DragControls.js"; // this is specific to DragControls
import { debug_camera, camera } from "./camera.js";
import { canvas } from "./renderer.js";
import tank from "./tank.js";
import lifter from "./liftModule.js";

// ** Initialize DragControls for picking items* //
export const control_dragging = new DragControls([tank, lifter], camera, canvas); //change or insert new objects to be dragged
control_dragging.name = "Drag-control";

control_dragging.addEventListener("drag", (event) => {
  // document.body.appendChild(
    // document.createTextNode(`x : ${event.object.position.x} y : ${event.object.position.y} z : ${event.object.position.z}`)
    // document.createElement('div').textContent = `x : ${event.object.position.x} y : ${event.object.position.y} z : ${event.object.position.z}`);
  console.log(event.object.name,
    { "x ": event.object.position.x,
      "y ": event.object.position.y,
      "z ": event.object.position.z}
  );
});

