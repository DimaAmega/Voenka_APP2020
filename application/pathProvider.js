// The internal class provides path to required modules.

//TODO: add different required modules

// map names to paths
let objectsContainer = "ObjectsContainer";
let controller = "Controller";
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
    "Radio_PPO.gltf",
    "Radiostation.gltf",
    "Back_door.gltf",
    "Back_door_tr.gltf",
    "Cap_of_PPO.gltf",
    "Cap_of_PPO_tr.gltf",
    "Front_door.gltf",
    "Power_checker.gltf",
    "Power_checker_tr.gltf",
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
    //0 SUPPORTS DOWN
    {
        "pickerState": "1_State",
        "objectManagerState": "0",
        "finalStates": ["12f6f"],
        "timeMarks":[32,34,36],
        "toolTips":{
            "0": `<h3>ДЛЯ ВЫДАЧИ КОМАНДЫ С ППО:</h3>
                    <h5>1) ПОВЕРНИТЕ РЕГУЛЯТОР ПИТАНИЯ В ПОЛОЖЕНИЕ 'ВКЛ'</h5>
                    <h5>2) ОТКРОЙТЕ КРЫШКУ ОТСЕКА №1 </h5>
                    <h5>3) ОТКРОЙТЕ КРЫШКУ ППО</h5>
                    <h5>4) СНИМИТЕ МЕХАНИЧЕСКУЮ БЛОКИРОВКУ</h5>
                    `,
            "f6f":`<h3>ОТДАЙТЕ ПРИКАЗ 'ОТ ПУСКОВОЙ!'</h3>`,
            "f6v":`<h3>ОПУСТИТЕ ДОМКРАТЫ:</h3>
                    <h5>1) ПОВЕРНИТЕ РЕГУЛЯТОР ППО В ПОЛОЖЕНИЕ 'ОПУСК. ДОМКР.'</h5>
                    <h5>1) НАЖМИТЕ КНОПКУ 'ВКЛ'</h5>`
        }
    },
    //1 TPK UP
    { 
        "pickerState": "1_State",
        "objectManagerState": '0',
        "finalStates": ["13h1v"],
        "timeMarks":[45,50,55],
        "toolTips":{
            "0": `<h3>ДЛЯ ВЫДАЧИ КОМАНДЫ С ППО:</h3>
                    <h5>1) ПОВЕРНИТЕ РЕГУЛЯТОР ПИТАНИЯ В ПОЛОЖЕНИЕ 'ВКЛ'</h5>
                    <h5>2) ОТКРОЙТЕ КРЫШКУ ОТСЕКА №1 </h5>
                    <h5>3) ОТКРОЙТЕ КРЫШКУ ППО</h5>
                    <h5>4) СНИМИТЕ МЕХАНИЧЕСКУЮ БЛОКИРОВКУ</h5>
                    `,
            "f6f":`<h3>ОТДАЙТЕ ПРИКАЗ 'ОТ ПУСКОВОЙ!'</h3>`,
            "f6v":`<h3>ПОДНИМИТЕ ТПК:</h3>
                    <h5>1) ПОВЕРНИТЕ РЕГУЛЯТОР ППО В ПОЛОЖЕНИЕ 'ПОДЪЕМ ТПК'</h5>
                    <h5>2) НАЖМИТЕ КНОПКУ 'ВКЛ', В ТАКОМ СЛУЧАЕ ДОМКРАТЫ ОПУСТЯТСЯ АВТОМАТИЧЕСКИ</h5>
                    ЛИБО ОПУСТИТЕ ДОМКРАТЫ ВРУЧНУЮ: <br>
                    <h5>1) ПОВЕРНИТЕ РЕГУЛЯТОР ППО В ПОЛОЖЕНИЕ 'ОПУСК. ДОМКР.'</h5>
                    <h5>2) НАЖМИТЕ КНОПКУ 'ВКЛ'</h5>`,
            "12f6f":`<h3>ОТДАЙТЕ ПРИКАЗ 'ОТ ПУСКОВОЙ!'</h3>`,
            "12f6v":`<h3>ПОДНИМИТЕ ТПК:</h3>
                        <h5>1) ПОВЕРНИТЕ РЕГУЛЯТОР ППО В ПОЛОЖЕНИЕ 'ПОДЪЕМ ТПК'</h5>
                        <h5>2) НАЖМИТЕ КНОПКУ 'ВКЛ'</h5>`,
        }
    },
    //2  SUPPORTS UP
    {
        "pickerState": "1_State",
        "objectManagerState": "12f6f",
        "finalStates":["e5v"],
        "timeMarks":[15,20,25],
        "toolTips":{
            "12f6f": `<h3>ОТДАЙТЕ ПРИКАЗ 'ОТ ПУСКОВОЙ!'</h3>`,
            "12f6v": `<h5>ПОВЕРНИТЕ РЕГУЛЯТОР ППО В ПОЛОЖЕНИЕ 'ПОДЪЕМ ДОМКР'</h5>
                      <h5>НАЖМИТЕ КНОПКУ 'ВКЛ'</h5>`
        }
    },
    //3  TPK DOWN
    {
        "pickerState": "1_State",
        "objectManagerState": "13h0f",
        "finalStates": ["12fbv"],
        "timeMarks":[40,50,60],
        "toolTips":{
            "13h0f": `<h3>ОТДАЙТЕ ПРИКАЗ 'ОТ ПУСКОВОЙ!'</h3>`,
            "13h0v": `<h5>ПОВЕРНИТЕ РЕГУЛЯТОР ППО В ПОЛОЖЕНИЕ 'ОПУСК ТПК'</h5>
                      <h5>НАЖМИТЕ КНОПКУ 'ВКЛ'</h5>`
        }
    },
    //4 SUPPORTS DOWN
    {
        "pickerState": "1_State",
        "objectManagerState": "0",
        "finalStates": ["12fbv"],
        "timeMarks":[40,50,60],
        "toolTips":{
            "0": `<h3>ОТДАЙТЕ ПРИКАЗ 'ОТ ПУСКОВОЙ!'</h3>`,
        }
    },
    //5
    {
        "pickerState": "1_State",
        "objectManagerState": 40
    },
    //6
    {
        "pickerState": "1_State",
        "objectManagerState": 1
    },
    //7
    {
        "pickerState": "1_State",
        "objectManagerState": 1
    }
];

