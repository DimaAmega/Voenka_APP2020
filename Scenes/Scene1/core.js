/////////////////////////////////
//		IMPORTS MODULES
/////////////////////////////////
import { canvasOptions as CanvasOpt } from "../../Custom_Modules/config"; // config file
import { OrbitControls } from "../../Custom_Modules/OrbitControls"; // controls, should to be yours cameraManager
import { init } from "../../Custom_Modules/init"; // initialization light position camera and etc.
import { CameraManager } from "../../Custom_Modules/CameraManager";
import { ObjectsContainer } from "../../Custom_Modules/ObjectsContainer";
import {statesDiscriptions,objectStateManager} from "../../Custom_Modules/statesDObjectSMMiddleware"
/////////////////////////////////
//		GLOBAL VARAIABLES
/////////////////////////////////
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var clock = new THREE.Clock();
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
var SM; // STATE MANAGER
var controls = new OrbitControls(camera, renderer.domElement);
var Objects = new ObjectsContainer();
Objects.setPathToModels("/3dModels/");

/////////////////////////////////
//		ADDITIONAL SETTINGS
/////////////////////////////////
init(scene, camera, renderer);
/////////////////////////////////
//	       LOAD OBJECTS
/////////////////////////////////
Objects.loadObjects(["Cilinder.glb", "Torus.glb", "Cube.glb"])
.then(Obj_arr => {
  for (var obj of Obj_arr) {
    scene.add(obj.obj);
    // obj.setOptions({ loop: false, durationAnimation: 1 });
  }
  // WE HAVE OUR OBJECT
  SM = new objectStateManager(Obj_arr,statesDiscriptions);
  // var C = new Controller(SM)
  // C.launch(options)
  // SET EVENTS ON OBJECTS
  // SEND TO GLOBAL SCOPE
  window.SM = SM;
});
///////////////////////////
//	    RENDER LOOP
///////////////////////////
function renderLoop(time) {
  var delta = clock.getDelta();
  controls.update();
  renderer.render(scene, camera);
  Objects.updateAnimations(delta);
  requestAnimationFrame(renderLoop);
}
renderLoop();
