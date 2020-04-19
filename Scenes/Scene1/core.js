/////////////////////////////////
//		IMPORTS MODULES
/////////////////////////////////
import { canvasOptions as CanvasOpt } from "../../Custom_Modules/config"; // config file
import { OrbitControls } from "../../Custom_Modules/OrbitControls"; // controls, should to be yours cameraManager
import { init } from "../../Custom_Modules/init"; // initialization light position camera and etc.
import { CameraManager } from "../../Custom_Modules/CameraManager";
import { ObjectsContainer } from "../../Custom_Modules/ObjectsContainer";
import {
  stateMachine,
  statesDiscriptions,
  objectStateManager,
  localObjectStates,
} from "../../Custom_Modules/testStateMacineFramework";
import { SmoothShading } from "../../build/three.module";
// import { Pickermanager} from "../../"

var PickerManagerClass = require("../../temporary/PickerManager");

// import {statesDiscriptions,objectStateManager} from "../../Custom_Modules/statesDObjectSMMiddleware"
// import { tips } from "../../temporary/tips";
// var t = new tips();
// t.show();
// window.t = t;
/////////////////////////////////
//		GLOBAL VARAIABLES
/////////////////////////////////
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
  powerPreference: "high-performance",
  antialias: true,
  precision: "high",
});
window.renderer = renderer;
var clock = new THREE.Clock();
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
var controls = new OrbitControls(camera, renderer.domElement);

// PICKER MANAGer TEST

var pickerManagerStatesString = "pickerManagerStates";

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

var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
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
Objects.loadObjects([
  "Main_part.gltf",
  "base.gltf",
  "Cube.gltf",
  "Cube_1.gltf",
  "Cube_2.gltf",
  "Cube_3.gltf",
  "Cube_4.gltf",
  "Cube_5.gltf",
  "Cube_6.gltf",
  "Cube_7.gltf",
  "Cube_8.gltf",
  "Anvil.gltf",
  "Lock1.gltf",
  "Oil_Tank.gltf",
  "ppo_lock.gltf",
  "Support1.gltf",
  "Support2.gltf",
  "Support3.gltf",
  "Support4.gltf",
  "ValveTopR.gltf",
  "Back_door.gltf",
  "Cap_of_PPO.gltf",
  "Cap_of_PPO_tr.gltf",
  "Front_door.gltf",
  "Power_checker.gltf",
  "TPK_small_very.gltf",
])
  // Objects.loadObjects(["Back_door.gltf"])
  .then((Obj_arr) => {
    for (var obj of Obj_arr) {
      scene.add(obj.obj);
      window.Obj_arr = Obj_arr;
      // obj.setOptions({ loop: false, durationAnimation: 1 });
    }
    console.log(Obj_arr);
    // WE HAVE OUR OBJECTS
    var SM = new objectStateManager(Obj_arr, statesDiscriptions, 0, true);
    var pickerManager = new PickerManagerClass(
      renderer.domElement,
      camera,
      scene,
      localObjectStates[pickerManagerStatesString],
      SM,
      "firstState"
    );
    SM.stateMashine = stateMachine;

    SM.pickerManager = pickerManager;
    if (SM.isInitialaized() && pickerManager.isInitialaized()) {
      pickerManager.startToCheckIntersects();
    }
    // SEND TO GLOBAL SCOPE
    window.SM = SM;
  });
///////////////////////////
//	    RENDER LOOP
///////////////////////////
function renderLoop(time) {
  var delta = clock.getDelta();
  controls.update();
  Objects.updateAnimations(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(renderLoop);
}

renderLoop();
