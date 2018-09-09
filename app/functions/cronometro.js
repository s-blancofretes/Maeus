//funcion scheduler 
//aca van seteados los mensajes
/*module.exports = {
    startScheduler : function(cron){
        cron.schedule('* * * * * *', function(){
            console.log('running a task every 5 seconds');
        });
    }

};*/
//Funcion que chequea si existen contactos que esten en la historia 1 y hayan recibido mensaje 1
module.exports = {
    checkMsj : function(db, wapp, idStory, numMsj){
        //query que contiene los datos que queremos averiguar
        var query = {story: idStory, msjNumb: numMsj};
        //accedemos a la base de datos 
        db.collection('usuarios').find(query).toArray(function(err, result) {
        if (err) throw err;
        else{
            console.log(result);
            //for que recorre el array de contactos que cumplen con esas condiciones
            for (var i = 0; i < result.length; i++) {
                var contacto = result[i];
                var idContact = contacto.idContact;
                console.log(idContact)
                //funcion del archivo whatapp que manda un mensaje
                wapp.sendMessage(idContact, 'hola');
                
    
            
            }
         
            }
        })

        


    }}



