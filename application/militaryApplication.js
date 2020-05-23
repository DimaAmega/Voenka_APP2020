
//internal objects
let tips = require("../TrainingClass/tips").tips;
tips = new tips();
window.tips = tips;
let mw = require("../Custom_Modules/modalWindow").modalWindow;
mw = new mw();
window.mw = mw;
mw.hide();

let pathUtils = require("./pathProvider");
let pathProvider = pathUtils["getInstance"]();
var clock = new THREE.Clock();

let Events = require('events');
var OrbitControls = require("../Custom_Modules/OrbitControls").OrbitControls;
// import { OrbitControls } from "../Custom_Modules/OrbitControls";

let application = undefined;

// var controls = new OrbitControls(camera, renderer.domElement);

//Signals:

let SceneObjectsLoaded = "SceneObjectsLoaded";
let StateMashineCreated = "StateMashineCreated";

// TODO: add events for render,camera, pickerStates, stateMachine
let checkRequiredModules = "checkRequiredModules";

let rendererCreated = "RendererCreated";
let cameraManagerCreated = "CameraCreated";

let readyToPickerManager = "readyToPickerManager";
let pickerManagerCreated = "pickerManagerCreated";

let CheckCurentPickerStateRequest = "CheckCurentPickerStateRequest";

let startApplication = "startApplication";
let applicationReady = "applicationReady";
let modeSelected = "modeSelected";

let weAreReady = "weAreReady";

class MilitaryApplication extends Events {
    // The constructor of main class, temprorary without arguments
    constructor() {
        // declare variables
        super();

        this.m_applicationReady = false;
        this.m_applicationStarted = false;

        this.m_modeSelected = false;
        this.m_demonstrationMode = false;// ??

        this.m_currentMode = -1;

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
        this.on(readyToPickerManager, this._initController);
        this.on(readyToPickerManager, this._initPickerManager);

        this.on(modeSelected, this._checkToReady);
    }

    //Setters

    selectMode(sequenceMode,controllerMode) {
        this.m_currentMode = sequenceMode;
        this.m_controllerMode = controllerMode;
        console.log(arguments);
        if (this.m_objectStateManager && this.m_pickerManager
            && this.m_objectStateManager.isInitialaized() && this.m_pickerManager.isInitialaized()
            && this.m_applicationReady && this.m_applicationStarted) {   
            this._applyCurrentState();
        }
    }

    startApplication() {
        this.m_applicationStarted = true;
        this.emit(startApplication);
    }

    readyEvent(){
        if (this.m_applicationStarted && this.m_applicationReady) 
            return new Promise((resolve,reject)=>{resolve(true)})
        return new Promise((resolve,reject)=>{this.start_resolve_fun = resolve})
    }

    _applicationReady() {
        this.m_applicationReady = true;
        this.emit(applicationReady);
    }

    _mainRenderLoop() {

        if (!application)
        {
            application = this;
        }
        let delta = clock.getDelta();
        application.m_objectLoader.updateAnimations(delta);
        // this.m_controls.update();
        application.m_cameraManager.moveCamera(delta * 1000);
        application.m_render.render(application.m_mainScene, application.m_cameraManager.camera);
        requestAnimationFrame(application._mainRenderLoop);
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
        this.m_objectStateManager = new StateMachine(this.m_sceneObjects);
        this.m_objectStateManager.stateMashine = privateStateMashine;
        this.m_objectStateManager.on(StateMachineStateChanged, this.m_cameraManager._onStateMachineStateChanged.bind(this.m_cameraManager));
        // this.m_objectStateManager.on(StateMachineStateChanged, this.m_pickerManager._onStateMachineStateChanged.bind(this.m_pickerManager));
        window.SM = this.m_objectStateManager;
        // this.emit(StateMashineCreated);
        this.emit(checkRequiredModules);
    }
    _initController(){
        let ControllerClass = pathProvider.module("Controller").Controller;
        this.m_controller = new ControllerClass(this.m_objectStateManager);
    }
    _initPickerManager() {
        let pickerStates = pathProvider.pickerStates();

        let PickerManagerClass = pathProvider.module("PickerManager");

        this.m_pickerManager = new PickerManagerClass(this.m_render.domElement, this.m_cameraManager.camera, this.m_mainScene, pickerStates, this.m_objectStateManager, this.m_controller);
        this.m_objectStateManager.pickerManager = this.m_pickerManager;
        // emit end signal
        //TODO: move to right place

        this.m_cameraManager.on(CheckCurentPickerStateRequest, this.m_pickerManager._onCheckCurrentPickerState.bind(this.m_pickerManager));
        this.emit(pickerManagerCreated);
        this._applicationReady();
    }

    _loadSceneObjects() {
        let ObjectLoader = pathProvider.module("ObjectsContainer");
        this.m_objectLoader = new ObjectLoader();
        this.m_objectLoader.setPathToModels("../../public/3dModels/");
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

        // add Positions and Duration information
        let CameraManagerClass = pathProvider.module("CameraManager");

        let states = pathProvider.cameraManagerStates();
        this.m_cameraManager = new CameraManagerClass(states, 2000);
        window.m_cameraManager = this.m_cameraManager;
        this.on(pickerManagerCreated, this.m_cameraManager._onPickerManagerCreated.bind(this.m_cameraManager));
        // window.camera = this.m_cameraManager.camera;
        // window.cameraManager = this.m_cameraManager;
        window.addEventListener('resize', (() => {
            this.m_cameraManager.camera.aspect = window.innerWidth / window.innerHeight;
            this.m_cameraManager.camera.updateProjectionMatrix();
            this.m_render.setSize(window.innerWidth, window.innerHeight);
        }).bind(this));

        this.emit(checkRequiredModules);
    }

    _addLightToScene() {
        if (!THREE) {
            console.log("Error: need three js.");
            return;
        }

        if (!this.m_mainScene) {
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

    _tryToStartApp() {
        if (this.m_applicationStarted && this.m_applicationReady) {
            console.log("----APPLICATION IS STARTED---")
            // this.m_controls = new OrbitControls(this.m_cameraManager.camera, this.m_render.domElement);
            // Set the states for picker manager, objectState manager and transitions
            if (this.start_resolve_fun) { this.start_resolve_fun(true); }
            // this._applyCurrentState(); \\ it is not necessary here
            this._mainRenderLoop();
            this.m_pickerManager.startToCheckIntersects();
        }
    }

    _checkToReady() {
        if (this.m_applicationReady && this.m_applicationStarted && this.m_modeSelected
            && this.m_objectStateManager.isInitialaized() && this.m_pickerManager.isInitialaized()) {
            emit(weAreReady);
            return;
        }
        console.log("Error: the app isn't ready");
    }

    async _applyCurrentState() {
        if (this.m_currentMode > -1 && this.m_currentMode < 8) {
            this.m_cameraManager.applyState("default");
            this.m_pickerManager.state = pathProvider.pickerStateByMode(this.m_currentMode);
            this.m_objectStateManager.transitions = pathProvider.transitionsByMode(this.m_currentMode);
            await this.m_objectStateManager.setState(pathProvider.objectManagerStateByMode(this.m_currentMode));
            this.m_controller.launch(this.m_controllerMode,pathProvider.finalStatesByMode(this.m_currentMode),pathProvider.timeMarksByMode(this.m_currentMode),pathProvider.toolTipsByMode(this.m_currentMode));
        }
        else console.log("Error: invalid  mode");
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