var database = require('../functions/database');
var utils = require('../functions/utils');
const experiences = require('../experiences');
var whatsapp = require('../functions/whatsapp');


module.exports = {
    checkMessage: async function(db, currentMsg) {
        const baseUrl = "https://enunsegundo.ucu.edu.uy";
        var users = await database.findUsersByCurrentMessage(db,currentMsg);
        for (let idx in users) {
            var user = users[idx];
            var chatId = user.chatId;
            var exp = experiences.getStoryFromStoryId(user.storyId);
            var message = exp.messages[currentMsg];
            var messageText = message.text;
            var now = utils.generateTimestamp();
            var interval = now - message.msgTime;
            var startTime = user.startTime;

            if (interval >= startTime) {
                if (!message.isFile) {
                    whatsapp.sendMessage(db, chatId, messageText);
                } else if (message.isFile) {
                    whatsapp.sendFile(db, chatId, message.fileName, baseUrl + message.url, message.text)
                }
                await database.updateUsersCurrentMessage(db, chatId, currentMsg);
                if (experiences.getTotalMsgByStoryId(user.storyId) - 1 == currentMsg) {
                    await database.deactivateUserByChatId(db, chatId);
                }
            }
        }
    },
    checkDelivered: async function(db) {
        var users = await database.findUsersActive(db);
        console.log(users.length);
        if (users != null) {
            var totalUser = users.length;
            console.log("Total Users: " + totalUser);
            var totalmessageSent = 0;
            var totalDeliveredMsg = 0;
            for (let idx in users) {
                var user = users[idx];
                var messageSent = user.messageSent;
                var deliveredMsg = user.deliveredMsg;
                totalmessageSent = totalmessageSent + messageSent;
                totalDeliveredMsg = totalDeliveredMsg + deliveredMsg;
            }
            var result = (totalmessageSent - totalDeliveredMsg) / totalUser;
            console.log("Result: " + result);
            return result;
        }
    }
}