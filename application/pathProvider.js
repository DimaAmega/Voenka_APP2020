// The internal class provides path to required modules.

//TODO: add different required modules

// map names to paths
let objectsContainer = "ObjectsContainer";
let cameraManager = "CameraManager";
let statesCreator = "StatesCreator";
let transitionMatrises = "TransitionMatrises";
// let localObjectStates = "LocalObjectStates"
let stateManagerPrivate = "StateManagerPrivate";
let objectStateManager = "ObjectStateManager";
let pickerManager = "PickerManager";

// The variables are set below.
let statesDiscriptions = undefined;
let localObjectStates = undefined;
let pickerStates = undefined;
let transitionsInfo = undefined;

let ObjectsNamesArray = [
    "Main_part_1.gltf",
    "base.gltf",
    "Cube1.gltf",
    "Cube2.gltf",
    "Cube3.gltf",
    "Cube4.gltf",
    "Cube5.gltf",
    "Cube6.gltf",
    "Cube7.gltf",
    "Cube8.gltf",
    "Cube9.gltf",
    "Anvil.gltf",
    "CPC_base.gltf",
    "CpcAnvil.gltf",
    "CPCcube1.gltf",
    "CPCcube2.gltf",
    "CPCcube3.gltf",
    "CPCcube4.gltf",
    "CPCcube5.gltf",
    "CPClamp1.gltf",
    "CPClamp2.gltf",
    "CPClamp3.gltf",
    "CPClamp4.gltf",
    "CPClamp5.gltf",
    "B_start.gltf",
    "B_stop.gltf",
    "Hangar.gltf",
    // "Anvil_tr.gltf",
    "Lock1.gltf",
    // "Lock1_tr.gltf",
    "ppo_lock.gltf",
    // "ppo_lock_tr.gltf",
    "Support1.gltf",
    "Support2.gltf",
    "Support3.gltf",
    "Support4.gltf",
    "ppo_button.gltf",
    "lamp1.gltf",
    "lamp2.gltf",
    "lamp3.gltf",
    "lamp4.gltf",
    "lamp5.gltf",
    "lamp6.gltf",
    "lamp7.gltf",
    "Radio_PPO.gltf",
    "Radiostation.gltf",
    "Back_door.gltf",
    "Cap_of_PPO.gltf",
    // "Cap_of_PPO_tr.gltf",
    "Front_door.gltf",
    "Power_checker.gltf",
    // "Power_checker_tr.gltf",
    "TPK_small_very.gltf",
];

var pathInfo = {
    [objectsContainer]: "../../Custom_Modules/ObjectsContainer",
    [cameraManager]: "../../Custom_Modules/CameraManager",
    [statesCreator]: "../../Custom_Modules/StatesObjectCreator",
    [transitionMatrises]: "../../StateMachineFramework/StatesInformation/StatesTransitions",
    [localObjectStates]: "../../StateMachineFramework/StatesInformation/SceneObjectStates",
    [stateManagerPrivate]: "../../StateMachineFramework/StateManagerPrivate",
    [objectStateManager]: "../../StateMachineFramework/ObjectStateManager"
}

let modesInformation = [
    //0
    {
        "pickerState": "1_State",
        "objectManagerState": 0
    },
    //1
    {
        "pickerState": "secondState",
        "objectManagerState": 0
    },
    //2
    {
        "pickerState": "firstState",
        "objectManagerState": 1
    },
    //3
    {
        "pickerState": "firstState",
        "objectManagerState": 1
    },
    //4
    {
        "pickerState": "firstState",
        "objectManagerState": 1
    },
    //5
    {
        "pickerState": "secondState",
        "objectManagerState": 40
    },
    //6
    {
        "pickerState": "firstState",
        "objectManagerState": 1
    },
    //7
    {
        "pickerState": "firstState",
        "objectManagerState": 1
    }
];

var cameraStates = {
    "default": {
        x: 2,
        y: 2,
        z: 6,
        x_deg: -0.22,
        y_deg: 0.11,
        z_deg: 0.029
    },
    "next": {
        x: 3.33,
        y: 1.49,
        z: 2.1,
        x_deg: -0.40,
        y_deg: 0.021,
        z_deg: 0.009,
    },
    "next2": {
        x: 3.42,
        y: 1.45,
        z: 1.65,
        x_deg: -0.44,
        y_deg: 0.09,
        z_deg: 0.044,
    }
}

