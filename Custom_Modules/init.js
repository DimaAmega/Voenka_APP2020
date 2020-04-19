var init = function (scene,camera,renderer){
    camera.position.set(0, 1, 5);
    document.body.appendChild( renderer.domElement );
    renderer.setSize( window.innerWidth, window.innerHeight);
    
    ///////////////////////////
    //        LIGHTS
    ///////////////////////////
    // var light1 = new THREE.DirectionalLight(0xFFFFFF, 3);
    // light1.position.set(0,-9,0);
    // light1.target.position.set(0,9,0);

    // var light2 = new THREE.DirectionalLight(0xFFFFFF, 3);
    // light2.position.set(0,-9,3);
    // light2.target.position.set(0,9,0);

    // window.light = light2;
    // scene.add(light1);
    // scene.add(light1.target);
    // scene.add(light2);
    // scene.add(light2.target);

    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    // hemiLight.color.setHSV( 0.6, 0.75, 0.5 );
    // hemiLight.groundColor.setHSV( 0.095, 0.5, 0.5 );
    hemiLight.position.set( 0,-5, 0 );
    // hemiLight.target.position.set(0,9,0);

    scene.add( hemiLight );
        
    var dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
    dirLight.position.set( 0, -5, -2 );
    dirLight.position.multiplyScalar(50);
    dirLight.name = "dirlight";
    window.light = dirLight
    scene.add( dirLight );

    dirLight.castShadow = true;
    dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024*2;

    var d = 300;

    dirLight.shadowCameraLeft = -d;
    dirLight.shadowCameraRight = d;
    dirLight.shadowCameraTop = d;
    dirLight.shadowCameraBottom = -d;

    dirLight.shadowCameraFar = 3500;
    dirLight.shadowBias = -0.0001;
    dirLight.shadowDarkness = 0.35;


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