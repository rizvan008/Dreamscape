import { OrbitControls } from "three/examples/jsm/Addons.js"; // this is general location to all extras
import { DragControls } from "three/examples/jsm/controls/DragControls.js"; // this is specific to DragControls
import { camera } from "./camera.js";
import { canvas } from "./renderer.js";
import tank from "./tank.js";
import { MathUtils } from "three";

// ** camera control behavior * //;
export const control_orbit = new OrbitControls(camera, canvas);
control_orbit.name = "Orbit-control";
// control.enabled = false;
control_orbit.enableDamping = true;
control_orbit.dampingFactor = 0.25;
control_orbit.enableZoom = true;
control_orbit.enableRotate = true;
// control.autoRotate = true;
// control.autoRotateSpeed = 0.5;
// control.maxPolarAngle = MathUtils.degToRad(170);
// control.minPolarAngle = MathUtils.degToRad(10);
// control.minDistance = 1;
// control.maxDistance = 100;

// ** Initialize DragControls for picking items* //
export const control_dragging = new DragControls([tank], camera, canvas); //change or insert new objects to be dragged
control_dragging.name = "Drag-control";

control_dragging.addEventListener("drag", (event) => {
  console.log(
    "x : ", event.object.position.x,
   "y : ", event.object.position.y,
    "z : ", event.object.position.z
  );
  console.log(event.object);
});

