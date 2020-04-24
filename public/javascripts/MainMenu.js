
// REFERENCE TO GLOBAL SCOPE ON SCENE

class Menu{
  constructor(){
    this.setup = {
      start_position:undefined,
      end_position:undefined,
      ppo_control:undefined,
      modes:undefined,
    };
    this.map = {
    walk_war_ppk:1,
    walk_deployed_ppk:2,
    war_walk_ppk:3,
    war_deployed_ppk:4,
    deployed_walk_ppk:5,
    deployed_war_ppk:6,
    walk_war_ppo:7,
    walk_deployed_ppo:8,
    war_walk_ppo:9,
    war_deployed_ppo:10,
    deployed_walk_ppo:11,
    deployed_war_ppo:12,
    }
    ////////////////////////////
    //    HANDLE EVENTS  
    ///////////////////////////
    $('iframe').on("load",()=>{ 
      console.log("is load");
      window.winFrame = $('iframe').prop("contentWindow") 
    })
    $('#start_position input').on('click',(e)=>{
      $(`#end_position input`).prop('disabled',false);
      $(`#end_position #${e.target.value}`).prop('checked',false);
      if (this.setup.end_position == e.target.value) this.setup.end_position = undefined;
      $(`#end_position #${e.target.value}`).prop('disabled',true);
    })
    
    $('#menu input').on('click',(e)=>{
      this.setup[e.target.name] = e.target.value;
      console.log(this.setup);
    })
    
    $('#start_button').on('click',()=>{
      if(this.checkSetup()){
        var str_descr_regimes = `${this.setup.start_position}_${this.setup.end_position}_${this.setup.ppo_control}`;
        alert(this.map[str_descr_regimes])
      }
    })
  }
  checkSetup(){
    for (var k_i in this.setup) if (!this.setup[k_i]) return false; 
    return true;
  }
}
new Menu();