/////////////////////////////////
//		IMPORTS MODULES
/////////////////////////////////
import { canvasOptions as CanvasOpt } from "../../Custom_Modules/config" // config file
import { OrbitControls } from "../../Custom_Modules/OrbitControls"; 	   // controls, should to be yours cameraManager
import { init } from "../../Custom_Modules/init" 						   // initialization light position camera and etc.
import { loadObject } from "../../Custom_Modules/loadObject" 			   // custom loader, which selects animations from an object
import { CameraManager } from "../../Custom_Modules/CameraManager" 
/////////////////////////////////
//		GLOBAL VARAIABLES
/////////////////////////////////
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(CanvasOpt.fov, CanvasOpt.aspect, CanvasOpt.near, CanvasOpt.far);
var renderer = new THREE.WebGLRenderer();
// var controls = new OrbitControls(camera, renderer.domElement);
var clock = new THREE.Clock();
let cameraManager = new CameraManager({
	"default": {
		x:0,
		y:0,
		z:5,
		x_deg:0,
		y_deg:0,
		z_deg:0
	},
	"next1": {
		x:4,
		y:0,
		z:0,
		x_deg:0,
		y_deg:90,
		z_deg:0
	},
	"next2": {
		x:0,
		y:0,
		z:-5,
		x_deg:0,
		y_deg:180,
		z_deg:0
	},
},[200000]);

setTimeout(()=>{
	cameraManager.state = "next1";
},3000)
setTimeout(()=>{
	cameraManager.state = "next2";
},7000)
/////////////////////////////////
//		ADDITIONAL SETTINGS 
/////////////////////////////////
init(scene, cameraManager.camera, renderer);
var Objects_arr = [];

/////////////////////////////////
//	  LOAD MODEL FOR EXAMPLE
/////////////////////////////////
loadObject("3.gltf", { duration: 2, loop: true }).then((res) => {
	res.animations_arr[1].play();
	Objects_arr.push(res);
	scene.add(res.obj);
})

///////////////////////////
//	    RENDER LOOP
///////////////////////////
function renderLoop(time) {
	var delta = clock.getDelta();
	Objects_arr.forEach((el) => { el.animationMixer.update(delta) });
	cameraManager.moveCamera(time);
	renderer.render(scene, cameraManager.camera);
	requestAnimationFrame(renderLoop);
};
renderLoop();

