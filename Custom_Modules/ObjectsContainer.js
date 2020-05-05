// import { GLTFLoader } from "./GLTFLoader"; // GLTF loader
let GLTFLoader = require("./GLTFLoader");
class obj_API{
    constructor(Obj, mixer, actions_arr,durations_arr) {
        this.name = Obj.scene.name.replace(/\..+/, ""); // del .glb or smth
        this.animationMixer = mixer;
        this.actions_arr = actions_arr;
        this.durations_arr = durations_arr;
        this.obj = Obj.scene;
        this.full_obj = Obj;
        this.currentAction = {name:"Static"};
        this.isBlind;
        this.opt = {};
        this.opacity = 1;
        this.h = 0.01;
        this.resolveFun;
        this.handler = function (e) {
            this.animationMixer.removeEventListener("finished", this.handler);
            this.resolveFun(true);
        }.bind(this);
        this.transitionPromise = function () {
            return new Promise((resolve, reject) => {
                this.resolveFun = resolve;
                this.animationMixer.addEventListener('finished', this.handler);
            })
        }
        this.emptyPromise = function(bool) {
            return new Promise((resolve,reject)=>{resolve(bool)});
        }
        this.fadeOutPromise = function () {
            var sec = this.durations_arr[this.currentAction.name];
            this.currentAction.action.fadeOut(sec);
            this.currentAction = { name: "Static" };
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                },sec*1000);
            })
        }
        this.EmissivePromise = function(r, g, b){
            return new Promise((resolve,reject)=>{
                var emissive = this.obj.children[0].material.emissive;
                emissive.r = r;
                emissive.g = g;
                emissive.b = b;
                return resolve(true);
            })
        }
    }
    findActionByName(name) {
        if (this.actions_arr[name] == undefined) throw "dont have this Action";
        else return this.actions_arr[name];
    }
    updateAnimations(delta) {
        this.animationMixer.update(delta);
    }
    setOptions(options) {
        this.opt = options;
        return this;
    }
    setOpacity(obj, opacity) {
        if (obj.material && obj.material.name != "Материал.4") {
            obj.material.opacity = opacity;
            if (opacity > 0.95) obj.material.transparent = false;
            else obj.material.transparent = true;
        }

        if (!obj.children) return;
        obj.children.forEach((child) => {
            this.setOpacity.bind(this)(child, opacity);
        });
    }
    blindUp(opacity) {
        var i = this.opacity;
        if (opacity <= this.opacity) this.h = Math.min(this.h, -this.h);
        else this.h = Math.max(this.h, -this.h);
        new Promise((resolve, reject) => {
            var timer_id = setInterval(() => {
                this.setOpacity.bind(this)(this.obj.children[0], i);
                if (Math.abs(i - opacity) < 0.5 * Math.max(this.h, -this.h))
                    resolve(timer_id);
                i += this.h;
            }, 10);
        }).then((timer_id) => {
            clearTimeout(timer_id);
            this.opacity = opacity;
        });
    }
    applyState(value) {
        try{
            if (this.currentAction.name === value ) return this.emptyPromise(true);
            switch (value) {
                case "Static":
                    if (this.currentAction.name === "Emissive") {
                        this.currentAction = {name:"Static"};
                        return this.EmissivePromise(0,0,0);
                    }
                    else return this.fadeOutPromise();
                case "Emissive":
                    this.currentAction = { name: "Emissive" };
                    return this.EmissivePromise(0,1,0);
                default:
                    if (this.currentAction.name !== "Static"){
                        var sec = this.durations_arr[this.currentAction.name];
                        this.currentAction.action.fadeOut(sec);
                    }
                    this.currentAction = {
                        name: value,
                        action: this.findActionByName(value)
                                .reset()
                                .setLoop(this.opt.loop ? THREE.LoopPingPong : THREE.LoopOnce)
                                .play()
                    }
                    if(value === "Used") {
                        tips.setText('ОТ ПУСКОВОЙ!');
                        setTimeout(()=>{tips.hide()},3000)
                    }
                    return this.transitionPromise();
            }
        }
        catch(e){
            console.error(e);
            return this.emptyPromise(false);
        }
    }
    blindUp(opacity) {
        var i = this.opacity;
        if (opacity <= this.opacity) this.h = Math.min(this.h, -this.h);
        else this.h = Math.max(this.h, -this.h);
        new Promise((resolve, reject) => {
            var timer_id = setInterval(() => {
                this.setOpacity.bind(this)(this.obj.children[0], i);
                if (Math.abs(i - opacity) < 0.5 * Math.max(this.h, -this.h))
                    resolve(timer_id);
                i += this.h;
            }, 10);
        }).then((timer_id) => {
            clearTimeout(timer_id);
            this.opacity = opacity;
        });
    }
}
function ParseObj(Obj) {
    var actions_arr = {};
    var durations_arr = {};
    var mixer = new THREE.AnimationMixer(Obj.scene);
    var clips = Obj.animations;
    for (var c_i in clips) {
        var action = mixer.clipAction(
            THREE.AnimationClip.findByName(clips, clips[c_i].name)
        );
        action.clampWhenFinished = true;
        actions_arr[clips[c_i].name] = action;
        durations_arr[clips[c_i].name] = clips[c_i].duration
    }
    return new obj_API(Obj, mixer, actions_arr,durations_arr);
}
var ObjectsContainer = function () {
    ///////////////////////////
    //      PRIVATE
    ///////////////////////////
    var Object_arr = [];
    var loader = new GLTFLoader.GLTFLoader();
    // var loader = new FBXLoader();
    var loadObject = function (PathToObject) {
        return new Promise(function (resolve, reject) {
            loader.load(
                PathToObject,
                (Obj) => {
                    // SET NEAME EVERY OBJECT
                    // console.log(Obj);
                    Obj.scene.name = PathToObject;
                    resolve(Obj);
                },
                (xhr) => {
                    console.log(Math.floor((xhr.loaded / xhr.total) * 100) + "% loaded");
                },
                (error) => {
                    console.error(error);
                    reject(error);
                }
            );
        });
    };
    ///////////////////////////
    //     PUBLIC METHODS
    ///////////////////////////
    // loadObjects
    this.loadObjects = function (arr_names) {
        return new Promise(function (resolve, reject) {
            var counterLoad = 0;
            for (var i = 0; i < arr_names.length; i++)
                loadObject(arr_names[i]).then((obj_3dmodel) => {
                    Object_arr.push(ParseObj(obj_3dmodel));
                    counterLoad++;
                    if (counterLoad == arr_names.length) resolve(Object_arr);
                });
        });
    };
    // updateAnimations
    this.updateAnimations = function (delta) {
        for (var i = 0; i < Object_arr.length; i++)
            Object_arr[i].updateAnimations(delta);
    };
    //setPathToModels
    this.setPathToModels = function (pathToDirWith3dModels) {
        loader.setPath(pathToDirWith3dModels);
    };
};

// export { ObjectsContainer };

if (module.parent === null) {
    console.log("Local using.");
}
else {
    module.exports = ObjectsContainer;
}
