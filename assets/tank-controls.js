import tank,{frontRightTyre, frontLeftTyre} from "./tank.js";

const maxSteerAngle = Math.PI / 6; // 30 steering angle in radians
const tankSpeed = 0.1;

function tankMovement () {
    const steerAngle = (frontLeftTyre.rotation.y + frontRightTyre.rotation.y) / 2;
    
    
}