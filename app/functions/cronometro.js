//funcion scheduler 
//aca van seteados los mensajes
/*module.exports = {
    startScheduler : function(cron){
        cron.schedule('* * * * * *', function(){
            console.log('running a task every 5 seconds');
        });
    }

};*/

module.exports = {
    checkMsj : function(db, wapp, idStory, numMsj){
        var query = {story: idStory, msjNumb: numMsj};
        var contactos = [];
        db.collection('usuarios').find(query).toArray(function(err, result) {
        if (err) throw err;
        else{
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var contacto = result[i];
                var idContact = contacto.idContact;
                console.log(idContact)
                wapp.sendMessage(idContact, 'hola');
                
    
            
            }
         
            }
        })

        


    }}



