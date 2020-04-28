class StatesCreator
{
    _product(args) {
        if(!args.length)
            return [[]];
        var prod = this._product(args.slice(1)), r = [];
        args[0].forEach(function(x) {
            prod.forEach(function(p) {
                r.push([x].concat(p));
            });
        });
        return r;
    };
    objectProduct(obj) {
        console.log(obj);
        let count = 1;
        for(let k_i in obj) count*=obj[k_i].length
        console.log("Count of States",count);
        return {
            get: function(i) {
                let res = {};
                for (let k_i in obj){
                    let tmp = i%obj[k_i].length;
                    res[k_i] = obj[k_i][tmp]
                    i = Math.floor(i/obj[k_i].length)
                }
                return res;
            },
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
