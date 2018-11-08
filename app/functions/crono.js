var check = require('../functions/checkMessages');
var wapp = require('../functions/whatsapp');
module.exports = {
    crono: function(db) {
        setInterval(function() {
            check.checkMessage(db, 2, 0);
            check.checkMessage(db, 2, 1);
            check.checkMessage(db, 2, 3);
            check.checkMessage(db, 2, 4);
            check.checkMessage(db, 2, 5);
            check.checkMessage(db, 2, 6);
            check.checkMessage(db, 2, 7);
            check.checkMessage(db, 2, 8);
            check.checkMessage(db, 2, 9);
            check.checkMessage(db, 2, 10);
            check.checkMessage(db, 2, 11);
            check.checkMessage(db, 2, 12);
            check.checkMessage(db, 2, 13);
            check.checkMessage(db, 2, 14);
            check.checkMessage(db, 2, 15);
        }, 10000);
        setInterval(function() {
            wapp.blockcheck();
        }, 300000);
        setInterval(function() {
            wapp.sendMessagecheck();
        }, 60000)
    }
}