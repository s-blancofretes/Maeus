//funcion scheduler 
//aca van seteados los mensajes
module.exports = {
    startScheduler : function(cron){
        cron.schedule('*/5 * * * * *', function(){
            console.log('running a task every 5 seconds');
        });
    }

};



