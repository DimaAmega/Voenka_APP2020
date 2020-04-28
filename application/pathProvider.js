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
    "Anvil_tr.gltf",
    "Lock1.gltf",
    "Lock1_tr.gltf",
    "ppo_lock.gltf",
    "ppo_lock_tr.gltf",
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

// The internal class provides path to required modules for MillitaryApplication.
class PathProvider
{
    constructor()
    {
        
    }

    module(moduleName)
    {    
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
    objectsNamesArray()
    {
        return ObjectsNamesArray;
    }

    globalStates() {
        if (statesDiscriptions === undefined)
        {
            let StatesCreator = require("../StateMachineFramework/StatesObjectCreator");
            let statesCreator = new StatesCreator();
            statesDiscriptions = statesCreator.objectProduct(this.localObjectStates());
        }

        return statesDiscriptions;
    }

    localObjectStates()
    {
        if (localObjectStates === undefined)
        {
            localObjectStates = require("../StateMachineFramework/StatesInformation/SceneObjectStates")["SceneObjects"];
        }

        return localObjectStates;
    }

    pickerStates()
    {
        if (pickerStates === undefined)
        {
            pickerStates = require("../StateMachineFramework/StatesInformation/SceneObjectStates")["pickerManagerStates"];
        }
        return pickerStates;
    }

    transitionsInfo()
    {
        if (transitionsInfo === undefined)
        {
            transitionsInfo = require("../StateMachineFramework/StatesInformation/StatesTransitions");
        }
        return transitionsInfo;
    }
}

if (module.parent === null)
{
    console.log("Local used");
}

else
{
    module.exports = {
        "PathProvider": PathProvider,
    }
}