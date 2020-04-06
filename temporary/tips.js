import $ from "../Custom_Modules/jQuery";
class tips{
    constructor(){
        this.elem = $('<div class="tips">Some text here<div>')
        this.elem.css({
            position:"absolute",
            width:"70%",
            background:"rgba(40,40,40,0.7)",
            left:"15%",
            top:"-100px",
            borderRadius:"20px",
            textAlign:"center",
            fontSize:"20px",
            padding:"20px",
            boxShadow:"0px 2px 20px 2px rgba(255,255,255,0.5)",
            transition:"all 0.5s ease-in-out 0.2s",
        })
        $('body').append(this.elem)
    }
    show(){
        this.elem.css({fontSize:"20px"})
        this.elem.css({top:"10px"})
    }
    hide(){
        this.elem.css({top:"-100px",fontSize:"0"})
    }
    setText(message){
        this.elem.css({fontSize:"0"})
        setTimeout(()=>{
            this.elem.html(message);
            this.elem.css({fontSize:"20px"})
        },700)
    }
}
export {tips}