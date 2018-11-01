module.exports = {
    splitPhone: function(id) {
        var fields = id.split('@');
        var phone = fields[0];
        return phone;
    },
    generateTimestamp: function() {
        var date = new Date();
        var now = Math.floor(date.getTime() / 1000);
        return now;
    }

};