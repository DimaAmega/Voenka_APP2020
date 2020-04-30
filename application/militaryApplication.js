
//internal objects
let pathUtils = require("./pathProvider");
let pathProvider = new pathUtils["PathProvider"]();
var clock = new THREE.Clock();

let Events = require('events');
var OrbitControls = require("../Custom_Modules/OrbitControls").OrbitControls;
// import { OrbitControls } from "../Custom_Modules/OrbitControls";

// var controls = new OrbitControls(camera, renderer.domElement);

//Signals:

let SceneObjectsLoaded = "SceneObjectsLoaded";
let StateMashineCreated = "StateMashineCreated";

// TODO: add events for render,camera, pickerStates, stateMachine
let checkRequiredModules = "checkRequiredModules";

let rendererCreated = "RendererCreated";
let cameraManagerCreated = "CameraCreated";

let readyToPickerManager = "readyToPickerManager";

let startApplication = "startApplication";
let applicationReady = "applicationReady";


class MilitaryApplication extends Events {
    // The constructor of main class, temprorary without arguments
    constructor() {
        // declare variables
        super();

        this.m_applicationReady = false;
        this.m_applicationStarted = false;

        this.m_objectStateManager;
        this.m_pickerManager;
        this.m_cameraManager;
        this.m_statesCreator;
        this.m_transitionInfo;
        this.m_statesDiscriptions;

        // render variable
        this.m_mainScene;
        this.m_render;
        this.m_statesObject;
        this.m_objectLoader;

        this._initMainScene();
        this._initCameraManager();
        this._initRender();

        this.on(SceneObjectsLoaded, this._initStateMachine);

        this.on(startApplication, this._tryToStartApp);
        this.on(applicationReady, this._tryToStartApp);

        this.on(checkRequiredModules, this._checkRequiredModules);
        this.on(readyToPickerManager, this._initPickerManager);
    }
// Public functions:
    startApplication()
    {
        this.m_applicationStarted = true;
        this.emit(startApplication);
    }

    _applicationReady()
    {
        this.m_applicationReady = true;
        this.emit(applicationReady);
    }

    _mainRenderLoop()
    {
        let delta = clock.getDelta();
        this.m_objectLoader.updateAnimations(delta);
        this.m_controls.update();
        this.m_render.render(this.m_mainScene, this.m_cameraManager.camera);
        requestAnimationFrame(this._mainRenderLoop.bind(this));
    }

// Private functions:
    //The function load all scenes and add them to 
    _initMainScene() {
        if (!THREE) {
            console.warn("Error: Need three.js module.");
            return;
        }

        this.m_mainScene = new THREE.Scene();
        this._loadSceneObjects();
    }

    _initStateMachine() {
        if (!this.m_sceneObjects) {
            console.warn("Error: m_sceneObjects isn't setted.");
            return;
        }
        
        // member creators
        let StateMachine = pathProvider.module("ObjectStateManager");
        let PrivateStateMachine = pathProvider.module("StateManagerPrivate");

        // information
        let globalStates = pathProvider.globalStates();
        let transitionsInfo = pathProvider.transitionsInfo()
        let privateStateMashine = new PrivateStateMachine(globalStates);
        privateStateMashine.setConnection(transitionsInfo["StateTransitions1"]);
        this.m_objectStateManager = new StateMachine(this.m_sceneObjects);
        this.m_objectStateManager.stateMashine = privateStateMashine;
        window.SM = this.m_objectStateManager;
        // this.emit(StateMashineCreated);
        this.emit(checkRequiredModules);
    }

    _initPickerManager() {
        let pickerStates = pathProvider.pickerStates();

        let PickerManagerClass = pathProvider.module("PickerManager");

        this.m_pickerManager = new PickerManagerClass(this.m_render.domElement, this.m_cameraManager.camera, this.m_mainScene, pickerStates, this.m_objectStateManager);

        this.m_objectStateManager.pickerManager = this.m_pickerManager;
        // emit end signal
        //TODO: move to right plase
        this._applicationReady();
    }

