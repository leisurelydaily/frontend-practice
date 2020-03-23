let moment = require("moment");

let timer={
    _start:undefined,
    _last:undefined,
    start:function(){
        this._start=moment();
    },
    now:function(){
        this._last=moment();
    },
    duration:function(){
        return moment().diff(this._start)+"ms:";
    },
    interval:function(){
        return moment().diff(this._last)+"ms:";
    },
    log:function(){
        const[type,...args]=arguments;
        switch (type){
            case "dur":
                console.log(this.duration(),...args);
                break;
            case "int":
                console.log(this.interval(),...args);
                break;
            default:
                console.log(this.duration(),...arguments);
        }
    },
    sleep:async function(tim){
        await new Promise(r=>setTimeout(()=>r(1),tim));
    }
}

module.exports=timer;