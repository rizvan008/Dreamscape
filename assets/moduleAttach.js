import lifter from "./liftModule";
import { scene } from "./scene";
import tank from "./tank";

function findLocation(module, car){
    if (module.position.x > car.position.x){
        'module in positive x quadrant'
    }
    if (module.position.z > car.position.z){
        'module in positive z quadrant'
    }

}

export function moveTillAttach(car, module){
    // Check if the car is already at the module's position
    const carPosition = car.position.clone();
    const modulePosition = module.position.clone();
    if( carPosition.equals(modulePosition)) { // validate whether car and module are in same position
        module.clear();
        // module.parent.clear();
        module.parent.remove(scene.getObjectByName('GridHelper'));
        // module.parent.removeFromParent();
        module.parent.add(scene.getObjectByName('tank'));
        console.log('movetill part :',scene);
    }else {
        const distance = (carPosition.distanceTo(modulePosition));
        console.log('distance: ', distance);
        const direction = modulePosition.sub(carPosition).normalize();
        console.log('direction: ', direction.toArray());
        const speed = 0.1; // Adjust the movement speed as needed
        const miniSpeedToMove = Math.min(speed, distance);

        moveTo_target( car, module, direction, miniSpeedToMove);
    }
}
function moveTo_target(car, module, direction, miniSpeedToMove) {

    if(miniSpeedToMove <= 0) {
        // module.parent.clear();
        // module.parent.remove(scene);
        module.parent.removeFromParent();
        // module.parent.add(car);
        console.log('move target part : ', scene);

        return; // Stop if the target is reached
        }
//moving logic applied to car
    car.position.add(direction.multiplyScalar(miniSpeedToMove));
// animation till module attachment
    window.requestAnimationFrame(() => moveTillAttach(car, module))
}