import tank,{frontRightTyre, frontLeftTyre} from "./tank.js";
import { yard, containers, plane } from "./containers.js"
import { lifter } from "./lift.js";
import GSAP from "gsap";
import * as dat from "dat.gui";
import { scene } from "./scene.js";

export const gs_p = new dat.GUI();

/** creating motions to objects */
function tick() {
gs_p.add(yard.position, 'x').min(0).max(10).step(0.01)
gs_p.add(yard.position, 'y').min(0).max(10).step(0.01)
gs_p.add(yard, 'visible')
gs_p.add(frontRightTyre.material, 'wireframe')
gs_p.add(lifter, 'visible')
gs_p.add(lifter.position, 'x').min(0).max(10).step(0.01)
gs_p.add(lifter.position, 'y').min(0).max(10).step(0.01)
gs_p.add(lifter.children[0].material, 'wireframe')//.onChange((color) => { color = new THREE.Color('rbg(255, 0, 0)') })
gs_p.add(lifter.children[0].material, 'side')


}

  try{
    if (scene) {
      tick();
    }
  } catch (error) {
    console.error('error in gs_p, debug.js : ', error);
  }