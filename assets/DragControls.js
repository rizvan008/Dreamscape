import { DragControls } from "three/examples/jsm/controls/DragControls.js"; // this is specific to DragControls
import { debug_camera } from "./camera.js";
import { canvas } from "./renderer.js";
import tank from "./tank.js";

// ** Initialize DragControls for picking items* //
export const control_dragging = new DragControls([tank], debug_camera, canvas); //change or insert new objects to be dragged
control_dragging.name = "Drag-control";

control_dragging.addEventListener("drag", (event) => {
  console.log(
    "x : ", event.object.position.x,
   "y : ", event.object.position.y,
    "z : ", event.object.position.z
  );
  console.log(event.object);
});

