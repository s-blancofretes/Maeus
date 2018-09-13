//funcion scheduler 
//aca van seteados los mensajes
/*module.exports = {
    startScheduler : function(cron){
        cron.schedule('* * * * * *', function(){
            console.log('running a task every 5 seconds');
        });
    }

};*/
//Funcion que chequea cada un periodo de tiempo determindado en que msj e historia esta c/uno
module.exports = {
    cronometro: function(db, wapp, check, datetime, idStory) {
        //funcion que chequea que usuarios estan en la historia 1 en este caso, msj 1 y a esos se les manda
        //el mensaje hello, setear tiempo xa el msj 
        check.checkMsj(db, wapp, datetime, idStory, 1, 'hello', 60);
    }
}

//