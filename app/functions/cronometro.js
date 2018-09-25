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
    cronometro: function(db, wapp, check, idStory) {
        //funcion que chequea que usuarios estan en la historia 1 en este caso, msj 1 y a esos se les manda
        //el mensaje hello, setear tiempo xa el msj 
        function intervalFunc() {
            check.checkMsj(db, wapp,idStory, 1, 'hello1', 60);
            check.checkMsj(db, wapp,idStory, 2, 'hello2', 60);
            check.checkMsj(db, wapp,idStory, 3, 'hello3', 60);

          }
        setInterval(intervalFunc, 20000);
    }


}

//