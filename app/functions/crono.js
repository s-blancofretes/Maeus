var check = require('../functions/checkMessages');
var wapp = require('../functions/whatsapp');
var utils = require('../functions/utils');
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
        setInterval(async function() {
            var res = await check.checkDelivered(db);
            console.log("check delivered:" + res);
            if (res > 2) {
                console.log("reboot api crono");
                wapp.rebootApi();
            }
        }, 300000)
    }
}