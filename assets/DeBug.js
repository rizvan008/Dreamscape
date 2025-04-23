import tank,{frontRightTyre, frontLeftTyre} from "./tank.js";
import { yard, containers, ground } from "./containers.js"
import { lifter } from "./lift.js";
import GSAP from "gsap";
import * as dat from "dat.gui";
import { scene } from "./scene.js";

export const gs_p = new dat.GUI();

/** creating motions to objects */
function tick() {
gs_p.add(yard.position, 'x').min(0).max(10).step(0.01).name('yard x-axis')
gs_p.add(yard.position, 'y').min(0).max(10).step(0.01).name('yard y-axis')
gs_p.add(yard, 'visible').name('yard visible')
gs_p.add(frontRightTyre.material, 'wireframe').name('front Right tyre Wireframe')
const folder = gs_p.addFolder("lifter")
folder.add(lifter, 'visible').name('lifter visible")')
folder.add(lifter.position, 'x').min(0).max(10).step(0.01)
folder.add(lifter.position, 'y').min(0).max(10).step(0.01)
folder.addColor(lifter.children[0].material, 'color').onChange((color) => { color = new THREE.Color('red') })
folder.add(lifter.children[0].material, 'side')
folder.add(lifter.children[0].material, 'wireframe')
folder.add(tank.children[tank.children.length].position, 'y').min(0).max(10).step(0.01)
folder.add(tank.children[tank.children.length].position, 'x').min(0).max(10).step(0.01)
folder.open();

}

  try{
    if (scene) {
      tick();
    }
  } catch (error) {
    console.error('error in gs_p, debug.js : ', error);
  }