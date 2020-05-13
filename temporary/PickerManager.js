//use strict
//TODO:

/* 
подумать над этим:
В в функцию intersectObjects передаются объекты сцены,
в зависимости от состояния камеры можно передавать либо 
объекты сцены с большими элементами или с маленькими объектами
в документации сказано что туда можно передаавать массив из объектов а значит мы можем его формировать

 - Сделать сеттер для массива выбираемых объектов.
 - Возомжно сохранять массив из элементов, но это не задача класса.
*/

// TODO: change this behaviour
var TRANSITION_REQUEST = "Transition";
var HIGHLIGHT_REQUEST = "Highlight";

var lockedStateAction = "lockedState";
var clickableItems = "ClickableItems";
var triggerAction = "triggerAction";
var highlightObject = "highlightObject";

let Events = require('events');

//events list

class PickerManager extends Events {
    //передаем сцену для того чтобы знать где искать объекты
    // в конструктор передаются родительский элемент
    constructor(domObject, camera, scene, states, stateMachine = undefined, currentState = "lockState", name) {
        super();
        if (!THREE) {
            console.log("Need three js module");
            return;
        }
        // before creation
        this._processInitialParameters(domObject, camera, scene, states, stateMachine);
        this.m_internalPickedObject = {};
        this._parceActiveStates();

        //initial propertiess
        this.m_raycaster = new THREE.Raycaster();
        this.m_mouse_position = new THREE.Vector2();
        this.m_pastMousePosition = new THREE.Vector2();
        this.m_currentState = currentState;
        this.m_previousState = currentState;

        this.m_lastHighlightedShape = undefined;
        this.m_currentHighlightedShape = undefined;
        this.m_lastClickedShape = undefined;
        this.m_checkIntersects = false;
    }

    // PUBLIC FUNCTIONS
    set state(state) {
        if (state !== this.m_currentState && state !== undefined) {
            this.m_previousState = this.m_currentState;
            this.m_currentState = state;
        }
    }

    lock() {
        this.m_lastReceivedState = this.m_currentState;
        this.m_currentState = "lockState";
    }

    unLock() {
        if (this.m_currentState === "lockState") {
            this.m_currentState = this.m_lastReceivedState;
        }
    }

    isInitialaized() {
        return this.m_states && this.m_stateMachine && this.m_internalPickedObject;
    }

    startToCheckIntersects() {
        if (this.m_checkIntersects) {
            return;
        }

        this.m_checkIntersects = true;
        setInterval(() => {
            if (this._checkIntersects()) {
                this.m_domObject.style.cursor = "pointer";
            }
            else {
                this.m_domObject.style.cursor = "default";
            }
            if (this.m_currentState !== "lockedState") {
                if (this.m_currentHighlightedShape) {
                    this._sendStateMashineRequest(HIGHLIGHT_REQUEST, this.m_currentHighlightedShape);
                }
                if (this.m_lastHighlightedShape) {
                    this._sendStateMashineRequest(HIGHLIGHT_REQUEST, this.m_lastHighlightedShape);
                }
            }
        }, 300);
    }

    // The function finds the required state by trigger object and return founded state name, if there is no state return undefined.
    requiredState(requiredPickerState) {
        if (this.m_states[requiredPickerState]) {
            console.log("Our p state ", requiredPickerState);
            return requiredPickerState;
        }
        return undefined;
    }
    
    // This functiuon finds internal objects in scene and add them to array to find
    _parceActiveStates() {
        for (let state in this.m_states) {
            this.m_internalPickedObject[state] = [];
            let currentStateObjArr = this.m_states[state][clickableItems]
            for (let internalObject in currentStateObjArr) {
                let foundedObject = this.m_scene.getObjectByName(currentStateObjArr[internalObject][triggerAction]["name"]);
                if (foundedObject) {
                    this._addObjectToState(state, foundedObject)
                    this.m_internalPickedObject[state].push(foundedObject);
                }
            }
        }
    }

