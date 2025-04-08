import { camera } from "./camera.js";
import { canvas } from "./renderer.js";
import { OrbitControls } from "three/examples/jsm/Addons.js"; // this is general location to all extras

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
