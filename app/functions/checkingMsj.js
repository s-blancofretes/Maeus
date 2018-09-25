module.exports = {
    checkMsj: function(db, wapp, idStory, numMsj, msg, timeMsj) {


        //tiempo actual
        var date = new Date();
        console.log("hora normal:" + date);
        
        //te devuelve en milisegundos con respecto al utc0
        //+ sacamos los 3 ultimos digitos que no son necesarios, timestamp es en segundos
        var now = Math.floor(date.getTime()/1000)
        console.log("hora actual: "+now);

        var intervalo = now - timeMsj;
        console.log("intervalo: " + intervalo);
        //query que contiene los datos que queremos averiguar
        var query = { story: idStory, msjNumb: numMsj }; //msjTime: };//now-msjTime<=timeMsj
        var newNumMsj = numMsj + 1
        var updateQuery = { msjNumb: newNumMsj }

        //chequea que cumple con la condicion
        var condicionOk = 0;
            //accedemos a la base de datos 
        db.collection('usuarios').find(query).toArray(function(err, result) {
                if (err) throw err;
                else {
                    console.log(result);
                    //for que recorre el array de contactos que cumplen con esas condiciones
                    for (var i = 0; i < result.length; i++) {
                        var contacto = result[i];
                        var currentIdContact = contacto.idContact;
                        var msjTimeInicial = contacto.msjTime;
                        
                        console.log("tiempo cuando inicio la exp "+ msjTimeInicial);
                        if (msjTimeInicial >= intervalo) {
                            
                            console.log(currentIdContact);
                            //funcion del archivo whatapp que manda un mensaje
                            wapp.sendMessage(currentIdContact, msg);
                            //actualiza la db
                            //te crea otro elemento entonces no sigue con el otro proceso 
                            //db.collection('usuarios').save( { _id: contacto._id, msjNumb: newNumMsj} );
                            //

                            //esto no funciona, no actualiza la base de datos
                            /*db.collection('usuarios').update({ idContact: currentIdContact }, { $set: updateQuery },
                                (err, result) => {
                                    if (err) {
                                        console.log({ 'error': 'An error has occurred' });
                                    } else {
                                        console.log(result);
                                    }});*/
                        } 
                        
                        else {
                            console.log("no cumple con la condición de tiempo");
                        }

                    }

                }
            })
            //update en el usuario que cumplen con las condiciones 
            //se suma 1 al numero de msj

           //esto funcionaba pero no considera que no cumplio con la condicion de tiempo, actualiza a todos 
        /*db.collection('usuarios').updateMany(
            query, { $set: updateQuery },
            (err, result) => {
                if (err) {
                    console.log({ 'error': 'An error has occurred' });
                } else {
                    condicionOk = 0
                    console.log(result);
                }
            });}*/
    }
}