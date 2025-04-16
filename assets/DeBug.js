import tank,{frontRightTyre, frontLeftTyre} from "./tank.js";
import { yard, containers, plane } from "./containers.js"
import GSAP from "gsap";
import * as dat from "dat.gui";
import { scene } from "./scene.js";

export const gs_p = new dat.GUI();

/** creating motions to objects */
function tick() {
gs_p.add(yard.position, 'x').min(0).max(10).step(0.01)
gs_p.add(yard.position, 'y').min(0).max(10).step(0.01)
  }

  try{
    if (scene) {
      tick();
    }
  } catch (error) {
    console.error(error);
  }