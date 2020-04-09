/////////////////////////////////
//		IMPORTS MODULES
/////////////////////////////////
import { canvasOptions as CanvasOpt } from "../../Custom_Modules/config"; // config file
import { OrbitControls } from "../../Custom_Modules/OrbitControls"; // controls, should to be yours cameraManager
import { init } from "../../Custom_Modules/init"; // initialization light position camera and etc.
import { CameraManager } from "../../Custom_Modules/CameraManager";
import { ObjectsContainer } from "../../Custom_Modules/ObjectsContainer";
import {statesDiscriptions,objectStateManager} from "../../Custom_Modules/statesDObjectSMMiddleware"
import {tips} from "../../temporary/tips"
var t = new tips();
t.show();
window.t = t;
/////////////////////////////////
//		GLOBAL VARAIABLES
/////////////////////////////////
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({powerPreference:"high-performance",antialias:true,precision:"highp"});
window.renderer = renderer;
var clock = new THREE.Clock();
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
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
Objects.loadObjects(["Back_door.gltf","Cap_of_PPO.gltf","Front_door.gltf","Main_part.gltf","Cilinder.glb"]) 
// Objects.loadObjects(["Back_door.gltf"])                                            
.then(Obj_arr => {
  for (var obj of Obj_arr) {
    scene.add(obj.obj);
    window.Obj_arr = Obj_arr
    // obj.setOptions({ loop: false, durationAnimation: 1 });
  }
  // WE HAVE OUR OBJECT
  SM = new objectStateManager(Obj_arr,statesDiscriptions);
  // var C = new Controller(SM)
  // C.launch(options)
  // SET EVENTS ON OBJECTS
  // SEND TO GLOBAL SCOPE
  window.SM = SM;
  /*
  Obj_arr[1].applyState("Open");
  Obj_arr[1].applyState("Flip");
  Obj_arr[2].applyState("Flip_lock");
  */
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
