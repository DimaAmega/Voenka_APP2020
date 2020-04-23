// import { GLTFLoader } from "./GLTFLoader"; // GLTF loader
let GLTFLoader = require("./GLTFLoader");

class obj_API {
    constructor(Obj, mixer, actions_arr) {
        this.name = Obj.scene.name.replace(/\..+/, ""); // del .glb or smth
        this.animationMixer = mixer;
        this.actions_arr = actions_arr;
        this.obj = Obj.scene;
        this.full_obj = Obj;
        this.currentAction = [];
        this.isBlind;
        this.opt = {};
        this.opacity = 1;
        this.h = 0.01;
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
        const actions_arr = value.split(", ")
        const new_currentAction = []
        try {

            this.currentAction.forEach((el) => {
                if (actions_arr.indexOf(el.name) == -1) el.action.fadeOut(1)
                else {
                    actions_arr.splice(actions_arr.indexOf(el.name), 1);
                    new_currentAction.push(el);
                }
            });
            this.currentAction = new_currentAction;
            if (value == "Static") { this.currentAction = []; return true; }
            for (value of actions_arr) {
                this.currentAction.push({
                    name: value,
                    action:
                        this.findActionByName(value)
                            .reset()
                            .setLoop(this.opt.loop ? THREE.LoopPingPong : THREE.LoopOnce)
                            // .setDuration(this.opt.durationAnimation || 1)
                            .play()
                });
            }
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

function ParseObj(Obj) {
    var actions_arr = {};
    var mixer = new THREE.AnimationMixer(Obj.scene);
    var clips = Obj.animations;
    for (var c_i in clips) {
        var action = mixer.clipAction(
            THREE.AnimationClip.findByName(clips, clips[c_i].name)
        );
        action.clampWhenFinished = true;
        actions_arr[clips[c_i].name] = action;
    }
    return new obj_API(Obj, mixer, actions_arr);
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
else
{
    module.exports = ObjectsContainer;
}
