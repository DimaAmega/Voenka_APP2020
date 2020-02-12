var states_arr = require("./states");

class stateManager{
    constructor(states_arr,current_state_number){
        this.states_arr = states_arr;
        this.current_state_number = current_state_number;
        this.adjacency_matrix = [];
        for(var i in states_arr){
            var empty_arr = new Array(states_arr.length);
            for (var j in states_arr) empty_arr[j] = 0;
            this.adjacency_matrix.push(empty_arr);
        };
    }
    setConnection(arr_connection){
        for(var i in arr_connection) this.adjacency_matrix[arr_connection[i][0]][arr_connection[i][1]] = 1;
        return this;
    }
    delConnection(arr_connection){
        for(var i in arr_connection) this.adjacency_matrix[arr_connection[i][0]][arr_connection[i][1]] = 0;
        return this;
    }
    set state(value){ 
        if (this.adjacency_matrix[this.current_state_number][value]) { this.current_state_number = value; console.log("Success!")}
        else console.log("wrong! we dont have this way!");
        console.log(this.state);
    }
    get state(){
        return this.states_arr[this.current_state_number];
    }
    get arr_states(){
        for(var i in this.states_arr)
        console.log(i," ",this.states_arr[i]);
    }
}

var sm = new stateManager(states_arr,0).setConnection([[0,9],[9,0],[9,13],[13,9],[13,11],[11,2],[2,11]]);
console.log("ALL STATES\n");
sm.arr_states;
console.log("cur st");
console.log(sm.state);

