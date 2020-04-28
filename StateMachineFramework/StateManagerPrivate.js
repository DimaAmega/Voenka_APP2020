var invalidState = undefined;

class StateManager {
    constructor(states_arr, current_state = 0) {
        if (!states_arr) {
            console.log("Error: need states array");
            return;
        }
        
        this.states_arr = states_arr;
        this.current_state_number = current_state;
        this.adjacency_matrix = [];

        for (var i = 0; i < states_arr.length;i++) {
            var empty_arr = new Array(states_arr.length);
            for (var j = 0; j < states_arr.length;j++) {
                empty_arr[j] = 0;
            }
            this.adjacency_matrix.push(empty_arr);
        }
        this.m_statesCount = this.states_arr.length;
    }

    //PUBLIC METHODS
    setConnection(arr_connection) {
        for (var i = 0; i < arr_connection.length; i++) {
            this.adjacency_matrix[arr_connection[i][0]][arr_connection[i][1]] = 1;
        }
    }

    deleteConnection(arr_connection) {
        for (var i = 0; i < arr_connection.length; i++) {
            this.adjacency_matrix[arr_connection[i][0]][arr_connection[i][1]] = 0;
        }
    }

    // This function removes all connections.
    removeConnections() {
        for (var i = 0; i < this.adjacency_matrix.length; i++) {
            for (var j = 0; i < this.adjacency_matrix[i].length; j++) {
                this.adjacency_matrix[i][j] = 0;
            }
        }
    }

    //This function deletes old connection and applies new.
    resetConnections(newConnections) {
        this.removeConnections();
        this.setConnection(newConnections);
    }

    compareStates(st1,st2){
        for(var i in st1) if (st1[i]!=st2[i]) return false;
        return true;
    }

    //This function returns current state like {} or {a:asdasd, asdasd:asdas}
    // if state in statesArray and required transition is valid
    requestTransition(localName, localState) {
        var candidates = this.adjacency_matrix[this.current_state_number];
        var requiredState = {...this.currentState}
        requiredState[localName] = localState
        for (var i = 0; i < candidates.length; i++) {
            //если есть переход от текущего состояния к запрашиваемому и изменяется наш элемент
            if (candidates[i] === 1 && this.compareStates(this.stateByNumber(i),requiredState)) {
                this.current_state_number = i;
                return this.currentState;
            }
        }
        return invalidState;
    }

    // This function loggs available transitions
    logAvailableTransitions() {
        console.log("Аvalible transitions list:");
        for (var from = 0; from < this.adjacency_matrix.length; from++) {
            for (var to = 0; to < this.adjacency_matrix[from].length; to++) {
                if (this.adjacency_matrix[from][to]) {
                    console.log(from, "->", to);
                }
            }
        }
    }

    logAllStates() {
        console.log("All states:");
        for (var stateNumber = 0; stateNumber < this.states_arr.length; stateNumber++) {
            console.log(stateNumber, this.states_arr.get(stateNumber));
        }
    }

    //This function checks state to valid
    isValidStateNumber(stateNumber) {
        return stateNumber < this.m_statesCount;
    }

    //This function returns current state like JS object with local states.
    get currentState() {
        return this.states_arr.get(this.current_state_number);
    }
    //This function returns current state number.
    get currentStateNumber() {
        return this.current_state_number;
    }

    //This function returns JS object for stateNumber with local properties
    stateByNumber(stateNumber) {
        if (this.isValidStateNumber(stateNumber)) {
            return this.states_arr.get(stateNumber);
        }
        return invalidState;
    }

    //this function returns statesArray.
    get arr_states() {
        return this.states_arr;
    }
    
    setCurrentStateNumber(value) {
        if (this.isValidStateNumber(value)) this.current_state_number = value;
        else {
            console.log("can't apply this state state number");
            return false;
        }
        return true;
    }
}

module.exports = StateManager;
