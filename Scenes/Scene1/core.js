/////////////////////////////////
//		IMPORTS MODULES
/////////////////////////////////
import { canvasOptions as CanvasOpt } from "../../Custom_Modules/config"; // config file
import { OrbitControls } from "../../Custom_Modules/OrbitControls"; // controls, should to be yours cameraManager
import { init } from "../../Custom_Modules/init"; // initialization light position camera and etc.
import { CameraManager } from "../../Custom_Modules/CameraManager";
import { ObjectsContainer } from "../../Custom_Modules/ObjectsContainer";
import {stateMachine,statesDiscriptions,objectStateManager,localObjectStates} from "../../Custom_Modules/testStateMacineFramework"
import { SmoothShading } from "../../build/three.module";
// import { Pickermanager} from "../../"

var PickerManagerClass = require("../../temporary/PickerManager");

/////////////////////////////////
//		GLOBAL VARAIABLES
/////////////////////////////////
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var clock = new THREE.Clock();
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





var Objects = new ObjectsContainer();

/////////////////////////////////
//		ADDITIONAL SETTINGS
/////////////////////////////////

init(scene, camera, renderer);
Objects.setPathToModels("/3dModels/");

/////////////////////////////////
//	  LOAD MODEL FOR EXAMPLE
////////////////////////////////

Objects.loadObjects(["Cilinder.glb", "Torus.glb", "Cube.glb"]).then(Obj_arr => {
  // ADD ALLL MODELS ON SCENE
  for (var obj of Obj_arr) {
    scene.add(obj.obj);
    obj.setOptions({ loop: true, durationAnimation: 1 });
  }
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
  // SEND TO GLOBAL SCOPE
  window.Obj_arr = Obj_arr;
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