import * as THREE from "three";
import { AxesHelper } from "../help-worker/helpers.js";

// **creating 3d objects - tank for screen */
const tank = new THREE.Group();
tank.name = "tank";

// **creating Geometry and material for items */
const carShape = new THREE.BoxGeometry(1, 1, 3);
const carCover = new THREE.MeshBasicMaterial();
const tyreShape = new THREE.CylinderGeometry(0.5, 0.5, 0.35, 32);
const tyreCover = new THREE.MeshBasicMaterial({ color: "black" });
const grillShape = new THREE.CapsuleGeometry(0.05, 0.7);
const grillCover = new THREE.MeshBasicMaterial({ color: "black" });

// **changing cars color */
carCover.color = new THREE.Color("rgb(240, 224, 5)");
// carCover.color = new THREE.Color('hsl(263, 83.50%, 47.60%)'); //**color manipulation options */

const car = new THREE.Mesh(carShape, carCover);
car.name = "tank-body";

//**create front grills & numbering it */
function createGrill( x= -0.01, y= 0.05, z= -1.5 ) {
  const grill = new THREE.Mesh(grillShape, grillCover);
  grill.name = "Grill";
  frontGrill.position.set( x, y, z );
  frontGrill.rotation.z = 3.14 / 2; // 90 degree - changed its xy axis
  return grill;
}


//**create tyres & numbering it */
const tyres = [];
const createTyre = (x = 0, y = 0, z = 0) => {
  const tyre = new THREE.Mesh(tyreShape, tyreCover);
  tyre.name = `tyre${tyres.length + 1}`;
  tyre.position.set(x, y, z);
  tyre.rotation.z = Math.PI / 2;// rotting the tyre to 90 degree n z-axis
  tyres.push(tyre);
  return tyre;
};

//tyre positions with respect to the car body
const tyre_location = {
  x: car.position.x,
  y: car.position.y,
  z: car.position.z,
};


const rearRightTyre =createTyre(
  tyre_location.x + 0.7,
  tyre_location.y - 0.5,
  tyre_location.z + 0.87
);
rearRightTyre.name = "Rear Right Tyre";

export const frontLeftTyre =createTyre(
  tyre_location.x - 0.7,
  tyre_location.y - 0.5,
  tyre_location.z - 0.8
);
frontLeftTyre.name = "Front Left Tyre";

const rearLeftTyre = 
createTyre(
  tyre_location.x - 0.7,
  tyre_location.y - 0.5,
  tyre_location.z + 0.8
);
rearLeftTyre.name = "Rear Left Tyre";

export const frontRightTyre =
createTyre(
  tyre_location.x + 0.7,
  tyre_location.y - 0.5,
  tyre_location.z - 0.87
);
frontRightTyre.name = "Front Right Tyre";

//**head lights */
const rightHeadLight = createTyre(
  tyre_location.x + 0.3,
  tyre_location.y + 0.3,
  tyre_location.z - 1.47
);
rightHeadLight.name = "Right Head Light";
rightHeadLight.color = new THREE.Color("rgb(255, 255, 255)");

const leftHeadLight = createTyre(
  tyre_location.x - 0.3,
  tyre_location.y + 0.3,
  tyre_location.z - 1.47
);
leftHeadLight.name = "Left Head Light";
leftHeadLight.color = new THREE.Color("rgb(255, 255, 255)");
//**head lights orientation*/
leftHeadLight.scale.set(0.25, 0.25, 0.25);
rightHeadLight.scale.set(0.25, 0.25, 0.25);
leftHeadLight.rotation.y = 3.14 / 2; // 90 degree
rightHeadLight.rotation.y = 3.14 / 2;

//**back Tyre  */
const backTyre = createTyre(
  tyre_location.x + 0.001,
  tyre_location.y + 0.12,
  tyre_location.z + 1.65
);
backTyre.name = "Back Tyre";
//** orientation of the Back tyres, front grill and head lights*/
backTyre.rotation.y = 3.14 / 2;

//**front grill */
export const frontGrill = new THREE.Group();
frontGrill.name = "Front Grill";

frontGrill.add (createGrill(), createGrill(), createGrill());
frontGrill.children.map( (grill, indx) => {grill.position.x = indx * -0.15}) // spacing the grills one apart the other

tank.add(
  car,
  frontLeftTyre,
  rearLeftTyre,
  frontRightTyre,
  rearRightTyre,
  backTyre,
  frontGrill,
  rightHeadLight,
  leftHeadLight
);

frontLeftTyre.add(new THREE.AxesHelper(3));
frontRightTyre.add(new THREE.AxesHelper(3));



export default tank;
