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
