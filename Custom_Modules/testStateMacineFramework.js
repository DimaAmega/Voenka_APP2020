
var StatesCreator = require("../StateMachineFramework/StatesObjectCreator");
var transitionInfo = require("../StateMachineFramework/StatesInformation/StatesTransitions");
var localObjectStates = require("../StateMachineFramework/StatesInformation/SceneObjectStates");
var statesCreator = new StatesCreator();
var transitionInfo = require("../StateMachineFramework/StatesInformation/StatesTransitions");
var statesDiscriptions = statesCreator.objectProduct(localObjectStates["SceneObjects"]);
var StateManagerPrivate = require("../StateMachineFramework/StateManagerPrivate");
StateManagerPrivate = new StateManagerPrivate(statesDiscriptions)
StateManagerPrivate.setConnection(transitionInfo["StateTransitions1"])
var objectStateManager = require("../StateMachineFramework/ObjectStateManager");

export {StateManagerPrivate as stateMachine,statesDiscriptions,objectStateManager,localObjectStates} 