var cameraMenuDomObjectId = "cameraMenu";
var cameraMenuItems = [
    "первое",
    "второе",
    "что то длиннее",
    "ЕЩЕЕЕЕ ДЛИННЕЕЕЕ"
];

// var cameraCallbacks = [
//     (() => {
//         this.state = "default";
//     }),
//     (() => {
//         this.state = "next";
//     }),
//     (() => {
//         this.state = "next2";
//     })
// ];

var cameraDisabledItems = {
    "0": {
    },
    "1": {
    },
    "2": {
        "name": "Cap_of_PPO",
        "state": "Static"
    },
    "3": {
    }
}

var classInstance = undefined;

// The internal class provides path to required modules for MillitaryApplication.
class PathProvider {
    constructor() {

    }

    module(moduleName) {
        switch (moduleName) {
            case objectsContainer:
                return require("../Custom_Modules/ObjectsContainer");
            case cameraManager:
                return require("../CameraManagerClass/CameraManager");
            case statesCreator:
                return require("../StateMachineFramework/StatesObjectCreator");
            case transitionMatrises:
                return require("../StateMachineFramework/StatesInformation/StatesTransitions");
            case objectStateManager:
                return require("../StateMachineFramework/ObjectStateManager");
            case stateManagerPrivate:
                return require("../StateMachineFramework/StateManagerPrivate");
            case pickerManager:
                return require("../temporary/PickerManager");
            default:
                console.error("Error: no ", moduleName);
                break;
        }
    }
    //The function returns objects for loading on scene.
    objectsNamesArray() {
        return ObjectsNamesArray;
    }

    globalStates() {
        if (statesDiscriptions === undefined) {
            let StatesCreator = require("../StateMachineFramework/StatesObjectCreator");
            let statesCreator = new StatesCreator();
            statesDiscriptions = statesCreator.objectProduct(this.localObjectStates());
        }

        return statesDiscriptions;
    }

    localObjectStates() {
        if (localObjectStates === undefined) {
            localObjectStates = require("../StateMachineFramework/StatesInformation/SceneObjectStates")["SceneObjects"];
        }

        return localObjectStates;
    }

    pickerStates() {
        if (pickerStates === undefined) {
            pickerStates = require("../StateMachineFramework/StatesInformation/SceneObjectStates")["pickerManagerStates"];
        }
        return pickerStates;
    }

    transitionsInfo() {
        if (transitionsInfo === undefined) {
            transitionsInfo = require("../StateMachineFramework/StatesInformation/StatesTransitions");
        }
        return transitionsInfo;
    }

    pickerStateByMode(mode) {
        if ((mode < 0) && (mode > 12)) {
            console.log("Error: error mode", mode);
            return undefined;
        }
        return modesInformation[mode]["pickerState"];
    }

    objectManagerStateByMode(mode) {
        if ((mode < 0) && (mode > 7)) {
            console.log("Error: error mode", mode);
            return undefined;
        }
        return modesInformation[mode]["objectManagerState"];
    }

    transitionsByMode(mode) {
        if ((mode < 0) && (mode > 7)) {
            console.log("Error: error mode", mode);
            return undefined;
        }
        return this.transitionsInfo()[`StateTransitions${mode}`];
    }

    cameraManagerStates() {
        return cameraStates;
    }

    cameraMenuDomObjectId() {
        return cameraMenuDomObjectId;
    }

    cameraMenuItems() {
        return cameraMenuItems;
    }

    cameraMenuCallbacks(bindObject) {
        var cameraCallBacks = [
            (() => {
                bindObject.state = "default";
            }).bind(bindObject),
            (() => {
                bindObject.state = "next";
            }).bind(bindObject),
            (() => {
                bindObject.state = "next2";
            }).bind(bindObject)
        ];
        return cameraCallBacks;
    }

    cameraDisabledItems() {
        return cameraDisabledItems;
    }
}

function getInstance() {
    if (!classInstance) {
        classInstance = new PathProvider();
    }
    return classInstance;
}

if (module.parent === null) {
    console.log("Local used");
}

else {
    module.exports = {
        "getInstance": getInstance,
    }
}