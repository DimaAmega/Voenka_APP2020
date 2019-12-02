// use strict
class CameraManager {
    constructor(positions, durations) {
        if (!THREE) {
            console.log("Need to use THREE JS module");
            return;
        }
        this._setUpCamera();

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
                this.m_duration = this.m_durations[0];
                this._newPosition();
                this.m_onState = false;
                return;
            }
        }

        if (stateIndex == this.m_states.length) {
            console.log(`${newState} not found.`);
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
        const fav = 75;
        const aspect = 2;
        const near = 0.1;
        const far = 50;
        this.m_camera = new THREE.PerspectiveCamera(fav, aspect, near, far);
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
        let duration =  (this.m_stateMode) ? this.m_duration : this.m_durations[this.m_currentPointIndex - 1];

        let current_x = this.m_camera.position.x;
        let current_y = this.m_camera.position.y;
        let current_z = this.m_camera.position.z;

        let current_x_deg = this.m_camera.rotation.x * 180 / Math.PI;
        let current_y_deg = this.m_camera.rotation.y * 180 / Math.PI;
        let current_z_deg = this.m_camera.rotation.z * 180 / Math.PI;

        this.m_coordinatesShifts = {
            x: (newPosition.x !== undefined) ? (newPosition.x - current_x) / duration : 0,
            y: (newPosition.y !== undefined) ? (newPosition.y - current_y) / duration : 0,
            z: (newPosition.z !== undefined) ? (newPosition.z - current_z) / duration : 0,
            x_deg: (newPosition.x_deg !== undefined) ? (newPosition.x_deg - current_x_deg) / duration : 0,
            y_deg: (newPosition.y_deg !== undefined) ? (newPosition.y_deg - current_y_deg) / duration : 0,
            z_deg: (newPosition.z_deg !== undefined) ? (newPosition.z_deg - current_z_deg) / duration : 0,
        };
    }

    _setDefaultPosition() {
        if (this.m_stateMode) {
            this.m_onState = true;
        }
        let defaultPosition = this.m_pointsArray[this.m_currentPointIndex];
        if (defaultPosition) {
            this.m_camera.position.x = (defaultPosition.x)
                ? defaultPosition.x : 0;
            this.m_camera.position.y = (defaultPosition.y)
                ? defaultPosition : 0;
            this.m_camera.position.z = (defaultPosition.z)
                ? defaultPosition.z : 0;
            this.m_camera.rotation.x = (defaultPosition.x_deg)
                ? defaultPosition.x_deg * Math.PI / 180 : 0;
            this.m_camera.rotation.y = (defaultPosition.y_deg)
                ? defaultPosition.y_deg * Math.PI / 180 : 0;
            this.m_camera.rotation.z = (defaultPosition.z_deg)
                ? defaultPosition.z_deg * Math.PI / 180 : 0;
        }
        else {
            console.log("Default camera position not found.");
        }
    }

    moveCamera(time) {
        if (this._stop()) {
            return;
        }

        if (this.m_currentTime === undefined) {
            this.m_currentTime = time;
            return;
        }

        let timeDifference = time - this.m_currentTime;

        if (this.m_duration - timeDifference > 0) {
            this.m_duration -= timeDifference;
            this._shiftPosition(timeDifference);
        }
        else if (this.m_duration - timeDifference < 0 && this.m_duration) {
            this._shiftPosition(this.m_duration);
            this.m_duration = 0;
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
            this.m_camera.rotation.x += diffTime * this.m_coordinatesShifts['x_deg'] * Math.PI / 180;
            this.m_camera.rotation.y += diffTime * this.m_coordinatesShifts['y_deg'] * Math.PI / 180;
            this.m_camera.rotation.z += diffTime * this.m_coordinatesShifts['z_deg'] * Math.PI / 180;
        }
        else {
            console.warn("Bad shifting");
        }
    }
}

export {CameraManager}