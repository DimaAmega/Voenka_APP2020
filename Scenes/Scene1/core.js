/////////////////////////////////
//		IMPORTS MODULES
/////////////////////////////////
import { canvasOptions as CanvasOpt } from "../../Custom_Modules/config" // config file
import { OrbitControls } from "../../Custom_Modules/OrbitControls"; 	   // controls, should to be yours cameraManager
import { init } from "../../Custom_Modules/init" 						   // initialization light position camera and etc.
import { CameraManager } from "../../Custom_Modules/CameraManager" 
import { ObjectsContainer } from "../../Custom_Modules/ObjectsContainer"
/////////////////////////////////
//		GLOBAL VARAIABLES
/////////////////////////////////
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var clock = new THREE.Clock();
var cameraManager = new CameraManager({
	"default": {
		x:5,
		y:0,
		z:-1,
		x_deg:0,
		y_deg:80,
		z_deg:0
	},
	"next": {
		x:2,
		y:2,
		z:-2,
		x_deg:10,
		y_deg:120,
		z_deg:0,
	},
},[70000]);
var Objects = new ObjectsContainer();


setTimeout(()=>{
	cameraManager.state = 'next';
},1000);


/////////////////////////////////
//		ADDITIONAL SETTINGS 
/////////////////////////////////
init(scene, cameraManager.camera, renderer);
Objects.setPathToModels("/3dModels/");

/////////////////////////////////
//	  LOAD MODEL FOR EXAMPLE
/////////////////////////////////

Objects.loadObjects(["FD_V2.glb"]).
then((Obj_arr)=>{
	// ADD ALLL MODELS ON SCENE
	for(var i = 0; i< Obj_arr.length; i++) scene.add(Obj_arr[i].obj);
	
	// // EXAMPLE ANIMATIONS
	Obj_arr[0].setOptions({loop:THREE.LoopPingPong,durationAnimation:2,}).state = "Way_mode";
});


///////////////////////////
//	    RENDER LOOP
///////////////////////////
function renderLoop(time) {
	var delta = clock.getDelta();
	cameraManager.moveCamera(time);
	renderer.render(scene, cameraManager.camera);
	Objects.updateAnimations(delta);
	requestAnimationFrame(renderLoop);
};
renderLoop();