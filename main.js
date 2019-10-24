var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

var OrbitControls = require('three-orbitcontrols')
var controls = new OrbitControls( camera, renderer.domElement );

var Animations_arr = [];
camera.position.z = 20
camera.position.y = -20

// camera.position.set( 0, -10, 10 );
controls.update();


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light = new THREE.AmbientLight(0xffffff, 2);
    scene.add(light);

// Instantiate a loader
var loader = new THREE.GLTFLoader();
// Load a glTF resource
loader.load(
	// resource URL
	'3dModels/scene.gltf',
	// called when the resource is loaded
	function ( Person ) {
		var clips = Person.animations;
		var mixer = new THREE.AnimationMixer( Person.scene);
		var clip = THREE.AnimationClip.findByName( clips, 'Take 001' );
		var action = mixer.clipAction( clip )
		action.play();
		scene.add( Person.scene );
		Animations_arr.push(mixer)
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.error( error);
	}
);

function animate() {
	Animations_arr.forEach((el)=>{
		el.update(0.1);
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