    _loadSceneObjects() {
        let ObjectLoader = pathProvider.module("ObjectsContainer");
        this.m_objectLoader = new ObjectLoader();
        this.m_objectLoader.setPathToModels("/3dModels/");
        this.m_objectLoader.loadObjects(pathProvider.objectsNamesArray()).then(
            ((Obj_arr) => {
                for (let obj of Obj_arr) {
                    this.m_mainScene.add(obj.obj);
                }
                this.m_sceneObjects = Obj_arr;
                console.log(Obj_arr);
                window.Obj_arr = Obj_arr;
                this._addLightToScene();
                this.emit(SceneObjectsLoaded);
                this.emit(checkRequiredModules);
            }).bind(this)
        );
    }

    _initRender() {
        if (!THREE) {
            console.log("Error: three js is needed.")
            return;
        }

        this.m_render = new THREE.WebGLRenderer({
            powerPreference: "high-performance",
            antialias: true,
            precision: "high",
        });
        if (window && document.body) {
            document.body.appendChild(this.m_render.domElement);
            this.m_render.setSize(window.innerWidth, window.innerHeight);
        }
        else {
            console.log("Error: impossible to set size");
        }

        this.emit(checkRequiredModules);
    }

    _initCameraManager() {

        // TODO remove:
        if (!THREE) {
            console.log("Error: need three js.");
            return;
        }

        let camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            10
        );
        camera.position.set(3, 1, 5);

        this.m_cameraManager = {
            "camera": camera
        };
        // end remove

        // add Positions and Duration information
        // let CameraManagerClass = pathProvider.module("CameraManager");
        // this.m_cameraManager = new CameraManagerClass();

        window.addEventListener( 'resize', (()=>{
            this.m_cameraManager.camera.aspect = window.innerWidth / window.innerHeight;      
            this.m_cameraManager.camera.updateProjectionMatrix();
            this.m_render.setSize( window.innerWidth, window.innerHeight );
        }).bind(this));

        this.emit(checkRequiredModules);
    }

    _addLightToScene() {
        if (!THREE) {
            console.log("Error: need three js.");
            return;
        }

        if (!this.m_mainScene)
        {
            console.log("Error: need main scene");
            return;
        }

        let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.position.set(0, -5, 0);
        var dirLight = new THREE.DirectionalLight(0xffffff, 3);
        dirLight.position.set(0, -5, -2);
        dirLight.position.multiplyScalar(50);
        dirLight.name = "dirlight";
        dirLight.castShadow = true;
        dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024 * 2;

        var d = 300;

        dirLight.shadowCameraLeft = -d;
        dirLight.shadowCameraRight = d;
        dirLight.shadowCameraTop = d;
        dirLight.shadowCameraBottom = -d;

        dirLight.shadowCameraFar = 3500;
        dirLight.shadowBias = -0.0001;
        dirLight.shadowDarkness = 0.35;


        this.m_mainScene.add(hemiLight);
        this.m_mainScene.add(dirLight);
    }

    // private slots:
    _onSceneObjectsLoaded() {

    }

    _checkRequiredModules() {
        if (!this.m_pickerManager && this.m_sceneObjects && this.m_render && this.m_cameraManager && this.m_objectStateManager) {
            this.emit(readyToPickerManager);
        }
    }

    _tryToStartApp()
    {
        if (this.m_applicationStarted && this.m_applicationReady){
            console.log("----APPLICATION IS STARTED---")
            this.m_controls = new OrbitControls(this.m_cameraManager.camera, this.m_render.domElement);
            this._mainRenderLoop();
            // this.m_pickerManager.startToCheckIntersects();
        }
    }
}

if (module.parent === null) {
    console.log("Local using.");
    console.log(pathUtils);
    console.log(pathProvider.objectsNamesArray());
    let app = new MilitaryApplication();
    app._initMainSceneMainScene();
}
else {
    module.exports = MilitaryApplication;
}