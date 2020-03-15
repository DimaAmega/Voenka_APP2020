var invalidState = undefined;

class StateManager {
    constructor(states_arr, current_state = 0){
        if (!states_arr)
        {
            console.log("Error: need states array");
            return;
        }

        this.states_arr = states_arr;
        this.current_state_number = current_state;
        this.adjacency_matrix = [];

        for(var i in states_arr){
            var empty_arr = new Array(states_arr.length);
            for (var j in states_arr) {
                empty_arr[j] = 0;
            }
            this.adjacency_matrix.push(empty_arr);
        };
        this.m_statesCount = this.states_arr.length;
    }

//PUBLIC METHODS
    setConnection(arr_connection){
        for(var i in arr_connection) {
            this.adjacency_matrix[arr_connection[i][0]][arr_connection[i][1]] = 1;
        }
        return this; //for what ???
    }

    deleteConnection(arr_connection){
        for(var i in arr_connection) {
            this.adjacency_matrix[arr_connection[i][0]][arr_connection[i][1]] = 0;
        }
        return this; //for what ???
    }

    // This function removes all connections.
    removeConnections()
    {
        for (var i in this.adjacency_matrix)
        {
            for (var j in this.adjacency_matrix[i])
            {
                this.adjacency_matrix[i][j] = 0;
            }
        }
    }

    //This function deletes old connection and applies new.
    resetConnections(newConnections)
    {
        this.removeConnections();
        this.setConnection(newConnections);
    }

    //This function returns current state like {} or {a:asdasd, asdasd:asdas} 
    // if state in statesArray and required transition is valid
    requestTransition(localName, localState)
    {
        var candidates = this.adjacency_matrix[this.current_state_number];
        for (var i in candidates)
        {
            //если есть переход от текущего состояния к запрашиваемому и изменяется наш элемент
            if ((candidates[i] === 1) 
                && (this.states_arr[i][localName] === localState))
            {
                this.current_state_number = i;
                return this.currentState;
            }
        }
        return invalidState;
    }
    
    // This function loggs available transitions
    logAvailableTransitions()
    {
        console.log("Аvalible transitions list:")
        for (var from in this.adjacency_matrix)
        {
            for (var to in this.adjacency_matrix[from])
            {
                if (this.adjacency_matrix[from][to])
                {
                    console.log(from, "->", to);
                }
            }
        }
    }

    logAllStates()
    {
        console.log("All states:")
        for(var stateNumber in this.states_arr)
        {
            console.log(stateNumber, this.states_arr[stateNumber]);
        }
    }

    //This function checks state to valid
    isValidStateNumber(stateNumber)
    {
        return stateNumber < this.m_statesCount;
    }

    //This function returns current state like JS object with local states.
    get currentState(){
        return this.states_arr[this.current_state_number];
    }
    
    //This function returns current state number.
    get currentStateNumber()
    {
        return this.current_state_number;
    }

    //This function returns JS object for stateNumber with local properties
    stateByNumber(stateNumber)
    {
        if (this.isValidStateNumber(stateNumber))
        {
            return this.states_arr[stateNumber];
        }
        return invalidState;
    }

    //this function returns statesArray.
    get arr_states(){
        return this.states_arr;
    }
}

if (module.parent === null)
{
    //required modules
    var StatesCreator = require("./StatesObjectCreator");
    var transitionInfo = require("./StatesInformation/StatesTransitions");
    var localObjectStates = require("./StatesInformation/SceneObjectStates");
    var statesCreator = new StatesCreator();
    var states = statesCreator.objectProduct(localObjectStates["SceneObjects"]);
    var stateManager = new StateManager(states).setConnection(transitionInfo["StateTransition"]);   
}
else
{
    module.exports = StateManager;
}