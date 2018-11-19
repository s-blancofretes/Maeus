var database = require('../functions/database');
const experiences = require('../experiences');
var whatsapp = require('../functions/whatsapp');
var utils = require('../functions/utils');

module.exports = {
    checkMessage: async function(db, storyId, currentMsg) {
        const baseUrl = "https://enunsegundo.ucu.edu.uy";
        var users = await database.findUsersByStoryIdAndCurrentMessage(db, storyId, currentMsg);
        for (let idx in users) {
            var user = users[idx];
            var chatId = user.chatId;
            var exp = experiences.getStoryFromStoryId(storyId);
            var message = exp.messages[currentMsg];
            var messageText = message.text;
            var now = utils.generateTimestamp();
            var interval = now - message.msgTime;
            var startTime = user.startTime;

            if (interval >= startTime) {
                if (!message.isFile) {
                    whatsapp.sendMessage(chatId, messageText);
                } else if (message.isFile) {
                    whatsapp.sendFile(chatId, message.fileName, baseUrl + message.url, message.text)
                }

                await database.updateUsersCurrentMessage(db, chatId, currentMsg);
                if (exp.totalMsg - 1 == currentMsg) {
                    await database.deactivateUserByChatId(db, chatId);
                }
            }
        }
    },
    checkDelivered: async function(db) {
        var users = await database.findUsersActive(db);
        var totalUser = users.length;
        var totalCurrentMsg = 0;
        var totalDeliveredMsg = 0;
        for (let idx in users) {
            var user = users[idx];
            var currentMsg = user.currentMsg;
            var deliveredMsg = user.deliveredMsg;
            totalCurrentMsg = totalCurrentMsg + currentMsg;
            totalDeliveredMsg = totalDeliveredMsg + deliveredMsg;
        }
        var result = (totalCurrentMsg - totalDeliveredMsg) / totalUser;
        return result;
    }
}