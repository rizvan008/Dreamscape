import * as THREE from "three"
import { size } from "./renderer.js";

export const camera = new THREE.PerspectiveCamera(
  60,
  size.width / size.height,//size from render.js
  1,
  100
);

camera.name = "Perspective-camera";