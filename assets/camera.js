import * as THREE from "three"
import { size } from "./renderer.js";
import tank from "./tank.js";

export const camera = new THREE.PerspectiveCamera(
  60,
  size.width / size.height,//size from render.js
  1,
  100
);

camera.name = "Perspective-camera";

export const debug_camera = new THREE.PerspectiveCamera(
  60,
  size.width / size.height,//size from render.js
  1,
  100
);

debug_camera.name = "Perspective-debug_camera";
// debug_camera.position.set(camera.position.clone())
debug_camera.lookAt(0,0,0)