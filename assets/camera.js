import * as THREE from "three"
import { size } from "./renderer";

export const camera = new THREE.PerspectiveCamera(
  60,
  size.width / size.height,//size from render.js
  1,
  100
);