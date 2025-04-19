import tank,{frontRightTyre, frontLeftTyre, rearLeftTyre} from "./tank.js";
import * as THREE from "three";

let steeringAngle = 0; // Initial steering angle
let maxSteering = Math.PI / 6; // 0.5235 Maximum steering angle (30 degrees in radians)
let radiant = Math.PI / 180; // 0.01744 Radian to degree conversion factor
let turnRadius = .1; // Turning radius of the tank
// frontLeftTyre.position.distanceTo(rearLeftTyre.position)/8; //turning radius should be 0.8 or less
let steerLeft = steeringAngle; //increase the angle
let steerRight = steeringAngle; //decrease the angle
// let wheelTurnAngle = 0

let leftTurn = false; 
let rightTurn = false;
let forward = false;
let backward = false;
let tankSpeed = 0.1; // Speed of the tank

//** Function to turn the steering based on the steering angle */
function turnSteeringWheel ( steeringAngle, wheelTurnAngle = 0 ){
  wheelTurnAngle =  steeringAngle; // wheelTurn angle (0^ to 30^) based on the steering angle from 0 to PI/2  45^ or less
  frontLeftTyre.rotation.y = wheelTurnAngle; // Rotate the left wheel
  frontRightTyre.rotation.y = wheelTurnAngle; // Rotate the right wheel
}

export function startMovement() {
  //** Move the tank forward or backward based on the steering angle */
if (forward) {
  // tank.position.x -= Math.sin(steeringAngle) * tankSpeed; // Move forward based on the steering angle
  // tank.position.z -= Math.cos(steeringAngle) * tankSpeed; // Move forward based on the steering angle
  
  //** move the tank forward, based on the steering angle  */
  let fdirection = new THREE.Vector3(-Math.sin(tank.rotation.y), 0, -Math.cos(tank.rotation.y)); // Calculate the direction vector based on the steering angle
  fdirection.normalize(); // Normalize the direction vector
  tank.position.add(fdirection.multiplyScalar(tankSpeed));
}
if (backward) {
  // tank.position.x += Math.sin(steeringAngle) * tankSpeed; // Move backward based on the steering angle
  // tank.position.z += Math.cos(steeringAngle) * tankSpeed; // Move backward based on the steering angle
  
  //** move the tank body based on the steering angle */
  let bdirection = new THREE.Vector3(Math.sin(tank.rotation.y), 0, Math.cos(tank.rotation.y)); // Calculate the direction vector based on the steering angle
  bdirection.normalize(); // Normalize the direction vector
  tank.position.add(bdirection.multiplyScalar(tankSpeed));
}

//** Turning Tank direction based on front wheels turn */
  // Only rotate tank body if wheels are turned (Ackermann steering), wheel turning slowly at start and then become faster
  let angularMoment =    turnRadius * Math.tan(steeringAngle)

if (forward && (steerLeft || steerRight)) {
  // Rotate the tank body
  tank.rotation.y += angularMoment ; // (Ackermann steering)
  // tank.rotation.y += turnradius * steeringAngle ; // Rotate the tank body based on the steering angle 
}
  
if (backward && (steerLeft || steerRight)) {
  // Rotate the tank body based on the steering angle
  tank.rotation.y -=  angularMoment; // Rotate the tank body *** check if need Math.Sin(steerSpeed / Math.tan(steeringAngle)) or not
  // console.log('tank body rotates: B', tank.rotation.y);
}

//** Turning wheel left or right and set the angle to maxSteering or negative maxSteering */
if (leftTurn) {
  // let steerLeft = steer;
  steerLeft = Math.min(steerLeft + radiant, maxSteering); // Increment the angle
  steeringAngle = steerLeft; // Update the steering angle
  turnSteeringWheel ( steerLeft );
}
if (rightTurn) {
  // test = decrement (steerRight, - maxSteering, radiant, turnSteeringWheel);
  // let steerRight = steer;
  steerRight = Math.max(steerRight - radiant, - maxSteering); // decrement the angle
  steeringAngle = steerRight; // Update the steering angle
  turnSteeringWheel ( steerRight );
}

//** Resetting (Gradually reduce the steering angle to 0) when L/R arrow key not pressed */
if (!leftTurn && !rightTurn) {
   if (steeringAngle < 0){
    steeringAngle = Math.min(steeringAngle + radiant, 0);
  }
  else if (steeringAngle > 0){
   steeringAngle = Math.max(steeringAngle - radiant, 0);
  }
  // Reset the steering angle
  steerLeft = steeringAngle; 
  steerRight = steeringAngle;
  turnSteeringWheel (steeringAngle);

};

}

//** User Control actions :- key press actions captured by the event listener*/

// document.addEventListener("keydown", (event) => {
//   event.code == "ArrowLeft" 
//   ?leftTurn = true 
//   :event.code == "ArrowRight" 
//   ?rightTurn = true 
//   :event.code == "ArrowUp" 
//   ?forward = true 
//   :event.code == "ArrowDown" 
//   ?backward = true 
//   :console.log('keydown: ', event.code);
// });

document.addEventListener("keydown", (event) => {
  if(event.code == "ArrowLeft") leftTurn = true;  
  if(event.code == "ArrowRight") rightTurn = true;
  if(event.code == "ArrowUp") forward = true;
  if(event.code == "ArrowDown") backward = true;
});

// Resetting the steering angle when key is released
// document.addEventListener("keyup", (event) => {
//   if(event.code == "ArrowLeft") leftTurn = false;  
//   else if(event.code == "ArrowRight") rightTurn = false;
//   else if(event.code == "ArrowUp") forward = false;
//   else if(event.code == "ArrowDown") backward = false;
//   else console.log('keyup.code: ', event.code);
// });

document.addEventListener("keyup", (event) => {
  if(event.code == "ArrowLeft") leftTurn = false;  
  if(event.code == "ArrowRight") rightTurn = false;
  if(event.code == "ArrowUp") forward = false;
  if(event.code == "ArrowDown") backward = false;
});

//** For testing purpose */
  let test;
function increment(currentValue, limit, step, callback) {
  let newValue = Math.min(currentValue + step, limit);
  // if (callback) {
    return callback(newValue);
  // }
  // return start;
}

function decrement (currentValue, limit, step, callback) {
   const newValue = Math.max(currentValue - step, limit);
  if (callback) {
    return  callback (newValue);
  }
  return start;
}

  const acceleration = 0.01; // Acceleration rate
  const deceleration = 0.02; // Deceleration rate

// Rotate tank body around turn center
// Rotate all wheels proportionally to movement
// Outer wheels travel faster than inner wheels


// In your controls:
//** initial speed is 0 then increment or decrement the speed by the acceleration or deceleration rate
 // max speed is 1.57 (90 degrees in radians) */