/////////////////////////////////
//		IMPORTS MODULES
/////////////////////////////////
import { canvasOptions as CanvasOpt } from "../../Custom_Modules/config"; // config file
import { OrbitControls } from "../../Custom_Modules/OrbitControls"; // controls, should to be yours cameraManager
import { init } from "../../Custom_Modules/init"; // initialization light position camera and etc.
import { CameraManager } from "../../Custom_Modules/CameraManager";
import { ObjectsContainer } from "../../Custom_Modules/ObjectsContainer";
<<<<<<< HEAD
import {stateMachine,statesDiscriptions,objectStateManager,localObjectStates} from "../../Custom_Modules/testStateMacineFramework"
import { SmoothShading } from "../../build/three.module";
// import { Pickermanager} from "../../"

var PickerManagerClass = require("../../temporary/PickerManager");

=======
import {statesDiscriptions,objectStateManager} from "../../Custom_Modules/statesDObjectSMMiddleware"
import {tips} from "../../temporary/tips"
var t = new tips();
t.show();
window.t = t;
>>>>>>> 353ec2c9ebf4a27939008c590119ce532151ec79
/////////////////////////////////
//		GLOBAL VARAIABLES
/////////////////////////////////
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({powerPreference:"high-performance",antialias:true,precision:"highp"});
window.renderer = renderer;
var clock = new THREE.Clock();
<<<<<<< HEAD
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
var controls = new OrbitControls(camera, renderer.domElement);


// PICKER MANAGer TEST

var pickerManagerStatesString = "pickerManagerStates";

console.log(localObjectStates);

camera.position.set(0, 1, 5);
controls.update();
// var cameraManager = new CameraManager({
// 	"default": {
// 		x:5,
// 		y:0,
// 		z:-1,
// 		x_deg:0,
// 		y_deg:80,
// 		z_deg:0
// 	},
// 	"next": {
// 		x:2,
// 		y:2,
// 		z:-2,
// 		x_deg:10,
// 		y_deg:120,
// 		z_deg:0,
// 	},
// },[70000]);





=======
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
var SM; // STATE MANAGER
var controls = new OrbitControls(camera, renderer.domElement);
>>>>>>> 353ec2c9ebf4a27939008c590119ce532151ec79
var Objects = new ObjectsContainer();
Objects.setPathToModels("/3dModels/");

/////////////////////////////////
//		ADDITIONAL SETTINGS
/////////////////////////////////
init(scene, camera, renderer);
/////////////////////////////////
//	       LOAD OBJECTS
/////////////////////////////////
Objects.loadObjects(["Left_valwe.gltf","Back_door.gltf","Cap_of_PPO.gltf","Front_door.gltf","Main_part.gltf","Cilinder.glb"]) 
// Objects.loadObjects(["Back_door.gltf"])                                            
.then(Obj_arr => {
  for (var obj of Obj_arr) {
    scene.add(obj.obj);
    window.Obj_arr = Obj_arr
    // obj.setOptions({ loop: false, durationAnimation: 1 });
  }
<<<<<<< HEAD
  console.log(Obj_arr);
  // WE HAVE OUR OBJECTS
  var SM = new objectStateManager(Obj_arr,statesDiscriptions,0,true);
  var pickerManager = new PickerManagerClass(renderer.domElement, camera,
     scene, localObjectStates[pickerManagerStatesString], SM);
  SM.stateMashine = stateMachine;
  
  SM.pickerManager = pickerManager;
  console.log("HELLO");
  if (SM.isInitialaized() && pickerManager.isInitialaized())
  {
    console.log("HELLO");
  }
=======
  // WE HAVE OUR OBJECT
  SM = new objectStateManager(Obj_arr,statesDiscriptions);
  // var C = new Controller(SM)
  // C.launch(options)
  // SET EVENTS ON OBJECTS
>>>>>>> 353ec2c9ebf4a27939008c590119ce532151ec79
  // SEND TO GLOBAL SCOPE
  window.SM = SM;
<<<<<<< HEAD
=======
  /*
  Obj_arr[1].applyState("Open");
  Obj_arr[1].applyState("Flip");
  Obj_arr[2].applyState("Flip_lock");
  */
>>>>>>> 353ec2c9ebf4a27939008c590119ce532151ec79
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