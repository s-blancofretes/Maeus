var apiai = require("apiai");
var whatsapp = require('../functions/whatsapp');
//var appOlivia = apiai("f2c76dd2bad6464db2e32febf8de6281");


module.exports = {
    //Function to send message to dialogflow api and get the answer
    sendMessage: function(chatId, message, token) {
        var app = apiai(token);

        var options = {
            sessionId: chatId
        };

        var request = app.textRequest(message, options);

        request.on('response', function(response) {
            whatsapp.sendMessage(chatId, response.result.fulfillment.speech);
            return response.result.fulfillment.speech;
        });

        request.on('error', function(error) {
            console.log(error);
        });

        request.end();

    }
}