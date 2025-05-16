import lifter from "./liftModule";
import tank from "./tank";

function findLocation(module, target){
    if (module.position.x > target.position.x){
        'module in positive x quadrant'
    }
    if (module.position.z > target.position.z){
        'module in positive z quadrant'
    }

}

export function moveTill(target, module){
    const targetPosition = target.position.clone();
    const modulePosition = module.position.clone();
    const distance = (targetPosition.distanceTo(modulePosition));
    const direction = modulePosition.sub(targetPosition).normalize();
    console.log('direction: ', direction);
    const speed = 0.1; // Adjust the speed as needed
    const distanceToMove = Math.min(speed, distance);
    moveTarget(direction, distanceToMove, target, module)
    
}
function moveTarget(direction, distanceToMove, target, module) {
    if(distanceToMove <= 0) return; // Stop if the target is reached
    target.position.add(direction.multiplyScalar(distanceToMove));
    window.requestAnimationFrame(() => moveTill(target, module))
}