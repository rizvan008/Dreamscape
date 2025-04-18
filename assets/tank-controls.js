import tank,{frontRightTyre, frontLeftTyre} from "./tank.js";
import * as THREE from "three";

let steeringAngle = 0; // Initial steering angle
let maxSteering = Math.PI / 6; // 0.5235 Maximum steering angle (30 degrees in radians)
let radiant = Math.PI / 180; // 0.01744 Radian to degree conversion factor
let steerSpeed = 0.3; //  steer till angle 33^ [ (0.3 / 0.5235) / 0.01744 ] = 33^  here 0.01744 radiant is one degree angle
let steerLeft = steeringAngle;
let steerRight = steeringAngle;
// let wheelTurnAngle = 0

let leftTurn = false; 
let rightTurn = false;
let forward = false;
let backward = false;
let tankSpeed = 0.1; // Speed of the tank

document.addEventListener("keydown", (event) => {
  event.code == "ArrowLeft" ? leftTurn = true : 
  event.code == "ArrowRight" ? rightTurn = true :
  event.code == "ArrowUp" ? forward = true :
  event.code == "ArrowDown" ? backward = true :  console.log('keydown: ', event.code);
});
// document.addEventListener("keydown", (event) => {
//   event.code == "ArrowLeft" ? leftTurn = true : leftTurn = false;
//   event.code == "ArrowRight" ? rightTurn = true : rightTurn = false;
//   event.code == "ArrowUp" ? forward = true : forward = false;
//   event.code == "ArrowDown" ? backward = true : backward = false;
// });

// Resetting the steering angle when key is released
// document.addEventListener("keyup", (event) => {
//   if(event.code == "ArrowLeft") leftTurn = false;  
//   else if(event.code == "ArrowRight") rightTurn = false;
//   else if(event.code == "ArrowUp") forward = false;
//   else if(event.code == "ArrowDown") backward = false;
//   else console.log('keyup.code: ', event.code);
// });

// document.addEventListener("keyup", (event) => {
//   if(event.code == "ArrowLeft") leftTurn = false;  
//   if(event.code == "ArrowRight") rightTurn = false;
//   if(event.code == "ArrowUp") forward = false;
//   if(event.code == "ArrowDown") backward = false;
// });

// Function to turn the steering based on the steering angle
function turnSteeringWheel ( steeringAngle, wheelTurnAngle = 0 ){
  //wheel turning slowly at start and then become faster
  let angularMoment =    steerSpeed / Math.tan(steeringAngle)
  wheelTurnAngle =  Math.sin(angularMoment); // Calculate the wheelTurn angle (0^ to 30^) based on the steering angle from 0 to PI/2  45^ or less
  frontLeftTyre.rotation.y = wheelTurnAngle; // Rotate the left wheel
  frontRightTyre.rotation.y = wheelTurnAngle; // Rotate the right wheel
}

export function startMovement() {
  // Update the tank position based on the steering angle and movement direction
  if(forward){
    if (steerLeft || steerRight) {
      // move the tank body based on the steering angle
      let direction = new THREE.Vector3(Math.sin(steeringAngle), 0, Math.cos(steeringAngle)); // Calculate the direction vector based on the steering angle
      direction.normalize(); // Normalize the direction vector
      tank.position.add(direction.multiplyScalar(tankSpeed));
      // Rotate the tank body
      tank.rotation.y = steeringAngle; // Rotate the tank body based on the steering angle *** check if need Math.Sin(steerSpeed / Math.tan(steeringAngle)) or not
      console.log('tank body rotates : F');
    }

    tank.position.x -= Math.sin(steeringAngle) * tankSpeed; // Move forward based on the steering angle
    tank.position.z -= Math.cos(steeringAngle) * tankSpeed; // Move forward based on the steering angle
  }
  
  if(backward){
    if (steerLeft || steerRight) {
      // Rotate the tank body based on the steering angle
      tank.rotation.y -= Math.sin(steeringAngle) ; // Rotate the tank body *** check if need Math.Sin(steerSpeed / Math.tan(steeringAngle)) or not
      console.log('tank body rotates: B');
      
    }
    tank.position.z += Math.cos(steeringAngle) * tankSpeed; // Move backward based on the steering angle
    tank.position.x += Math.sin(steeringAngle) * tankSpeed; // Move backward based on the steering angle
  }
  // If the tank is turning left or right, set the angle to maxSteering or negative maxSteering
  if(leftTurn) {
    // let steerLeft = steer;
    steerLeft = Math.min(steerLeft + radiant, maxSteering); // Increment the angle
    steeringAngle = steerLeft; // Update the steering angle
    turnSteeringWheel ( steerLeft );
  }
  if(rightTurn) {
    // let steerRight = steer;
    steerRight = Math.max(steerRight - radiant, - maxSteering); // decrement the angle
    steeringAngle = steerRight; // Update the steering angle
    turnSteeringWheel ( steerRight );
  }
  if(!leftTurn && !rightTurn) {
    // Gradually reduce the steering angle when no key is pressed

    if (steeringAngle < 0){
      steeringAngle = Math.min(steeringAngle + 0.01744, 0);
    }
      else if (steeringAngle > 0){
      steeringAngle = Math.max(steeringAngle - 0.01744, 0);
    }
    // Reset the steering angle when no key is pressed
    steerLeft = steeringAngle; 
    steerRight = steeringAngle;
    turnSteeringWheel (steeringAngle); // Reset the steering angle when no key is pressed
  }
}

  const acceleration = 0.01; // Acceleration rate
  const deceleration = 0.02; // Deceleration rate
  
  
    // Calculate movement direction (combines forward + steering)

    // Update tank position

    // Only rotate tank body if wheels are turned (Ackermann steering)

 // Rotate tank body around turn center

  // Rotate all wheels proportionally to movement
// Outer wheels travel faster than inner wheels


// In your controls:

/**
 key press actions captured by the event listener
 wheel turning left or right
 set maxSteeringAngle to the left or right
 initial angle is 0 then increment or decrement the angle by the maxSteeringAngle
 given rotations to the wheels

 forward and backward movement
 check for turns state
 initial speed is 0 then increment or decrement the speed by the acceleration or deceleration rate
 max speed is 1.57 (90 degrees in radians)
 */