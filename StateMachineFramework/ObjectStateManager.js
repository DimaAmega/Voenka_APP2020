//This class map real 3d objects and their names
let Events = require('events');


StateMachineStateChanged = "StateMachineStateChanged";
class ObjectStateManager extends Events
{
    // текущее состояние, список реальных объектов в сцене, объект с состояниями подобъектов
    constructor (sceneObjects) {
        super();
        this.m_objects = sceneObjects;

        this.m_stateApplied = false;
    }

    //PUBLIC METHODS
    // If private state machine is setted and picker manager setted -> return true
    isInitialaized() {
        return this.m_stateMashine;
    }

    //This function requests transition to different steta and calls apply state for 3d objects
    // return true if transition passed.
    transition(localObject) {
        let localName = localObject["name"];
        let localState = localObject["state"];
        let pickerState = localObject["pickerState"];
        // This call sets state for picker manager

        if (!this.isInitialaized()) {
            console.log("Error: state mashine is undefined");
            return new Promise((resolve,reject)=>{resolve(false)});
        }
        
        var requiredState = this.m_stateMashine.requestTransition(localName, localState);
        console.log("Required state is ", requiredState, "by", localName, localState);

        if (requiredState === undefined) {
            console.log("There is no transition to state");
            return new Promise((resolve,reject)=>{resolve(false)});;
        }
        else {
            if (pickerState) {
                this.m_pickerManager.state = pickerState;
            }
            return this._applyState(requiredState); // it is promise
        }
    }
    // This function loggs valid transitions
    showAvailableTransitions() {
        this.m_stateMashine.logAvailableTransitions();
    }

    highlight(localObject){
        if (!localObject.name || !localObject.state) {
            return false;
        }
        
        for(let obj of this.m_objects)
            if (obj.name === localObject.name) {
                obj.blindUp(0.4);
                obj.applyState(localObject.state);
                return true;
            }
        return false;
    }
    
    //The function returns current local state by local name
    localState(localObjectName)
    {
        if (!localObjectName) 
        {
            console.log("Error: need localObjectName");
            return;
        }

        let currentState = this.m_stateMashine.currentState;
        if (currentState[localObjectName])
        {
            return currentState[localObjectName];
        }
        console.log("Error: cannot find ", localObjectName);
    }

    showAllStates() {
        this.m_stateMashine.logAllStates();
    }

    changeCurrentState(value) {
        if (!this.isInitialaized()) {
            console.log("Error: state mashine is undefined");
            return false;
        }

        if (this.m_stateMashine.setCurrentStateNumber(value))
            this._applyState(this.m_stateMashine.currentState).then(()=>{
                console.log("end start transiton");
            }); // move objects in start position
    }

    // PRIVATE METHODS
    //This function apply state
    // state is JS Object with local names and states
    async _applyState(requiredState) { // async function will return promise
        this.m_stateApplied = false;

        if (typeof requiredState != "object") {
            console.log("Error: incorrect empty state");
            return false;
        }
        this._lockPickerManager();
        var promises = [];
        // Every object return promise
        for (var i in this.m_objects) {
            if (requiredState[this.m_objects[i].name]) //static objects dont change
            promises.push(this.m_objects[i].applyState(requiredState[this.m_objects[i].name]));
        }
        var res = await Promise.all(promises); // wait end of all animations  
        this._unlockPickerManager();
        this.emit(StateMachineStateChanged, requiredState);
        this.m_stateApplied = true;
        for(var r_i of res) if (r_i === false) {  // if all promises return true -> the state was applied
            this.m_stateApplied = false;
            break;
        }
        return this.m_stateApplied; 
    }

    _lockPickerManager() {
        if (this.m_pickerManager) {
            this.m_pickerManager.lock();
        }
    }

    _unlockPickerManager() {
        if (this.m_pickerManager) {
            this.m_pickerManager.unLock();
        }
    }

    //SETTERS


    set state(stateNumber)
    {
        let requiredState = this.m_stateMashine.stateByNumber(stateNumber);
        this._applyState(requiredState);
    }

    set stateMashine(stateMashine) {
        if (!this.isInitialaized()) {
            this.m_stateMashine = stateMashine;
            if (!this.isStateApplyed) {
                var currentState = this.m_stateMashine.currentState;
                if (currentState) {
                    this._applyState(currentState);
                    return;
                }
                else {
                    console.log("Error: can't apply state", undefined);
                }
            }
        }
        else {
            console.log("Error: state machine already setted");
        }
    }

    //This function set transition in stateMamagerPrivate
    set transitions(newTransitions) {
        if (!this.isInitialaized()) {
            console.log("Error: state manager private not initialaized");
            return;
        }

        this.m_stateMashine.setConnection(newTransitions);
    }

    set pickerManager(pickerManager) {
        if (pickerManager && !this.m_pickerManager) {
            this.m_pickerManager = pickerManager;
        }
    }
    //GETTERS
    get isStateApplyed() {
        return this.m_stateApplied;
    }

    //GETTERS
    get currentStateNumber() {
        return this.m_stateMashine.currentStateNumber;
    }
    get currentState() {
        return this.m_stateMashine.currentState;
    }
}
module.exports = ObjectStateManager;
