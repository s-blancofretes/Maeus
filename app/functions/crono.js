var check = require('../functions/checkMessages');
var wapp = require('../functions/whatsapp');
var utils = require('../functions/utils');
module.exports = {
    crono: function(db) {
        utils.interval(function() {
            check.checkMessage(db, 2, 0);
            check.checkMessage(db, 2, 1);
            check.checkMessage(db, 2, 2);
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
            check.checkMessage(db, 2, 16);
            check.checkMessage(db, 2, 17);
            check.checkMessage(db, 2, 18);
            check.checkMessage(db, 2, 19);
            check.checkMessage(db, 2, 20);
            check.checkMessage(db, 2, 21);
            check.checkMessage(db, 2, 22);
            check.checkMessage(db, 2, 23);
            check.checkMessage(db, 2, 24);
            check.checkMessage(db, 2, 25);
            check.checkMessage(db, 2, 26);
            check.checkMessage(db, 2, 27);
            check.checkMessage(db, 2, 28);
            check.checkMessage(db, 2, 29);
            check.checkMessage(db, 2, 30);
            check.checkMessage(db, 2, 31);
            check.checkMessage(db, 2, 32);
            check.checkMessage(db, 2, 33);
            check.checkMessage(db, 2, 34);
            check.checkMessage(db, 2, 35);
            check.checkMessage(db, 2, 36);
            check.checkMessage(db, 2, 37);
            check.checkMessage(db, 2, 38);
        }, 10000);
        setInterval(function() {
            wapp.blockcheck();
        }, 300000);
        setInterval(function() {
            wapp.sendMessagecheck();
        }, 300000)
    }
}