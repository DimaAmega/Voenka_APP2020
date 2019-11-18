/////////////////////////////////
//		ES6 Syntaxis WORKS
/////////////////////////////////

import {GLTFLoader} from "../Libraries/GLTFLoader";
import {OrbitControls} from "../Libraries/OrbitControls";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 7000 );
var renderer = new THREE.WebGLRenderer();
var controls = new OrbitControls( camera, renderer.domElement );

var Animations_arr = [];
camera.position.set(0,5,-5);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light = new THREE.AmbientLight(0xffffff, 4);
scene.add(light);
var loader = new GLTFLoader();
loader.load(
	'3dModels/3.gltf',																																																									
	function ( Obj ) {
		scene.add( Obj.scene);
		var clips = Obj.animations;
		console.log(clips);
		var mixer = new THREE.AnimationMixer( Obj.scene);
 		var clip = THREE.AnimationClip.findByName( clips,"Action.002");
		var action = mixer.clipAction( clip );	
		action.play();
		Animations_arr.push(mixer);
	},
	(xhr)=>{ console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )},
	(error)=>{console.error( error)}
);

function animate() {
	Animations_arr.forEach((el)=>{
		el.update(0.01);
	});
	renderer.render(scene,camera);   
	controls.update();
	requestAnimationFrame( animate );
}
animate();
///////////////////////////////////
//      EVENTS LISTENERS
//////////////////////////////////
window.addEventListener("resize",()=>{
    renderer.setSize( window.innerWidth, window.innerHeight );
});