import { OrbitControls } from "three/examples/jsm/Addons.js";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import { camera } from "./camera";
import { canvas } from "./renderer";
import { MathUtils } from "three";
import tank from "./tank";

// ** camera control behavior * //;
export const control = new OrbitControls(camera, canvas);
// control.enabled = false;
control.enableDamping = true;
control.dampingFactor = 0.25;
control.enableZoom = true;
control.enableRotate = true;
// control.autoRotate = true;
// control.autoRotateSpeed = 0.5;
// control.maxPolarAngle = MathUtils.degToRad(170);
// control.minPolarAngle = MathUtils.degToRad(10);
// control.minDistance = 1;
// control.maxDistance = 100;

// ** Initialize DragControls * //
export const dragging = new DragControls([tank], camera, canvas);

dragging.addEventListener("drag", (event) => {
  console.log(
    event.object.position.x,
    event.object.position.y,
    event.object.position.z
  );
  console.log(`name : ${event.object.name}`);
});
