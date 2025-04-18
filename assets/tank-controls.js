import tank,{frontRightTyre, frontLeftTyre} from "./tank.js";
import * as THREE from "three";
let steer = 0; // Initial steering angle
let maxSteer = Math.PI / 6; // 0.5235 Maximum steering angle (30 degrees in radians)
let leftTurn = false; 
let rightTurn = false;
let forward = false;
let backward = false;
let steerLeft = steer;
let steerRight = steer;
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

// Reset the steering angle when key is released
document.addEventListener("keyup", (event) => {
  if(event.code == "ArrowLeft") leftTurn = false;  
  else if(event.code == "ArrowRight") rightTurn = false;
  else if(event.code == "ArrowUp") forward = false;
  else if(event.code == "ArrowDown") backward = false;
});
// document.addEventListener("keyup", (event) => {
//   if(event.code == "ArrowLeft") leftTurn = false;  
//   if(event.code == "ArrowRight") rightTurn = false;
//   if(event.code == "ArrowUp") forward = false;
//   if(event.code == "ArrowDown") backward = false;
// });

// Function to turn the steering based on the steering angle
function turnSteering ( steer, turnAngle = 0 ){
  turnAngle =  Math.sin(steer); // Calculate the turn angle based on the steering angle
  frontLeftTyre.rotation.y = turnAngle; // Rotate the left wheel
  frontRightTyre.rotation.y = turnAngle; // Rotate the right wheel
}

export function startMovement() {
  // Update the tank position based on the steering angle and movement direction
  if(forward){
    if (steerLeft || steerRight) {
      // Rotate the tank body based on the steering angle
      let direction = new THREE.Vector3(Math.sin(steer), 0, Math.cos(steer));
      tank.position.add(direction.multiplyScalar(tankSpeed));
      // Rotate the tank body
      
      console.log('test f: ');
    }
    tank.position.x -= Math.sin(steer) * 0.1; // Move forward based on the steering angle
    tank.position.z -= Math.cos(steer) * 0.1; // Move forward based on the steering angle
  }
  
  if(backward){
    if (steerLeft || steerRight) {
      // Rotate the tank body based on the steering angle
      tank.rotation.y -= Math.sin(steer) * 0.1; // Rotate the tank body
      console.log('test B: ');
      
    }
    tank.position.z += Math.cos(steer) * 0.1; // Move backward based on the steering angle
    tank.position.x += Math.sin(steer) * 0.1; // Move backward based on the steering angle
  }
  // If the tank is turning left or right, set the angle to maxSteer or -maxSteer
  if(leftTurn) {
    // let steerLeft = steer;
    steerLeft = Math.min(steerLeft + 0.01, maxSteer); // Increment the angle
    steer = steerLeft; // Update the steering angle
    turnSteering ( steerLeft );
  }
  if(rightTurn) {
    // let steerRight = steer;
    steerRight = Math.max(steerRight - 0.01, - maxSteer); // decrement the angle
    steer = steerRight; // Update the steering angle
    turnSteering ( steerRight );
  }
  if (leftTurn || rightTurn) {

    
  }
  else {
    if (steer > 0){
      steer = Math.max(steer - 0.01744, 0);
    }
    if (steer < 0){
      steer = Math.min(steer + 0.01744, 0);
    }
    // Reset the steering angle when no key is pressed
    steerLeft = steer; 
    steerRight = steer;
    turnSteering(steer); // Reset the steering angle when no key is pressed
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
 set maxSteerAngle to the left or right
 initial angle is 0 then increment or decrement the angle by the maxSteerAngle
 given rotations to the wheels

 forward and backward movement
 check for turns state
 initial speed is 0 then increment or decrement the speed by the acceleration or deceleration rate
 max speed is 1.57 (90 degrees in radians)
 */