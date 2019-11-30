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

class PickerManager {
    //передаем сцену для того чтобы знать где искать объекты
    // в конструктор передаются родительский элемент
    constructor(domObject) {
        if (!THREE) {
            console.log("Need three js module");
            return;
        }

        this.m_raycaster = new THREE.Raycaster();
        this.m_mouse = new THREE.Vector2();
        // массив который содержит текущих кандидатов для поиска среди них
        this.m_selectableArray = [];

        this.m_states = {};
        this.m_foundedObject = [];

        if (domObject) {
            // domObject.addEventListener('mousemove', this._onMouseMoveCallback.bind(this), false);
            domObject.addEventListener('click', this._onMouseClickCallback.bind(this), false);
        }
    }

    // PUBLIC FUNCTIONS

    // функция мапит названия  mesh и реальные объекты в сцене
    /**
     * @param {any} stateName
     */
    set states(states) {
        if (states.constructor !== Object) {
            console.warn("States is object!")
            return;
        }

        if (!this.m_rootObject) {
            console.warn("Need set root object.");
            return;
        }

        for (let state in states) {
            this.m_states[state] = [];
            states[state].forEach(element => {
                let candidate = this.m_rootObject.getObjectByName(element);
                if (candidate) {
                    this.m_states[state].push(candidate);
                }
                else {
                    console.warn(`Cannot find ${element}`);
                    return;
                }
            });
        }
    }

    /**
     * @param {any} stateName
     */
    set state(newState) {
        if (this.m_states.hasOwnProperty(newState)) {
            this.m_currentState = newState;
            this.m_candidates = this.m_states[newState];
        }
    }

    /**
     * @param {any} stateName
     */
    set rootObject(rootObject) {
        if (this.m_rootObject !== rootObject) {
            this.m_rootObject = rootObject;
        }
    }

    /**
    * @param {any} stateName
    */
    set camera(camera) {
        if (camera && camera !== this.m_camera) {
            this.m_camera = camera;
        }
    }

    _checkIntersects() {
        if (!this.m_raycaster || !this.m_camera) {
            return;
        }
        this.m_raycaster.setFromCamera(this.m_mouse, this.m_camera);
        let intersectsObjects = this.m_raycaster.intersectObjects(this.m_candidates, true);

        if (intersectsObjects && intersectsObjects.length) {
            let foundedObject = this._objectFromCurrentState(intersectsObjects[0]);
            if (foundedObject) {
                this.m_foundedObject = foundedObject;
            }
        }
    }

    get pickedObject() {
        if (this.m_foundedObject) {
            return this.m_foundedObject;
        }
        return undefined;
    }

    // PRIVATE FUNCTIONS
    _clearSelectableArray() {
        this.m_selectableArray = [];
    }

    // _onMouseMoveCallback(event) {
    //     this.m_mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     this.m_mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    // }

    _onMouseClickCallback(event) {
        this.m_mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.m_mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this._checkIntersects()
    }

    _objectFromCurrentState(object) {
        if (!object) {
            console.warn(`Bad object!`);
            return;
        }
        let foundedObject = object.object;
        //идем вверх по дереву
        while (!this._hasObject(foundedObject)
            && foundedObject.name !== this.m_rootObject.name) {
            foundedObject = foundedObject.parent;
        }

        if (foundedObject.name === this.m_rootObject.name) {
            console.log(`Cannot find ${foundedObject.name}`);
        }

        return foundedObject;
    }

    _hasObject(object) {
        let currentState = this.m_states[this.m_currentState];

        for (let stateObject = 0; stateObject < currentState.length; stateObject++) {
            if (currentState[stateObject].name === object.name) {
                return true;
            }
        }
        return false;
    }
};