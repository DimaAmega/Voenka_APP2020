var init = function (scene,camera,renderer){
    document.body.appendChild( renderer.domElement );
    //  set camera initial position
    // camera.position.set(0,5,-5);
    renderer.setSize( window.innerWidth, window.innerHeight );
    //  lights settings
    scene.add(new THREE.AmbientLight(0xffffff, 4));
    //  add resize handler
    window.addEventListener( 'resize', ()=>{
        camera.aspect = window.innerWidth / window.innerHeight;      
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    });
};

export {init}