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

class PickerManager {
    //передаем сцену для того чтобы знать где искать объекты
    // в конструктор передаются родительский элемент
    constructor(domObject, camera, scene, states, stateMachine = undefined, currentState = "secondState", name = "PickerManager") {
        if (!THREE) {
            console.log("Need three js module");
            return;
        }
        // before creation
        this._processInitialParameters(domObject, camera, scene, states, stateMachine);
        
        this.m_raycaster = new THREE.Raycaster();
        this.m_mouse_position = new THREE.Vector2();
        this.m_currentState = currentState;
        
        this.m_lastHighlightedShape = "";
        this.m_lastClickedShape = "";
    }

    // PUBLIC FUNCTIONS
    set state(state)
    {
        if (state !== this.m_currentState)
        {
            this.m_currentState = state;
        }
    }

    lock()
    {
        this.m_lastReceivedState = this.m_currentState;
        this.m_currentState = "lockState";
    }

    unLock()
    {
        this.m_currentState = this.m_lastReceivedState;
    }

    isInitialaized()
    {
        return this.m_states && this.m_stateMachine;
    }
    
    // The function finds the required state by trigger object and return founded state name, if there is no state return undefined.
    requiredState(triggerObject) {
        for(let stateName in this.m_states)
        {
            let stateTriggerAction = this.m_states[stateName]["triggerAction"];
            if (triggerObject && stateTriggerAction 
                && stateTriggerAction["name"] === triggerObject["name"]
                && stateTriggerAction["state"] === triggerObject["state"])
                {
                    return stateName;
                }
        }
        return undefined;
    }
    // PRIVATE FUNCTIONS
    _sendStateMashineRequest(requestID, requestArguments)
    {
        switch (requestID) {
            case TRANSITION_REQUEST:
                this.m_stateMachine.transition(requestArguments);
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
        if (!this.m_raycaster || !this.m_camera) {
            console.log("Error: raycaster and camera are requred");
            return;
        }

        this.m_raycaster.setFromCamera(this.m_mouse_position, this.m_camera);

        let firstIntersectObject = this.m_raycaster.intersectObjects(this.m_scene.children, true);

        if (firstIntersectObject.length === 0) {
            this._updateClickedObject(undefined);
            this._updateHighlightObject(undefined);
            return false;
        }

        firstIntersectObject = firstIntersectObject[0];

        let foundedName = firstIntersectObject['object'].name;

        let clickableObjects = this.m_states[this.m_currentState]["ClickableItems"]

        if (firstIntersectObject) {
            for (let clickableObjectName in clickableObjects)
            {
                if (clickableObjectName === foundedName)
                {
                    let clickedObject = clickableObjects[foundedName]["triggerAction"];
                    let highlightedObject = clickableObjects[foundedName]["highlightObject"];

                    this._updateClickedObject(clickedObject);
                    this._updateHighlightObject(highlightedObject);
                    return true;
                }
            }
        }
        
        this._updateClickedObject(undefined);
        this._updateHighlightObject(undefined);
        return false;
    }

    _onMouseMoveCallback(event) {
        this._resetMousePosotion(event);
        if (this._checkIntersects()) {
            this.m_domObject.style.cursor = "pointer";
        }
        else {
            this.m_domObject.style.cursor = "default";
        }
        this._sendStateMashineRequest(HIGHLIGHT_REQUEST, this.m_lastHighlightedShape);
    }

    _onMouseClickCallback(event) {
        this._checkIntersects();
        this._sendStateMashineRequest(TRANSITION_REQUEST, this.m_lastClickedShape);
        
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

        if (states)
        {
            this.m_states = states;
        }

        if (stateMachine) 
        {
            this.m_stateMachine = stateMachine;
        }
        else {
            console.error("ERROR: State mashine is necessary.");
        }
    }

    _processMouseCallbacks() {
        if (this.m_domObject) {
            this.m_domObject.addEventListener("mousemove",this._onMouseMoveCallback.bind(this));
            this.m_domObject.addEventListener("click",this._onMouseClickCallback.bind(this));
        }
    }

    _resetMousePosotion(event) {
        this.m_mouse_position.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.m_mouse_position.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    _updateClickedObject(object)
    {
        if (this.m_lastClickedShape != object) {
            this.m_lastClickedShape = object;
        }
    }

    _updateHighlightObject(object)
    {
        if (this.m_lastHighlightedShape != object) {
            this.m_lastHighlightedShape = object;
        }
    }
};

if (module.parent === null)
{
    // test your picker manager here
}
else {
    module.exports = PickerManager;
}

// privateClass 