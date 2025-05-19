import lifter from "./liftModule";
import { scene } from "./scene";
import tank from "./tank";
import { GridHelper } from "../help-worker/helpers";
tank.userData.attachable = true;
let keyPressHandler;
let moduleAttach = () => {
//** activate module when car is in the range, check whether the tank is attachable, 
if(tank.position.distanceTo(lifter.position) < 5 && lifter.userData.attachable){
    scene.add( GridHelper)
    if(!keyPressHandler){ // add event listener for keypress need to deactivate later
        keyPressHandler = (evn) => {
            if(evn.key == 'r'){
                tank.userData.attachable ? moveTillAttach(tank, lifter) : undefined; // this will move the tank to the lift module position
            }
        }
        document.addEventListener('keypress', keyPressHandler )
    }
}else{
    scene.remove( GridHelper);
    if(keyPressHandler){
        document.removeEventListener('keypress', keyPressHandler )
        keyPressHandler = undefined;
    }
}
//write detaching logic */
}
function findLocation(module, car){
    if (module.position.x > car.position.x){
        'module in positive x quadrant'
    }
    if (module.position.z > car.position.z){
        'module in positive z quadrant'
    }
    
}

// grab location and check whether need to move, create moving logic*
export function moveTillAttach(car, module){
    // Check if the car is already at the module's position
    const carPosition = car.position.clone();
    const modulePosition = module.position.clone();
    if( carPosition.equals(modulePosition)) { // validate whether car and module are in same position
        // module.parent.remove(scene.getObjectByName('GridHelper'));
        // module.removeFromParent();
        (scene.getObjectByName('tank').add(module));
        module.userData.attachable = false;
        car.userData.attachable = false;
        console.log('movetill part :',scene);
    }else {
        const distance = (carPosition.distanceTo(modulePosition));
        console.log('distance: ', distance);
        const direction = modulePosition.sub(carPosition).normalize();
        console.log('direction: ', direction.toArray());
        const speed = 0.1; // Adjust the movement speed as needed
        const miniSpeedToMove = Math.min(speed, distance);
        
        //move till target location, attach module,
        moveTo_target( car, module, direction, miniSpeedToMove);
    }
}
function moveTo_target(car, module, direction, miniSpeedToMove) {

    if(miniSpeedToMove <= 0) {
        // module.clear();
        // module.removeFromParent();
        console.log('move target part : ', scene);

        return; // Stop if the target is reached
        }
//moving logic applied to car
    if(module) car.position.add(direction.multiplyScalar(miniSpeedToMove));

// animation till module attachment
    // window.requestAnimationFrame(() => moveTillAttach(car, module))
    moveTillAttach(car, module)
}
export default moduleAttach;