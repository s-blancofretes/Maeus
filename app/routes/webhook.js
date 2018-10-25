const bodyParser = require('body-parser');
var utils = require('../functions/utils')
var whatsapp = require('../functions/whatsapp')
const experiencias = require('../experiencias');

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
    app.post('/webhook', async(req, res) => {
        var reqJson = req.body;
        for (var i = 0; i < reqJson.messages.length; i++) {
            var message = reqJson.messages[i];

            if (message.body == "Clave") {

                whatsapp.sendFile(message.author, 'Currywurst', 'https://ais.kochbar.de/kbrezept/515109_897054/620x465/currywurst-gulasch-mit-backkartoffeln-rezept-bild-nr-4945.jpg')

                var cellphone = utils.splitPhone(message.author);
                var author = utils.splitPhone(message.author);
                var time = message.time;
                var experienciaActual = experiencias.obtenerExperienciaSegunHoraDeInicio();

                if (experienciaActual !== null) {
                    await database.dbCreateNewExperience(db, { numeroMovile: cellphone, idExperiencia: experienciaActual.id });
                }

                console.log("Phone: " + utils.splitPhone(message.author));
                console.log("Timestamp: " + message.time);

                res.json({
                    ok: true
                })
            }
        }
    });
};