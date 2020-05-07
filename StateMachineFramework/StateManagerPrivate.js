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

    isConnectionSet()
    {
        return this.m_transitionsReady;
    }

    //PUBLIC METHODS
    setConnection(arr_connection) {
        for (let i = 0; i<arr_connection.length;i++ ){
            let elem = arr_connection[i];
            if (!this.adjacency_list[elem[0]]) this.adjacency_list[elem[0]] = [elem[1]];
            else this.adjacency_list[elem[0]].push(elem[1])
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

    compareStates(st1, st2){
        for(var i in st1) if (st1[i]!=st2[i]) return false;
        return true;
    }

    //This function returns current state like {} or {a:asdasd, asdasd:asdas}
    // if state in statesArray and required transition is valid
    requestTransition(localName, localState) {
        var candidates = this.adjacency_list[this.current_state_number];
        for (let i = 0; i < candidates.length; i++)
            if (this.stateByNumber(candidates[i])[localName]===localState) {
                return this.stateByNumber(candidates[i]);
            }
        return invalidState;
    }
    // This function loggs available transitions
    logAvailableTransitions() {
        console.log("Аvalible transitions list:");
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

    set currentStateNumber(value){
        console.log("Final current State is ", value.toString(32));
        this.current_state_number = value;
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
    //This function returns number by state 
    numberByState(state){ 
        let obj = this.states_arr.obj;
        let number = 0;
        for(let k_i of Object.keys(state).reverse()){
            let ind = obj[k_i].indexOf(state[k_i])
            number = obj[k_i].length*number + ind;
        }
        return number;
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