var cameraStates = {
    "default": {
        x: 2,
        y: 2,
        z: 6,
        x_deg: -0.22,
        y_deg: 0,
        z_deg: 0
    },
    "next": {
        x: 3.3,
        y: 1.55,
        z: 2.2,
        x_deg: -0.40,
        y_deg: 0,
        z_deg: 0,
    },
    "next2": {
        x: 3.44,
        y: 1.44,
        z: 1.5,
        x_deg: -0.3,
        y_deg: 0,
        z_deg: 0,
    },
    "next3": {
        x: 0,
        y: 2,
        z: 3,
        x_deg: -0.3,
        y_deg: 0,
        z_deg: 0,
    }
}
var cameraMenuItems = [
    "первое",
    "второе",
    "третье",
    "четвёртое"
];

var cameraMenuDomObjectId = "cameraMenu";
// далеко от машины
var cameraDisabledItems = {
    "0": {
    },
    // перед большой крышкой
    "1": {
        "pickerInformation":{
            "checkedObjectName": "Cap_of_PPO",
            "pickerStatesByObjectState": {
                "Static": "1_State",
                "Open": "2_State"
            }
        }
    }, // перед маленькой крышкой
    "2": {
        "pickerInformation":{
            "checkedObjectName": "Lock1",
            "pickerStatesByObjectState": {
                "Static": "4_State",
                "Open": "5_State"
            }
        },
        "disableInformation": {
            "name": "Cap_of_PPO",
            "state": "Static"
        },
    },
    "3": {
        "pickerInformation":{
            "checkedObjectName": "Back_door",
            "pickerStatesByObjectState": {
                "Static": "6_State",
                "Open": "6_State"
            }
        }
    }
}

var classInstance = undefined;

// The internal class provides path to required modules for MillitaryApplication.
class PathProvider {
    constructor() {}
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
            case controller:
                return require("../temporary/Controller");
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
        if ((mode < 0) && (mode > 7)) {
            console.log("Error: error mode", mode);
            return undefined;
        }
        return modesInformation[mode]["pickerState"];
    }
    finalStatesByMode(mode){
        if ((mode < 0) && (mode > 7)) {
            console.log("Error: error mode", mode);
            return undefined;
        }
        return modesInformation[mode]["finalStates"];
    }

    objectManagerStateByMode(mode) {
        if ((mode < 0) && (mode > 7)) {
            console.log("Error: error mode", mode);
            return undefined;
        }
        return modesInformation[mode]["objectManagerState"];
    }
    timeMarksByMode(mode){
        if ((mode < 0) && (mode > 7)) {
            console.log("Error: error mode", mode);
            return undefined;
        }
        return modesInformation[mode]["timeMarks"]
    }
    toolTipsByMode(mode){
        if ((mode < 0) && (mode > 7)) {
            console.log("Error: error mode", mode);
            return undefined;
        }
        return modesInformation[mode]["toolTips"]
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
                bindObject.applyState("default");
            }).bind(bindObject),
            (() => {
                bindObject.applyState("next");
            }).bind(bindObject),
            (() => {
                bindObject.applyState("next2");
            }).bind(bindObject),
            (() => {
                bindObject.applyState("next3");
            }).bind(bindObject),
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