var database = require('../functions/database');
const experiences = require('../experiences');
var whatsapp = require('../functions/whatsapp');

module.exports = {
    checkMessage: async function(db, storyId, currentMsg) {
        var users = await database.findUsersByStoryIdAndCurrentMessage(db, storyId, currentMsg);
        for (let idx in users) {
            var user = users[idx];
            var chatId = user.chatId;
            var message = experiences.getStoryFromStoryId(storyId).messages[currentMsg].text;
            whatsapp.sendMessage(chatId, message);
            await database.updateUsersCurrentMessage(db, chatId, currentMsg);
        }


    }

}