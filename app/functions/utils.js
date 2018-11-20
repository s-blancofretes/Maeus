module.exports = {
    splitPhone: function(id) {
        var fields = id.split('@');
        var phone = fields[0];
        return phone;
    },
    generateTimestamp: function() {
        var date = new Date();
        var now = Math.floor(date.getTime() / 1000);
        return now;
    },
    interval: function(func, wait, times){
        var interv = function(w, t){
            return function(){
                if(typeof t === "undefined" || t-- > 0){
                    setTimeout(interv, w);
                    try{
                        func.call(null);
                    }
                    catch(e){
                        t = 0;
                        throw e.toString();
                    }
                }
            };
        }(wait, times);
    
        setTimeout(interv, wait);
    }
};