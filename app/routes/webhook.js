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
        if (reqJson.messages) {
            for (var i = 0; i < reqJson.messages.length; i++) {
                const EusPhone = "091940835";
                var message = reqJson.messages[i];
                var chatId = message.author; //porq tomamos el autor y no de una el chatid?

                if (message.body == "En un segundo") {
                    // var currentStory = experiencias.obtenerExperienciaSegunHoraDeInicio();
                    var currentStory = experiences.getStoryFromStartTime();

                    if (currentStory !== null) { //no entiendo esta condicion inicial
                        if (!await database.verifyUserIsInDb(db, chatId)) {
                            await whatsapp.sendMessage(db, chatId, "Gracias por participar de la experiencia. Agrega este celular 📱como contacto: " + EusPhone + " y comenza a vivir *En un segundo* 🕓");
                            await database.createNewUser(db, { chatId: chatId, storyId: currentStory.id });
                        } else if (await database.verifyUserIsActive(db, chatId)) {
                            await whatsapp.sendMessage(db, chatId, "Ya estas siendo parte de la experiencia!");
                        } else if (await database.verifyUserIsInactive(db, chatId)) {
                            await whatsapp.sendMessage(db, chatId, "Bienvenido nuevamente a la experiencia!");
                            await database.updateUsersStoryId(db, chatId, currentStory.id);
                            await database.activateUserByChatId(db, chatId);
                        }
                    }
                } else if (message.body == "Detener") {
                    if (await database.verifyUserIsActive(db, chatId)) {
                        await database.deactivateUserByChatId(db, chatId);
                        await whatsapp.sendMessage(db, chatId, "Experiencia detenida 😭");
                    } else {
                        await whatsapp.sendMessage(db, chatId, "No estas en una experiencia, por lo tanto no hay nada que detener 🤷");
                    }
                } else if (await database.verifyUserIsInCurrentMsg(db, chatId)) {
                    var token = await experiences.getDialogflowTokenFromChatId(db, chatId);
                    var response = dialogflow.sendMessage(db, chatId, message.body, token);
                }
            }
        }
        if (reqJson.ack) {
            for (var i = 0; i < reqJson.ack.length; i++) {
                var ackMsg = reqJson.ack[i];
                var chatId = ackMsg.chatId;
                var status = ackMsg.status;
                console.log(status);
                if (await database.verifyUserIsActive(db, chatId)) {
                    if (status == "delivered") {
                        await database.updateUsersDeliveredMessage(db, chatId);
                    }
                }
            }
        }
    });

}