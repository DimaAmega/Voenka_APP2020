/////////////////////////////////
//		IMPORTS MODULES
/////////////////////////////////
import {canvasOptions as CanvasOpt} from "../../Custom_Modules/config" // config file
import {OrbitControls} from "../../Custom_Modules/OrbitControls"; 	   // controls, should to be yours cameraManager
import {init} from "../../Custom_Modules/init" 						   // initialization light position camera and etc.
import {loadObject} from "../../Custom_Modules/loadObject" 			   // custom loader, which selects animations from an object


/////////////////////////////////
//		GLOBAL VARAIABLES
/////////////////////////////////
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( CanvasOpt.fov, CanvasOpt.aspect, CanvasOpt.near, CanvasOpt.far );
var renderer = new THREE.WebGLRenderer();
var controls = new OrbitControls( camera, renderer.domElement );
var clock = new THREE.Clock();
/////////////////////////////////
//		ADDITIONAL SETTINGS 
/////////////////////////////////
init(scene,camera,renderer);
var Objects_arr = [];

/////////////////////////////////
//	  LOAD MODEL FOR EXAMPLE
/////////////////////////////////
loadObject("3.gltf",{duration:1,loop:false}).then((res)=>{
	res.animations_arr[0].play();
	Objects_arr.push(res);
	scene.add(res.obj);
})
// var res = loader.load(
// 	'/3dModels/3.gltf',																																																									
// 	(Obj)=>{scene.add( loadObject(Obj,"3",Objects_arr))},
// 	(xhr)=>{console.log( ( Math.floor(xhr.loaded / xhr.total * 100 )) + '% loaded')},
// 	(error)=>{console.error( error);}
// );
// console.log(res);
///////////////////////////
//	    RENDER LOOP
///////////////////////////
function renderLoop() {
	var delta = clock.getDelta();
	Objects_arr.forEach((el)=>{ el.animationMixer.update(delta) });
	renderer.render(scene,camera);  
	controls.update(delta);
	requestAnimationFrame( renderLoop );
};
renderLoop();

setTimeout(()=>{
	console.log(Objects_arr);
},200);
