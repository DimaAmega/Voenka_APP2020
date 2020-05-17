import $ from "./jQuery";
class modalWindow {
    constructor(){
        this.wrapper = $('<div></div>')
        this.wrapper.css({
            position:"absolute",
            fontFamily:"Courier New",
            width:"100vw",
            height:"100vh",
            background:"rgba(20,20,20,0.7)",
            textAlign:"center",
            fontSize:"30px",
            padding:"20px",
            color:"white",
            padding:0,
            transition:"all 0.3s ease-in-out 0.1s",
            zIndex:5
        });
        this.internalBlock = $('<div></div>')
        this.internalBlock.css({
            position:"absolute",
            width:"50vw",
            padding:"30px",
            background:"rgba(10,10,10,0.9)",
            borderRadius: "10px",
            left:"50%",
            top:"50%",
            transform:"translate(-50%, -50%)"
        });
        this.wrapper.append(this.internalBlock);
        $('body').append(this.wrapper);
    }
    hide(){
        this.wrapper.css({display:"none"})
        return this;
    }
    show(){
        this.wrapper.css({display:"block"})
        return this;
    }
    setText(text){
        this.internalBlock.empty();
        this.internalBlock.append(text);
        return this;
    }
}
export {modalWindow }