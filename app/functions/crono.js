var check = require('../functions/checkMessages');
module.exports = {
    crono: function(db) {
        setInterval(function() {
            check.checkMessage(db, 1, 0);
            check.checkMessage(db, 1, 1);
        }, 10000);
    }
}

//