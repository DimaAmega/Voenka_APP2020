// use strict
let Events = require('events');

let CameraMenuClass = require("./CameraMenu.js");
//events
let pathUtils = require("../application/pathProvider");
let pathProvider = pathUtils["getInstance"]();
//events list
let StateMachineStateChanged = "StateMachineStateChanged";
let PickerManagerCreated = "PickerManagerCreated";
let CheckCurentPickerStateRequest = "CheckCurentPickerStateRequest";

class CameraManager extends Events {
    constructor(positions, durations) {
        super();
        if (!THREE) {
            console.log("Need to use THREE JS module");
            return;
        }
        this._setUpCamera();

        let domElementId = pathProvider.cameraMenuDomObjectId();
        let menuItems = pathProvider.cameraMenuItems();
        let cameraMenuCallbacks = pathProvider.cameraMenuCallbacks(this);
        let cameraDisabledItems = pathProvider.cameraDisabledItems();

        this.m_menu = new CameraMenuClass(domElementId, menuItems, cameraMenuCallbacks, cameraDisabledItems);
        this.m_pickerAndDisabledInfo = cameraDisabledItems;
        if (Array.isArray(positions)) {
            this._orderModeConstructor(positions, durations);
        }
        else {
            this._stateModeConstructor(positions, durations);
        }
    }

    get camera() {
        return this.m_camera;
    }

    /**
     * @param {any} stateName
     */
    set state(stateName) {
        let stateIndex = 0;
        for (; stateIndex < this.m_states.length; stateIndex++) {
            if (this.m_states[stateIndex] === stateName) {
                this.m_currentPointIndex = stateIndex;
                this.m_duration = this.m_durations;
                this._newPosition();
                this.m_onState = false;
                return;
            }
        }

        if (stateIndex == this.m_states.length) {
            console.log(`${newState} not found.`);
        }
    }

    applyState(stateName)
    {
        this.state = stateName;
        let pickerInfo = this.m_pickerAndDisabledInfo[this.m_currentPointIndex]["pickerInformation"];
        
        if (pickerInfo) {
            this.emit(CheckCurentPickerStateRequest, pickerInfo);
        }
    }

    _orderModeConstructor(positions, durations) {
        if (positions.length - 1 !== durations.length) {
            console.warn("Check count of positions and durations");
            return;
        }

        this.m_stateMode = false;
        this.m_currentPointIndex = 0;
        this.m_pointsArray = positions;
        this.m_durations = durations;

        this._setDefaultPosition();
        this.m_currentPointIndex++;
        if (!this._stop()) {
            this._newDuration();
            this._newPosition();
        }
    }

    _stateModeConstructor(states, durations) {
        this.m_stateMode = true;
        this.m_onState = false;
        this.m_currentPointIndex = 0;
        this.m_states = [];
        this.m_pointsArray = [];
        this.m_duration = durations[0];
        this.m_durations = durations;
        //заполнили массивы состояний и точек для них
        for (let state in states) {
            this.m_states.push(state);
            this.m_pointsArray.push(states[state]);
        }
        this._setDefaultPosition();
    }

    _setUpCamera() {
        this.m_camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            150
        );
    }

    _newPosition() {
        this._setCoordinateShifts(this.m_pointsArray[this.m_currentPointIndex]);
    }

    _newDuration() {
        this.m_duration = this.m_durations[this.m_currentPointIndex - 1];
    }

    _nextPosition() {
        this.m_currentPointIndex++;

        if (this._stop()) {
            return;
        }
        this._newPosition();
        this._newDuration();
    }

    _stop() {
        if (!this.m_stateMode) {
            return this.m_currentPointIndex === this.m_pointsArray.length;
        }
        else {
            return this.m_onState;
        }
    }

    _setCoordinateShifts(newPosition) {
        let duration = this.m_duration;

        let current_x = this.m_camera.position.x;
        let current_y = this.m_camera.position.y;
        let current_z = this.m_camera.position.z;

        let current_x_deg = this.m_camera.rotation.x;
        let current_y_deg = this.m_camera.rotation.y;
        let current_z_deg = this.m_camera.rotation.z;

        this.m_coordinatesShifts = {
            x: (newPosition.x - current_x) / duration,
            y: (newPosition.y - current_y) / duration,
            z: (newPosition.z - current_z) / duration,
            x_deg: (newPosition.x_deg - current_x_deg) / duration,
            y_deg: (newPosition.y_deg - current_y_deg) / duration,
            z_deg: (newPosition.z_deg - current_z_deg) / duration,
        };
    }

    _setDefaultPosition() {
        if (this.m_stateMode) {
            this.m_onState = true;
        }
        let defaultPosition = this.m_pointsArray[this.m_currentPointIndex];
        if (defaultPosition) {
            this.m_camera.position.x = defaultPosition.x
            this.m_camera.position.y = defaultPosition.y
            this.m_camera.position.z = (defaultPosition.z)
                
            this.m_camera.rotation.x = defaultPosition.x_deg;
            this.m_camera.rotation.y = defaultPosition.y_deg
            this.m_camera.rotation.z = defaultPosition.z_deg
        }
        else {
            console.log("Default camera position not found.");
        }
    }

    moveCamera(delta) {
    
        if (this.m_onState){
            return;
        }

        if (this.m_duration - delta > 0) {
            this.m_duration -= delta;
            this._shiftPosition(delta);
        }
        else if (this.m_duration - delta < 0 && this.m_duration > 0) {
            this._shiftPosition(this.m_duration);
            this.m_duration = this.m_durations;
            if (this.m_stateMode) {
                this.m_onState = true;
                this.m_currentTime = undefined;
            }
        }
        else {
            if (!this.m_stateMode) {
                this._nextPosition();
                this.m_currentTime = time;
            }
        }
    }

    _shiftPosition(diffTime) {
        if (this.m_coordinatesShifts) {
            this.m_camera.position.x += diffTime * this.m_coordinatesShifts['x'];
            this.m_camera.position.y += diffTime * this.m_coordinatesShifts['y'];
            this.m_camera.position.z += diffTime * this.m_coordinatesShifts['z'];
            this.m_camera.rotation.x += diffTime * this.m_coordinatesShifts['x_deg'];
            this.m_camera.rotation.y += diffTime * this.m_coordinatesShifts['y_deg'];
            this.m_camera.rotation.z += diffTime * this.m_coordinatesShifts['z_deg'];
        }
        else {
            console.warn("Bad shifting");
        }
    }

    _onStateMachineStateChanged(stateMachineState)
    {
        if (stateMachineState === undefined)
        {
            return;
        }
        this.m_menu._onCameraStateChanged(stateMachineState);

    }

    _onPickerManagerCreated() {
        console.log("HELLLOOO");
    }
}

// export {CameraManager}

if (module.parent === null) {
    console.log("Local used");
}

else {
    module.exports = CameraManager;
}