import * as THREE from "three";
import { AxesHelper } from "../help-worker/helpers.js";

// **creating 3d objects - tank for screen */
const tank = new THREE.Group();
tank.name = "tank";

// **creating Geometry and material for items */
const carShape = new THREE.BoxGeometry(1, 1, 3);
const carCover = new THREE.MeshBasicMaterial();
const tyreShape = new THREE.CylinderGeometry(0.5, 0.5, 0.35, 25);
const tyreCover = new THREE.MeshBasicMaterial({ color: "black" });
const grillShape = new THREE.CapsuleGeometry(0.05, 0.7);
const grillCover = new THREE.MeshBasicMaterial({ color: "black" });

// **changing cars color */
carCover.color = new THREE.Color("rgb(240, 224, 5)");
// carCover.color = new THREE.Color('hsl(263, 83.50%, 49.60%)'); //**color manipulation options */

const car = new THREE.Mesh(carShape, carCover);
car.position.set( 0, 0, -car.geometry.parameters.depth/2 * 0.5 ) // moving its geometric center to rear tyre position 
car.name = "tank-body";

//**create tyres & numbering it */
const tyres = [];

const createRoundShape = (x = 0, y = 0, z = 0) => {
  const RoundShape = new THREE.Mesh(tyreShape, tyreCover.clone());
  RoundShape.name = `tyre${tyres.length + 1}`;
  RoundShape.position.set(x, y, z);
  RoundShape.rotation.z = Math.PI / 2;// rotting the tyre to 90 degree n z-axis
  tyres.push(RoundShape);
  return RoundShape;
};

//**create front grills & numbering it */
function createGrill( x= car.position.x + -0.01, y= car.position.y + 0.05, z= car.position.z + -1.5 ) { // need to provide dependent position for car body
  const grill = new THREE.Mesh(grillShape, grillCover);
  grill.name = "Grill";
  frontGrill.position.set( x, y, z );
  frontGrill.rotation.z = 3.14 / 2; // 90 degree - changed its xy axis
  return grill;
}

//tyres orientation with respect to the car body movement
const car_body = {
  width: car.geometry.parameters.width,
  height: car.geometry.parameters.height,
  depth: car.geometry.parameters.depth,
  x: car.position.x,
  y: car.position.y,
  z: car.position.z,
};

 const tyrePositionX = (car_body.width/2 + 0.17); // car.geometry.parameters.width / 2 + 0.17 // offset from the car body
 const tyrePositionY = (car_body.height/2);      
 const tyrePositionZ = (car_body.depth/2 * 0.5); // offset is half of the half car body
const headlightPositionX = 0.3;
const headlightPositionY = 0.3;
const headlightPositionZ = 1.47; 

//**create head lights */
const rightHeadLight = createRoundShape(
  car_body.x + headlightPositionX,
  car_body.y + headlightPositionY,
  car_body.z - headlightPositionZ
);
rightHeadLight.name = "Right Head Light";
rightHeadLight.material.color = new THREE.Color("rgb(221, 248, 248)");

const leftHeadLight = createRoundShape(
  car_body.x - headlightPositionX,
  car_body.y + headlightPositionY,
  car_body.z - headlightPositionZ
);
leftHeadLight.name = "Left Head Light";
leftHeadLight.material.color = new THREE.Color("rgb(221, 248, 248)");

//
const rearRightTyre =createRoundShape(
  car_body.x + tyrePositionX , 
  car_body.y - tyrePositionY,
  car_body.z + tyrePositionZ 
);
rearRightTyre.name = "Rear Right Tyre";

export const rearLeftTyre =createRoundShape(
  car_body.x - tyrePositionX,
  car_body.y - tyrePositionY,
  car_body.z + tyrePositionZ
);
rearLeftTyre.name = "Rear Left Tyre";

export const frontLeftTyre =createRoundShape(
  car_body.x - tyrePositionX,
  car_body.y - tyrePositionY,
  car_body.z - tyrePositionZ 
);
frontLeftTyre.name = "Front Left Tyre";

export const frontRightTyre =
createRoundShape(
  car_body.x + tyrePositionX,
  car_body.y - tyrePositionY,
  car_body.z - tyrePositionZ
);
frontRightTyre.name = "Front Right Tyre";

//**back Tyre  */
const backTyre = createRoundShape(
  car_body.x - 0.17,
  car_body.y + (tyrePositionY - 0.17),
  car_body.z + (car_body.depth/2 + 0.2) // offset is tiers diameter
);
backTyre.name = "Back Tyre";

//** orientation of the Back tyres, front grill and head lights*/
backTyre.rotation.y = 3.14 / 2;

//**head lights orientation*/
leftHeadLight.scale.set(0.25, 0.25, 0.25);
rightHeadLight.scale.set(0.25, 0.25, 0.25);
leftHeadLight.rotation.y = 3.14 / 2; // 90 degree
rightHeadLight.rotation.y = 3.14 / 2;

//**front grill */
export const frontGrill = new THREE.Group();
frontGrill.name = "Front Grill";

frontGrill.add (createGrill(), createGrill(), createGrill());
frontGrill.children.map( (grill, indx) => {grill.position.x = indx * -0.15}) // spacing the grills one apart the other

tank.add(
  car,
  frontGrill,
  rightHeadLight,
  leftHeadLight, 
  frontLeftTyre,
  frontRightTyre,
  rearLeftTyre,
  rearRightTyre,
  backTyre,
);

tank.position.y = 1; // moving the tank up to the ground level
frontLeftTyre.add(new THREE.AxesHelper(3));
frontRightTyre.add(new THREE.AxesHelper(3));
tank.add(new THREE.AxesHelper(3));
// frontGrill.add(new THREE.AxesHelper(3));

export default tank;
