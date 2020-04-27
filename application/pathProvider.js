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
    "Main_part.gltf",
    "base.gltf",
    "Cube.gltf",
    "Cube_1.gltf",
    "Cube_2.gltf",
    "Cube_3.gltf",
    "Cube_4.gltf",
    "Cube_5.gltf",
    "Cube_6.gltf",
    "Cube_7.gltf",
    "Cube_8.gltf",
    "Anvil.gltf",
    "Anvil_tr.gltf",
    "Lock1.gltf",
    "Lock1_tr.gltf",
    "Oil_Tank.gltf",
    "ppo_lock.gltf",
    "ppo_lock_tr.gltf",
    "Support1.gltf",
    "Support2.gltf",
    "Support3.gltf",
    "Support4.gltf",
    "ValveTopR.gltf",
    "Back_door.gltf",
    "Cap_of_PPO.gltf",
    "Cap_of_PPO_tr.gltf",
    "Front_door.gltf",
    "Power_checker.gltf",
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
        "pickerState": "firstState",
        "objectManagerState": 0
    },
    //1
    {
        "pickerState": "secondState",
        "objectManagerState": 3
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
    },
    //8
    {
        "pickerState": "firstState",
        "objectManagerState": 1
    },
    //8
    {
        "pickerState": "firstState",
        "objectManagerState": 1
    },
    //9
    {
        "pickerState": "firstState",
        "objectManagerState": 1
    },
    //10
    {
        "pickerState": "firstState",
        "objectManagerState": 1
    },
    //11
    {
        "pickerState": "firstState",
        "objectManagerState": 1
    }
];

// The internal class provides path to required modules for MillitaryApplication.
class PathProvider {
    constructor() {

    }

    module(moduleName) {
        switch (moduleName) {
            case objectsContainer:
                return require("../Custom_Modules/ObjectsContainer");
            case cameraManager:
                return require("../Custom_Modules/CameraManager");
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

    pickerStateByMode(mode)
    {
        if ((mode < 0 ) && (mode > 12))
        {
            console.log("Error: error mode", mode);
            return undefined;
        }
        return modesInformation[mode]["pickerState"];
    }

    objectManagerStateByMode(mode)
    {
        if ((mode < 0 ) && (mode > 12))
        {
            console.log("Error: error mode", mode);
            return undefined;
        }
        return modesInformation[mode]["objectManagerState"];
    }

    transitionsByMode(mode)
    {
        if ((mode < 0 ) && (mode > 12))
        {
            console.log("Error: error mode", mode);
            return undefined;
        }
        return this.transitionsInfo()[`StateTransitions${mode}`];
    }
}

if (module.parent === null) {
    console.log("Local used");
}

else {
    module.exports = {
        "PathProvider": PathProvider,
    }
}