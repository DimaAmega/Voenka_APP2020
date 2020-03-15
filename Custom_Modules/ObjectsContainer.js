import { GLTFLoader } from "./GLTFLoader"; // GLTF loader

class obj_API {
  constructor(Obj, mixer, actions_arr) {
    this.name = Obj.scene.name;
    this.animationMixer = mixer;
    this.actions_arr = actions_arr;
    this.obj = Obj.scene;
    this.currentAction = undefined;
    this.opt = {};
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
  set state(value) {
    if (this.currentAction) {
      this.currentAction.crossFadeTo(
        this.findActionByName(value),
        this.opt.transitionDuration || 0.5
      );
    }
    this.currentAction = this.findActionByName(value)
      .setLoop(this.opt.loop ? THREE.LoopPingPong : THREE.LoopOnce)
      .setDuration(this.opt.durationAnimation || 1)
      .reset()
      .play();
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

var ObjectsContainer = function() {
  ///////////////////////////
  //      PRIVATE
  ///////////////////////////
  var Object_arr = [];
  var loader = new GLTFLoader();
  var loadObject = function(PathToObject) {
    return new Promise(function(resolve, reject) {
      loader.load(
        PathToObject,
        Obj => {
          // SET NEAME EVERY OBJECT
          Obj.scene.name = PathToObject;
          resolve(Obj);
        },
        xhr => {
          console.log(Math.floor((xhr.loaded / xhr.total) * 100) + "% loaded");
        },
        error => {
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
  this.loadObjects = function(arr_names) {
    return new Promise(function(resolve, reject) {
      var counterLoad = 0;
      for (var i = 0; i < arr_names.length; i++)
        loadObject(arr_names[i]).then(obj_3dmodel => {
          Object_arr.push(ParseObj(obj_3dmodel));
          counterLoad++;
          if (counterLoad == arr_names.length) resolve(Object_arr);
        });
    });
  };
  // updateAnimations
  this.updateAnimations = function(delta) {
    for (var i = 0; i < Object_arr.length; i++)
      Object_arr[i].updateAnimations(delta);
  };
  //setPathToModels
  this.setPathToModels = function(pathToDirWith3dModels) {
    loader.setPath(pathToDirWith3dModels);
  };
};
export { ObjectsContainer };
