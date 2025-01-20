
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { camera } from "./camera";
import { canvas } from "./renderer";

// ** camera control behavior * //;
export const control = new OrbitControls(camera, canvas);
