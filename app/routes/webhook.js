const bodyParser = require('body-parser');
var utils = require('../functions/utils')
var whatsapp = require('../functions/whatsapp')

//archivo para los insert de la base de datos
var database = require('../functions/database')

//necesarion para que funcione el chequeo de msj y envio 
//var cron = require('node-cron');
//archivo con Scheduler
var startExperience = require('../functions/cronometro')

//archivo verificador
var verificador = require('../functions/checkingMsj')



module.exports = function(app, db) {
    //WEBHOOK
    app.post('/webhook', (req, res) => {
        var reqJson = req.body;
        for (var i = 0; i < reqJson.messages.length; i++) {
            var message = reqJson.messages[i];

            if (message.body == "Clave") {
                //whatsapp.sendMessage(message.author,"Respuesta Superautomatica")
                whatsapp.sendFile(message.author, 'Currywurst', 'https://ais.kochbar.de/kbrezept/515109_897054/620x465/currywurst-gulasch-mit-backkartoffeln-rezept-bild-nr-4945.jpg')
                var cellphone = utils.splitPhone(message.author);
                //Aca va la persistencia a la DB 
                //guardamos en esta variable el resultado si dio error o no 
                var respuesta = database.dbCreateNewUser(db, cellphone, message.author, 1, 1, message.time);

                //Seteo del Cron 
                //schedulerCrono.startScheduler(cron);


                console.log("Phone: " + utils.splitPhone(message.author));
                console.log("Timestamp: " + message.time);
                //mandamos las variables db y whatsapp para poder acceder a sus funciones desde el otro script
                //funcion cronometro que va a verificar cada un intervalo 
                //de tiempo quien esta en la historia 1 y mensaje 1
                startExperience.cronometro(db, whatsapp, verificador, 1);

                res.send(respuesta)
            }
        }
    });
};