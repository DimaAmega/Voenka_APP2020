function timer()    {
    var timer = 0,
        timerId,
        elem = document.getElementById('timer_container');
        
    ///////////////////////////
    //      PRIVATE
    ///////////////////////////
    function updateTimer(){
        timer +=0.1;
        elem.innerHTML = timer.toFixed(1);
    }
    ///////////////////////////
    //      PUBLIC
    ///////////////////////////
    this.startTimer = function()  {
        timerId = setInterval(updateTimer.bind(this),100);
        elem.style.padding = "20px";
        elem.innerHTML = "0";
    };
    this.stopTimer = function() {  
        clearTimeout(timerId);
        var res = Number((timer - 0.1).toFixed(2));
        elem.innerHTML = "";
        elem.style.padding = "0";
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