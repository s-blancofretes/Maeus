module.exports = {
    checkMsj : function(db, wapp, idStory, numMsj, msg){
        //query que contiene los datos que queremos averiguar
        var query = {story: idStory, msjNumb: numMsj};
        var newNumMsj = numMsj+ 1 
        var updateQuery = {msjNumb : newNumMsj}
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
                wapp.sendMessage(idContact, msg);

            }
         
            }
        })
        //esto no esta funcionando, salta error
        db.collection('usuarios').updateMany(
            query, 
            {$set: updateQuery},
            (err, result) => {
            if (err) { 
              console.log({ 'error': 'An error has occurred' }); 
            } else {
              console.log(result);
            }
          });
    }}