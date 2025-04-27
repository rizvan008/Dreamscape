import * as THREE from "three"
import { size } from "./renderer.js";
import tank from "./tank.js";

export const camera = new THREE.PerspectiveCamera(
  60,
  size.width / size.height,//size from render.js
  1,
  300
);

camera.name = "Perspective-camera";

export const debug_camera = new THREE.PerspectiveCamera(
  60,
  size.width / size.height,//size from render.js
  1,
  300
);
// export const debug_camera = new THREE.OrthographicCamera(
//   -30, 30, 15, -15,
//   1,
//   100
// );

debug_camera.name = "Debuging-drag_camera";