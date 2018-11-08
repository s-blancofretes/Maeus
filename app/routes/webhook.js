const bodyParser = require('body-parser');
var utils = require('../functions/utils');
var whatsapp = require('../functions/whatsapp');
const experiences = require('../experiences');
var database = require('../functions/database');


module.exports = function(app, db) {
    //WEBHOOK
    app.post('/webhook', async(req, res) => {
        var reqJson = req.body;
        for (var i = 0; i < reqJson.messages.length; i++) {
            var message = reqJson.messages[i];
            var chatId = message.author;

            if (message.body == "Clave") {
                // var currentStory = experiencias.obtenerExperienciaSegunHoraDeInicio();
                //var currentStory = experiences.getStoryFromStartTime();
                var currentStory = 2;

                if (currentStory !== null) {
                    if (!await database.verifyUserIsInDb(db, chatId)) {
                        whatsapp.sendMessage(chatId, "Historias contadas por Whatsapp 📱 Próximamente acompañá a Olivia, Antón, Damián y Silvina");
                        await database.createNewUser(db, { chatId: chatId, storyId: currentStory.id });
                    } else if (await database.verifyUserIsActive(db, chatId)) {
                        whatsapp.sendMessage(chatId, "Ya estas siendo parte de la experiencia!");
                    } else if (await database.verifyUserIsInactive(db, chatId)) {
                        whatsapp.sendMessage(chatId, "Bienvenido nuevamente a la experiencia!");
                        await database.activateUserByChatId(db, chatId);
                    }

                }

                res.json({
                    ok: true
                })
            }
        }
    });

};