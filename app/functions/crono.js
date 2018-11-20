var check = require('../functions/checkMessages');
var wapp = require('../functions/whatsapp');
var utils = require('../functions/utils');
var database = require('../functions/database');
const experiences = require('../experiences');

module.exports = {
    crono: function(db) {
        utils.interval(function() {
            var story = experiences.getStoryFromStartTime();
            for (i = 0; i < story.messages.length; i++) {
                check.checkMessage(db, i)
            }
        }, 10000);
        setInterval(function() {
            wapp.blockcheck();
        }, 300000);
        setInterval(function() {
            wapp.sendMessagecheck();
        }, 300000)
        utils.interval(async function() {
            var res = await check.checkDelivered(db);
            if (res > 2) {
                console.log("Rebooting API");
                await wapp.rebootApi(db);
            }
        }, 480000)
    }
}