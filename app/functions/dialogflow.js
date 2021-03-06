var apiai = require("apiai");
var whatsapp = require('../functions/whatsapp');
//var appOlivia = apiai("f2c76dd2bad6464db2e32febf8de6281");


module.exports = {
    //Function to send message to dialogflow api and get the answer
    sendMessage: function(db, chatId, message, token) {
        var app = apiai(token);

        var options = {
            sessionId: chatId
        };

        var request = app.textRequest(message, options);

        request.on('response', function(response) {
            if (!response.result.fulfillment.speech == '') {
                whatsapp.sendMessage(db, chatId, response.result.fulfillment.speech);
            } else if (response.result.fulfillment.speech == '') {
                console.log("Respuesta de dialogflow vacia");
            }

        });

        request.on('error', function(error) {
            console.log(error);
        });

        request.end();

    }
}