import $ from "../Custom_Modules/jQuery";
class tips {
    constructor(){
        this.elem = $('<div class="tips">Some text here<div>')
        this.elem.css({
            position:"absolute",
            fontFamily:"Courier New",
            width:"40%",
            background:"rgba(10,10,10,0.9)",
            left:"50%",
            transform: "translateX(-50%)",
            bottom:"-100px",
            borderRadius:"20px",
            textAlign:"center",
            fontSize:"30px",
            padding:"20px",
            boxShadow:"0px 2px 20px 2px rgba(255,255,255,0.5)",
            transition:"all 0.3s ease-in-out 0.1s",
        })
        $('body').append(this.elem)
    }
    show(){
        this.elem.css({fontSize:"20px"})
        this.elem.css({bottom:"20px"})
    }
    hide(){
        this.elem.css({bottom:"-60px",fontSize:"0"})
    }
    setText(message){
        this.elem.css({fontSize:"0"})
        this.hide();
        setTimeout(()=>{
            this.elem.html(message);
            this.elem.css({fontSize:"20px"})
            this.show();
        },700)
    }
}
export {tips}