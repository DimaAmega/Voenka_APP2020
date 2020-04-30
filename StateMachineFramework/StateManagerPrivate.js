var invalidState = undefined;

class StateManager {
    constructor(states_arr, current_state = 0) {
        if (!states_arr) {
            console.log("Error: need states array");
            return;
        }
        
        this.states_arr = states_arr;
        this.current_state_number = current_state;
        this.adjacency_list = {};
        this.m_statesCount = this.states_arr.length;
    }

    //PUBLIC METHODS
    setConnection(arr_connection) {
        for (let i = 0; i<arr_connection.length;i++ ){
            let elem = arr_connection[i];
            if (!this.adjacency_list[parseInt(elem[0],32)]) this.adjacency_list[parseInt(elem[0],32)] = [parseInt(elem[1],32)];
            else this.adjacency_list[parseInt(elem[0],32)].push(parseInt(elem[1],32))
        }
    }

    // This function removes all connections.
    removeConnections() {
        this.adjacency_list = {}
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
        var candidates = this.adjacency_list[this.current_state_number];
        for (let i = 0; i < candidates.length; i++)
            if (this.stateByNumber(candidates[i])[localName]===localState) {
                this.current_state_number = candidates[i];
                return this.currentState;
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
        for (let stateNumber = 0; stateNumber < this.states_arr.length; stateNumber++) {
            console.log(stateNumber.toString(32), this.states_arr.get(stateNumber));
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
    numberByState(state){
        for(let i = 0; i < this.m_statesCount; i++)
        if (this.compareStates(state,this.stateByNumber(i)))  return i.toString(32);
        return -1;
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
