import {GLTFLoader} from "./GLTFLoader"; 		   // GLTF loader
var loader = new GLTFLoader();
loader.setPath("/3dModels/")

var loadObject = function(PathToObject,opt) {
        return new Promise(function(resolve, reject) {
            loader.load(
            PathToObject,																																																									
            (Obj)=>{ // ONLOAD FUNCTION
                var animations_arr = []
                var mixer = new THREE.AnimationMixer( Obj.scene);
                var clips = Obj.animations;
                for (var c_i in clips) { 
                    var action = mixer.clipAction(THREE.AnimationClip.findByName(clips,clips[c_i].name));	
                    action.clampWhenFinished = true;
                    action.setLoop( (opt.loop) ? false : THREE.LoopOnce);
                    action.setDuration(opt.duration);
                    animations_arr.push({name:clips[c_i].name,play:()=>{action.play()},stop:()=>{action.stop()}});
                };  
                var res = {name:PathToObject,
                            animationMixer:mixer,
                            animations_arr:animations_arr,
                            obj:Obj.scene
                    };
                resolve(res);
            },
            (xhr)=>{console.log( ( Math.floor(xhr.loaded / xhr.total * 100 )) + '% loaded')}, // ONPROGRESS FUNCTION
            (error)=>{console.error( error); reject(error)} // ONERROR FUNCTION
            );
          });



};

export {loadObject}