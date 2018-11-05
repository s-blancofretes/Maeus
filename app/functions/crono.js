var check = require('../functions/checkMessages');
var wapp = require('../functions/whatsapp');
module.exports = {
    crono: function(db) {
        setInterval(function() {
            check.checkMessage(db, 1, 0);
            check.checkMessage(db, 1, 1);
        }, 10000);
        setInterval(function() {
            wapp.blockcheck();
        }, 300000);
        setInterval(function() {
            wapp.sendMessagecheck();
        }, 60000)
    }
}