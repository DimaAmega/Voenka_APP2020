
// REFERENCE TO GLOBAL SCOPE ON SCENE

class Menu{
  constructor(){
    this.setup = {
      start_position:undefined,
      control:undefined,
      modes:undefined,
    };
    this.isOpen = 0;
    this.map = {
      down_supports_ppo:0,
      up_tpk_ppo:1,
      up_supports_ppo:2,
      down_tpk_ppo:3,
      down_supports_ppu:4,
      up_supports_ppu:5,
      down_tpk_ppu:6,
      up_tpk_ppu:7,
    }
    ////////////////////////////
    //    HANDLE EVENTS  
    ///////////////////////////
    $('iframe').on("load",()=>{ 
      window.winFrame = $('iframe').prop("contentWindow") 
      window.winFrame.app.readyEvent().then(()=>{
        $('#cube-loader').css({opacity:0});
        setTimeout(()=>{
          $('#cube-loader').css({display:"none"})
          this.show();
          window.SM = window.winFrame.SM;
        },1000)
      })
    })
    ////////////////////////////
    //    MENU SETTINGS  
    ///////////////////////////

    $('#menu input').on('click',(e)=>{
      this.setup[e.target.name] = e.target.value;
      console.log(this.setup);
    })
    
    $('#start_button').on('click',()=>{
      if(this.checkSetup()){
        var str_descr_regimes = `${this.setup.start_position}_${this.setup.control}`;
        window.winFrame.app.selectMode(this.map[str_descr_regimes],this.setup.modes);
        window.winFrame.mw.hide();
        $("#hamburger").click();
      }
    })
  }
  checkSetup(){
    for (var k_i in this.setup) if (!this.setup[k_i]) return false; 
    return true;
  }
  show(){
    $('#regimes').css({animation: "fadeInMenu 0.7s 1 ease-in-out forwards"})
    $('iframe').css({animation: "blurBackground .5s 1 ease-in forwards", zIndex:-1})
  }
  hide() {
    $('#regimes').css({animation: "fadeOutMenu 0.7s 1 ease-in-out forwards"})
    $('iframe').css({animation: "unBlurBackground .5s 1 ease-in forwards", zIndex: 0})
  }
  burgerClick(){
  if (this.isOpen ===1) menu.show();
  else menu.hide();
  this.isOpen = (this.isOpen+1)%2;
  }
}
let menu = new Menu();
$("#hamburger").click(()=>{menu.burgerClick()})