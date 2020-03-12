import {StateManager} from "./StateManager"
import {ObjectsList} from "./states"

class ObjectStateManager {
    // текущее состояние, список реальных объектов в сцене, объект с состояниями подобъектов
    constructor(currentState, sceneObjects, objectStateList) {
        this.m_objects = sceneObjects;
        this.m_stateMashine = new StateManager(objectStateList, currentState);
    }

    transition(localName,loacalState)
    {
        if (var newState = this.m_stateMashine.requestTransition(localName,loacalState))
        {

        }
    }
}

// exports {ObjectWrapper};
// module.exports = ObjectWrapper;