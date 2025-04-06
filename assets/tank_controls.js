import tank,{frontRightTyre, frontLeftTyre} from "./tank.js";

import { tankLeftTurn, tankRightTurn } from "../tankRightTurn.js";
import { scene } from "./scene.js";

import * as THREE from "three";
import { camera } from "./camera.js";

// Improved Tank Movement Controller
const tankControls = {
    speed: 0.1,
    turnSpeed: Math.PI / 16, // Slower, more realistic turning
    wheelMaxTurn: Math.PI / 4, // 45 degrees max wheel turn
    currentWheelAngle: 0,
    movingForward: false,
    movingBackward: false,
    turningLeft: false,
    turningRight: false
  };

  function moveForward(speed) {
    tank.position.x -= Math.sin(tank.rotation.y) * speed;
    tank.position.z -= Math.cos(tank.rotation.y) * speed;
  }
  function moveBackward(speed) {
    tank.position.x += Math.sin(tank.rotation.y) * speed;
    tank.position.z += Math.cos(tank.rotation.y) * speed;
  }
  export function startMovement() {
    // Forward/Backward Movement
    if (tankControls.movingForward) {
      moveForward(tankControls.speed);
    }
    if (tankControls.movingBackward) {
      moveBackward(tankControls.speed);
    }
    // Turning Logic (only when moving)
    if (tankControls.turningLeft && (tankControls.movingForward || tankControls.movingBackward)) {
      const turnDirection = tankControls.movingForward ? 1 : -1;
      tank.rotation.y += tankControls.turnSpeed * turnDirection;
      // moveTank(tankControls.speed); // Move while turning
    }
    if (tankControls.turningRight && (tankControls.movingForward || tankControls.movingBackward)) {
      const turnDirection = tankControls.movingForward ? 1 : -1;
      tank.rotation.y -= tankControls.turnSpeed * turnDirection;
      // moveTank(tankControls.speed); // Move while turning
    }
  
    // Wheel Animation
    if (tankControls.turningLeft) {
      tankControls.currentWheelAngle = Math.min(tankControls.currentWheelAngle + 0.05, tankControls.wheelMaxTurn); // limiting the wheel turn to certain limit
    } 
    else if (tankControls.turningRight) {
      tankControls.currentWheelAngle = Math.max(tankControls.currentWheelAngle - 0.05, -tankControls.wheelMaxTurn);
    } 
    else {
      // Return wheels to center when not turning
      tankControls.currentWheelAngle *= 0;
      if (Math.abs(tankControls.currentWheelAngle) < 0) {
        tankControls.currentWheelAngle = 0;
      }
    }
  
    // Apply wheel rotation
    frontLeftTyre.rotation.y = tankControls.currentWheelAngle;
    frontRightTyre.rotation.y = tankControls.currentWheelAngle;
  
    // Update camera to follow tank
    // camera.position.x = tank.position.x;
    // camera.position.z = tank.position.z + 5;
    // camera.lookAt(tank.position);
  }
  
  // Keyboard Event Handlers
  window.addEventListener("keydown", (event) => {
    switch(event.code) {
      case "ArrowUp":
        tankControls.movingForward = true;
        break;
      case "ArrowDown":
        tankControls.movingBackward = true;
        break;
      case "ArrowLeft":
        tankControls.turningLeft = true;
        break;
      case "ArrowRight":
        tankControls.turningRight = true;
        break;
      case "Space":
        if (!tankControls.jumping) {
          tankControls.jumping = true;
          console.log("Jump initiated");
          // Add jump animation logic here
        }
        break;
    }
  });
  
  window.addEventListener("keyup", (event) => {
    switch(event.code) {
      case "ArrowUp":
        tankControls.movingForward = false;
        break;
      case "ArrowDown":
        tankControls.movingBackward = false;
        break;
      case "ArrowLeft":
        tankControls.turningLeft = false;
        break;
      case "ArrowRight":
        tankControls.turningRight = false;
        break;
      case "Space":
        tankControls.jumping = false;
        console.log("Jump ended");
        break;
    }
  });

