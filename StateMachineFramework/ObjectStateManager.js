//This class map real 3d objects and their names
class ObjectStateManager {
  // текущее состояние, список реальных объектов в сцене, объект с состояниями подобъектов
  constructor(
    sceneObjects,
    objectStateList,
    currentState = 0,
    externalStateMachine = false,
    transitions = []
  ) {
    this.m_objects = sceneObjects;

    this.m_stateApplied = false;

    if (!externalStateMachine) {
      var StateManager = require("./StateManagerPrivate");
      this.m_stateMashine = new StateManager(objectStateList, currentState);
    }
  }

  //PUBLIC METHODS
  // if state mashine is setted returns true.
  isInitialaized() {
    return this.m_stateMashine !== undefined;
  }
  //This function requests transition to different steta and calls apply state for 3d objects
  // return true if transition passed.
  transition(localName, localState) {
    if (!this.isInitialaized()) {
      console.log("Error: state mashine is undefined");
      return false;
    }

    var requiredState = this.m_stateMashine.requestTransition(
      localName,
      localState
    );
    console.log(
      "Required state is ",
      requiredState,
      "by",
      localName,
      localState
    );

    if (requiredState === undefined) {
      console.log("There is no transition to state");
      return false;
    } else {
      if (this._applyState(requiredState)) {
        console.log("Current state is", requiredState);
        return true;
      } else {
        console.log("Error: Cannot set new current state", requiredState);
        return false;
      }
    }
  }
  // This function loggs valid transitions
  showAvailableTransitions() {
    this.m_stateMashine.logAvailableTransitions();
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
      this._applyState(this.m_stateMashine.currentState); // move objects in start position
  }

  // PRIVATE METHODS
  //This function apply state
  // state is JS Object with local names and states
  _applyState(requiredState) {
    if (typeof requiredState != "object") {
      console.log("Error: incorrect empty state");
      return false;
    }

    var stateApplied = true;
    // if every object return true -> stateApplyed and everything worked correct
    // else ->  badState naming or something else
    for (var i in this.m_objects) {
      // TODO Dmitry Horkin use sceneObjects.applyState please ===> DONE
      if (requiredState[this.m_objects[i].name])
        //static objects dont change
        stateApplied = this.m_objects[i].applyState(
          requiredState[this.m_objects[i].name]
        );
      if (!stateApplied)
        console.log("WRONG, this obj don't change", this.m_objects[i]);
    }
    this.m_stateApplied = stateApplied;
    return stateApplied;
  }
  //SETTERS
  set stateMashine(stateMashine) {
    if (!this.isInitialaized()) {
      this.m_stateMashine = stateMashine;
      if (!this.isStateApplyed) {
        var currentState = this.m_stateMashine.currentState;
        this._applyState(currentState);
      }
    } else {
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
