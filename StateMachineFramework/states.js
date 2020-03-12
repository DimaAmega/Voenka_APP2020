var SchemeStates = 
    {
        door: ["close", "open"],
        toy: ["no_have", "have"],
        baby:["cry", "not_cry"],
        button: ["off", "on"]
    };

    function product(args) {
        if(!args.length)
            return [[]];
        var prod = product(args.slice(1)), r = [];
        args[0].forEach(function(x) {
            prod.forEach(function(p) {
                r.push([x].concat(p));
            });
        });
        return r;
    };
    
    function objectProduct(obj) {
        var keys = Object.keys(obj),
            values = keys.map(function(x) { return obj[x] });
        return product(values).map(function(p) {
            var e = {};
            keys.forEach(function(k, n) { e[k] = p[n] });
            return e;
        });
    }

    var ObjectsList = objectProduct(SchemeStates);
    console.log(ObjectsList)

// module.exports = ObjectsList;
exports {ObjectsList};
