class StatesCreator
{
    getStateByNumber(i) {
        let res = {};
        for (let k_i in this.obj){
            let tmp = i%this.obj[k_i].length;
            res[k_i] = this.obj[k_i][tmp]
            i = Math.floor(i/this.obj[k_i].length)
        }
        return res;
    }
    objectProduct(obj) {
        console.log(obj);
        this.obj = obj;
        let count = 1;
        for(let k_i in obj) count*=obj[k_i].length
        console.log("Count of States ",count.toLocaleString());
        return {
            get: this.getStateByNumber.bind(this),
            length: count
        }
    }
}
if (module.parent === null)
{
    console.log("Local initioal")
    var SceneObjectStates = require("./StatesInformation/SceneObjectStates");
    // var transitionInformation = require("./StatesInformation/StatesTransitions");

    var statesCreator = new StatesCreator();
    var ObjectsStatesList = statesCreator.objectProduct(SceneObjectStates["SceneObjects"]);

    console.log(ObjectsStatesList);
}
else
{
    module.exports = StatesCreator;
}