    _addObjectToState(state, object)
    {
        
        for(let addedObject in this.m_internalPickedObject[state])
        {
            if (addedObject["name"] === object["name"])
            {
                return;
            }
        }
        this.m_internalPickedObject[state].push(object)
    }
    // PRIVATE FUNCTIONS
    _sendStateMashineRequest(requestID, requestArguments) {
        if (!requestArguments) return;
        switch (requestID) {
            case TRANSITION_REQUEST:
                this.m_stateMachine.transition(requestArguments).then(()=>{
                    console.log("End of transition");
                    console.log(this.m_currentState);
                });
                break;
            case HIGHLIGHT_REQUEST:
                this.m_stateMachine.highlight(requestArguments);
                break;
            default:
                console.log("Error: incorrect requestID", requestID);
                break;
        }
    }
    _checkIntersects() {
        //return back
        if (!this.m_raycaster || !this.m_camera) {
            console.log("Error: raycaster and camera are requred");
            return;
        }
        this.m_raycaster.setFromCamera(this.m_mouse_position, this.m_camera);
        let firstIntersectObject = this.m_raycaster.intersectObjects(this.m_internalPickedObject[this.m_currentState], true);
        if (firstIntersectObject.length === 0) {
            this._updateClickedObject(undefined);
            this._updateHighlightObject(undefined);
            return false;
        }
        firstIntersectObject = firstIntersectObject[0];
        let foundedName = firstIntersectObject['object'].name;
        foundedName = foundedName.replace(/_\d+$/, "");
        let currentLocalState = this.m_stateMachine.localState(foundedName)

        if (!foundedName && !currentLocalState)
        {
            this._updateClickedObject(undefined);
            this._updateHighlightObject(undefined);
            return;
        }

        let foundedObject =  this._getLocalState(foundedName, currentLocalState);
    
        let clickedObject = foundedObject[triggerAction];
        let highlightedObject = foundedObject[highlightObject];

        this._updateClickedObject(clickedObject);
        this._updateHighlightObject(highlightedObject);
        return true;
    }

    _getLocalState(name, state) {
        let currentStateObjects = this.m_states[this.m_currentState][clickableItems]
        for (let index in currentStateObjects)
        {
            if (currentStateObjects[index][triggerAction]["name"] === name
                && currentStateObjects[index][triggerAction]["state"] !== state)
                {
                    return currentStateObjects[index];
                }
        }
        return undefined;
    }

    _onMouseMoveCallback(event) {
        this._resetMousePosotion(event);
    }

    _onMouseClickCallback(event) {
        this._checkIntersects();
        if (this.m_lastClickedShape) {
            this._sendStateMashineRequest(TRANSITION_REQUEST, this.m_lastClickedShape);
        }
    }

    _processInitialParameters(domObject, camera, scene, states, stateMachine) {
        if (domObject) {
            this.m_domObject = domObject;
            this._processMouseCallbacks();
        }

        if (camera) {
            this.m_camera = camera;
        }

        if (scene) {
            this.m_scene = scene;
        }

        if (states) {
            this.m_states = states;
        }

        if (stateMachine) {
            this.m_stateMachine = stateMachine;
        }
        else {
            console.error("ERROR: State mashine is necessary.");
        }
    }

    _processMouseCallbacks() {
        if (this.m_domObject) {
            this.m_domObject.addEventListener("mousemove", this._onMouseMoveCallback.bind(this));
            this.m_domObject.addEventListener("click", this._onMouseClickCallback.bind(this));
        }
    }

    _resetMousePosotion(event) {
        this.m_pastMousePosition.x = this.m_mouse_position.x;
        this.m_pastMousePosition.y = this.m_mouse_position.y;

        this.m_mouse_position.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.m_mouse_position.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    _updateClickedObject(object) {
        if (this.m_lastClickedShape != object) {
            this.m_lastClickedShape = object;
        }
    }

    _updateHighlightObject(object) {
        if (object === undefined)
        {
            if (this.m_currentHighlightedShape !== undefined) {
                let realObjectName = this.m_currentHighlightedShape["name"].replace("_tr", "");
                this.m_lastHighlightedShape = {
                    "name": this.m_currentHighlightedShape["name"],
                    "state": this.m_stateMachine.localState(realObjectName)
                };
            } 
            else 
            {
                this.m_lastHighlightedShape = undefined;
            }
        }
        this.m_currentHighlightedShape = object;
    }

    _onCheckCurrentPickerState(pickerInformation) {
        if (!pickerInformation) {
            console.log("Error: empty picker information");
            return;
        }
        let currentLocalState = this.m_stateMachine.localState(pickerInformation["checkedObjectName"])
        if (!currentLocalState)
        {
            console.log("Error: cannot find object with name", currentLocalState);
            return;
        }
        let localStateObject = pickerInformation["pickerStatesByObjectState"];

        let requiredPickerState = localStateObject[currentLocalState];
        if (requiredPickerState) {
            // console.log("Applyed ")
            this.state = requiredPickerState;
        }
    }
};

if (module.parent === null) {
    // test your picker manager here
}
else {
    module.exports = PickerManager;
}

// privateClass