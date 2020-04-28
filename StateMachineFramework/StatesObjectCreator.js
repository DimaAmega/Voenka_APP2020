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
        var keys = Object.keys(obj),
            values = keys.map(function(x) { return obj[x] });
        return this._product(values).map(function(p) {
            var e = {};
            keys.forEach(function(k, n) { e[k] = p[n] });
            return e;
        });
    }
    objectProduct(obj) {
        console.log(obj);
        let count = 1;
        for(let k_i in obj) count*=obj[k_i].length
        console.log(count);
        return {
            get: function(i){
                let res = {};
                for (let k_i in obj){
                    i%=obj[k_i].length;
                    res[k_i] = obj[k_i][i]
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
