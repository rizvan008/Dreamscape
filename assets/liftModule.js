import * as THREE from "three";
import { AxesHelper } from "../help-worker/helpers.js";
import  tank  from "./tank.js";  

console.log(' this lift js  worked ');

// lift module need to replace with Gltb file
const lifter = new THREE.Group();
lifter.name = "Lifter Group";

//**building module */ -- need to workout
function createModule (tank, color = 'rgb(243, 24, 24)') {
    const Module = new THREE.Mesh (
        new THREE.BoxGeometry(tank.children[0].geometry.parameters.width + 1, 0.25, 0.25) , new THREE.MeshBasicMaterial({color: color})
    );
    return Module;
}

//**creating lift module */
const liftModule = createModule(tank);
liftModule.name = 'lift Module';
// liftModule.material.color = new THREE.Color('rgb(24, 243, 79)');
liftModule.position.add(new THREE.Vector3(0, tank.children[0].geometry.parameters.height, -tank.children[0].geometry.parameters.depth * 0.75))

//** Later need to work on default position */
// const leftLift = rightLift.clone();
// leftLift.name = "Left lifter";
// leftLift.position.set(-0.25, 0, 0); // moving its geometric center to end

lifter.add(liftModule, )//rightLift, leftLift, liftHandle);
// lifter.position.copy(tank.children[0].position.clone())//.add(new THREE.Vector3(0, tank.children[0].geometry.parameters.height, -tank.children[0].geometry.parameters.depth)))
//** testing one direction at atime  */
// lifter.x = 0; 
// lifter.y = (rightLift.geometry.parameters.height/2 + car_body.height/2); 
// lifter.z = -5; 
// lifter.position.set(lifter.x, lifter.y, lifter.z);
lifter.userData.attachable = true;
lifter.userData.distance = lifter.position.length();

export default lifter;