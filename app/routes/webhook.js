const bodyParser = require('body-parser');
var utils = require('../functions/utils')
var whatsapp = require('../functions/whatsapp')
const experiencias = require('../experiencias');

//archivo para los insert de la base de datos
var database = require('../functions/database')


module.exports = function(app, db) {
    //WEBHOOK
    app.post('/webhook', async(req, res) => {
        var reqJson = req.body;
        for (var i = 0; i < reqJson.messages.length; i++) {
            var message = reqJson.messages[i];
            var chatId = message.author;

            if (message.body == "Clave") {

                // var currentStory = experiencias.obtenerExperienciaSegunHoraDeInicio();
                var currentStory = experiencias.getStoryFromStartTime();

                if (currentStory !== null) {
                    if (!await database.verifyUserIsActive(db, chatId)) {
                        whatsapp.sendMessage(chatId, "Historias contadas por Whatsapp 📱 Próximamente acompañá a Olivia, Antón, Damián y Silvina");
                        await database.createNewUser(db, { chatId: chatId, storyId: currentStory.id });
                    } else {
                        whatsapp.sendMessage(chatId, "Uste ya eta registrado :(");
                    }

                }

                res.json({
                    ok: true
                })
            }
        }
    });
};