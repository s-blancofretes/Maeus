const bodyParser = require('body-parser');
var utils = require('../functions/utils');
var whatsapp = require('../functions/whatsapp');
const experiences = require('../experiences');
var database = require('../functions/database');
var dialogflow = require('../functions/dialogflow');


module.exports = function(app, db) {
    //WEBHOOK
    app.post('/webhook', async(req, res) => {
        console.log("webhook recieve :" + JSON.stringify(req.body));

        res.json({
            ok: true
        });

        var reqJson = req.body;
        for (var i = 0; i < reqJson.messages.length; i++) {
            var message = reqJson.messages[i];
            var chatId = message.author;

            if (message.body == "Clave") {
                // var currentStory = experiencias.obtenerExperienciaSegunHoraDeInicio();
                var currentStory = experiences.getStoryFromStartTime();

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
            } else if (await database.verifyUserIsActive(db, chatId)) {
                var token = await experiences.getDialogflowTokenFromChatId(db, chatId);
                var response = dialogflow.sendMessage(chatId, message.body, token);
            }
        }
    });

};