var init = function (scene,camera,renderer){
    camera.position.set(0, 1, 5);
    document.body.appendChild( renderer.domElement );
    renderer.setSize( window.innerWidth, window.innerHeight);
    
    ///////////////////////////
    //        LIGHTS
    ///////////////////////////
    var light = new THREE.PointLight( 0xffffff, 2, 100 );
    light.position.set( 5, 5, 5 );

    var light2 = new THREE.PointLight( 0xffffff, 4, 100 );
    light2.position.set( 1, 3, -2 );

    scene.add(light);
    scene.add(light2);
    ///////////////////////////
    //     EVENT LISTENERS
    ///////////////////////////
    window.addEventListener( 'resize', ()=>{
        camera.aspect = window.innerWidth / window.innerHeight;      
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    });
};

export { init }