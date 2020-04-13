var basePaht = "../StateMachineFramework/";
var StatesCreator = require("../StateMachineFramework/StatesObjectCreator");
var localObjectStates = require("../StateMachineFramework/StatesInformation/SceneObjectStates");
var statesCreator = new StatesCreator();
var statesDiscriptions = statesCreator.objectProduct(localObjectStates["SceneObjects"]);
var objectStateManager = require("../StateMachineFramework/ObjectStateManager");
export {statesDiscriptions,objectStateManager}