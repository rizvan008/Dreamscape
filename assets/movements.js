/**gain access to the camera axis control in-order to move around */
import tank,{frontRightTyre, frontLeftTyre} from "./tank.js";
import { tankLeftTurn, tankRightTurn } from "../tankRightTurn.js";
import { scene } from "./scene.js";

import * as THREE from "three";
import { camera } from "./camera.js";

export function startMovement(value) {
  if (value == 'ArrowUp') {
    tank.position.z += (-0.1);
    
  }

  if (value == 'ArrowDown') {
    tank.position.z += (0.1);
    
  }
  
  const test = tank.position.clone();
  const test2 = tank.rotation.clone();
  console.log('test2: ', test2);
  test.name = "test"

  if (value == 'ArrowLeft') {
    
    frontRightTyre.rotation.y = (3.14/4);
    frontLeftTyre.rotation.y = (3.14/4);
    // frontRightTyre.rotateX(3.14/4);
    // if (keyValue.ArrowUp || keyValue.ArrowDown) {
    //   // tankLeftTurn.add(tank);
    //   // tankLeftTurn.position.rotation.
    //   tank.rotateOnAxis();
    //   camera.lookAt(tank);
    // }
    // scene.add( tankLeftTurn);
    // tank.children[1].rotation.y += .1;
    // tank.children[3].rotation.y += .1;
    
  }
  if (value == 'ArrowRight') {
    tankRightTurn.add(tank);
    // scene.add( tankRightTurn);
    tank.children[1].rotation.y = 3.14/4;
    tank.children[3].rotation.y = 3.14/4;
  }
  if (value == ' ') {//testing Space key , add jumpUp function.
    console.log("jumping");
    // tank.position.y += 0.1;
  }
}
export const keyValue = {};

// window.addEventListener("keydown", (event) => {
//   keyValue[event.key] = true;
// });
// window.addEventListener("keyup", (event) => {
//   keyValue[event.key] = false;
// });

 const keyPressed = false; // to check if the key is pressed or not
window.addEventListener("keydown", (event) => {
  (keyValue[event.key] === " ") && (keyPressed == false) ? console.log("jumping UP")
  // jumpUp(0) 
  : keyValue[event.key] = true;
});
window.addEventListener("keyup", (event) => {
  (keyValue[event.key] === " ") && (keyPressed == true) ? console.log("jumping DOWN")
  // jumpDown(0) 
  : keyValue[event.key] = false;
});


export function jumpUp(x) {
  keyPressed == true
  console.log("tnk : " + `${(tank.position.y = 0.1 * x)}`);
  if (x == 10) {
    // jumpDown(x); // falling back to the ground/ its original position by using SetTimeout.

    return console.log("tnk : " + `${tank.position.y}`);
  }
  console.log(`${x}`);
  jumpUp(x + 1);
}
function jumpDown(x) {
  keyPressed == false
  console.log("tnk : " + `${(tank.position.y -= 0.1)}`);
  if (x == 10) {
    return console.log("tnk : " + `${tank.position.y}`);
  }

  console.log(`${x}`);
  jumpDown(x + 1);
}