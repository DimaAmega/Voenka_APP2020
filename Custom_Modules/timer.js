function timer()    {
    var timer = 0,
        timerId;
        
    ///////////////////////////
    //      PRIVATE
    ///////////////////////////
    function updateTimer(){
        timer +=0.1;
        timer = Number(timer.toFixed(2));
        // console.log(timer);
    }
    ///////////////////////////
    //      PUBLIC
    ///////////////////////////
    this.startTimer = function()  {
        timerId = setInterval(updateTimer.bind(this),100);
    };
    this.stopTimer = function() {  
        clearTimeout(timerId);
        var res = Number((timer - 0.1).toFixed(2));
        return res;
    };
    this.getTime = function() {
        return Number(timer.toFixed(2));
    }
    this.resetTimer = function(){
        timer = 0;
    }
}
export {timer}