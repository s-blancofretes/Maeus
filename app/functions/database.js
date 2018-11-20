var utils = require('../functions/utils');
module.exports = {
    createNewUser: async function(db, { chatId, storyId }) {
        const user = {
            chatId,
            startTime: utils.generateTimestamp(),
            currentMsg: 0,
            deliveredMsg: 0,
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
    verifyUserIsInactive: async function(db, chatId) {
        var query = { chatId: chatId, active: false };
        var result = await db.collection('users').find(query).limit(1).toArray();
        if (result.length > 0) {
            return true
        } else return false;
    },
    verifyUserIsInDb: async function(db, chatId) {
        var query = { chatId: chatId };
        var result = await db.collection('users').find(query).limit(1).toArray();
        if (result.length > 0) {
            return true
        } else return false;
    },
    findUsersByStoryIdAndCurrentMessage: async function(db, storyId, currentMsg) {
        var query = { storyId: storyId, currentMsg: currentMsg, active: true };
        var result = await db.collection('users').find(query).toArray();
        return result;
    },
    findUsersActive: async function(db) {
        var query = { active: true };
        var result = await db.collection('users').find(query).toArray();
        return result;
    },

    updateUsersCurrentMessage: async function(db, chatId, currentMsg) {
        var query = { chatId: chatId };
        var updateMsg = currentMsg + 1;
        var updateQuery = { currentMsg: updateMsg };

        //await db.collection('users').findAndModify({ query }, { $set: updateQuery })
        await db.collection('users').update(query, { $set: updateQuery });
    },
    deactivateUserByChatId: async function(db, chatId) {
        var query = { chatId: chatId };
        var updateQuery = { active: false, currentMsg: 0, deliveredMsg: 0 };
        await db.collection('users').update(query, { $set: updateQuery });
    },
    activateUserByChatId: async function(db, chatId) {
        var now = utils.generateTimestamp();
        var query = { chatId: chatId };
        var updateQuery = { active: true, startTime: now };
        await db.collection('users').update(query, { $set: updateQuery });
    },
    updateUsersDeliveredMessage: async function(db, chatId) {
        var query = { chatId: chatId };
        await db.collection('users').update(query, { $inc: { deliveredMsg: 1 } });
    },

}