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
    },
    findUsersByStoryIdAndCurrentMessage: async function(db, storyId, currentMsg) {
        var query = { storyId: storyId, currentMsg: currentMsg };
        var result = await db.collection('users').find(query).toArray();
        return result;
    },

    updateUsersCurrentMessage: async function(db, chatId, currentMsg) {
        var query = { chatId: chatId };
        var updateMsg = currentMsg + 1;
        var updateQuery = { currentMsg: updateMsg};

        //await db.collection('users').findAndModify({ query }, { $set: updateQuery })
        await db.collection('users').update( query, {$set : updateQuery})
    }

}