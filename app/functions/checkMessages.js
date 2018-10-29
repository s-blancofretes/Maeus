var database = require('../functions/database');
const experiences = require('../experiences');
var whatsapp = require('../functions/whatsapp');
var utils = require('../functions/utils');

module.exports = {
    checkMessage: async function(db, storyId, currentMsg) {
        var users = await database.findUsersByStoryIdAndCurrentMessage(db, storyId, currentMsg);
        for (let idx in users) {
            var user = users[idx];
            var chatId = user.chatId;
            var message = experiences.getStoryFromStoryId(storyId).messages[currentMsg];
            var messageText = message.text;
            var now = utils.generateTimestamp();
            var interval = now - message.msgTime;
            var startTime = user.startTime;

            if(interval>=startTime){
                whatsapp.sendMessage(chatId, messageText);
                await database.updateUsersCurrentMessage(db, chatId, currentMsg);
            }


        }


    }

}