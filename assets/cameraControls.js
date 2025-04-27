import { camera } from "./camera.js";
import { canvas } from "./renderer.js";
import { OrbitControls } from "three/examples/jsm/Addons.js"; // this is general location to all extras

// ** camera control behavior * //;
export const control_CamerasOrbit = new OrbitControls(camera, canvas);
control_CamerasOrbit.name = "Orbit-control";
control_CamerasOrbit.enableDamping = true;
control_CamerasOrbit.dampingFactor = 0.25;
// control_CamerasOrbit.enabled = false;
// control_CamerasOrbit.enableZoom = false;
// control_CamerasOrbit.enableRotate = false;
// control_CamerasOrbit.autoRotate = true;
// control_CamerasOrbit.autoRotateSpeed = 0.5;
// control_CamerasOrbit.maxPolarAngle = MathUtils.degToRad(170);
// control_CamerasOrbit.minPolarAngle = MathUtils.degToRad(10);
// control_CamerasOrbit.minDistance = 1;
// control_CamerasOrbit.maxDistance = 100;
