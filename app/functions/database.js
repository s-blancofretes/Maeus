module.exports = {
    createNewUser: async function(db, { chatId, storyId }) {
        const user = {
            chatId,
            startTime: new Date(),
            currentMsg: 0,
            lastMsgTime: null,
            active: true,
            storyId
        };

        return await db.collection('users').insert(user);
    },
    findUserByChatId: async function(db, chatId) {
        var query = { chatId: chatId };
        var result = await db.collection('users').find(query).limit(1).toArray();
        return result;
    },
    verifyUserIsActive: async function(db, chatId) {
        var query = { chatId: chatId, active: true };
        var result = await db.collection('users').find(query).limit(1).toArray();
        if (result.length > 0) {
            return true
        } else return false;
    }
}