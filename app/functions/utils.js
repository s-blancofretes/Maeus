module.exports = {
    splitPhone : function(id){
        var fields = id.split('@');
        var phone = fields[0];
        return phone;
    }};