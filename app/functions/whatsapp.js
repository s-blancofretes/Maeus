const request = require('request');
const bodyParser = require('body-parser');
const querystring = require('querystring')
var email = require('../functions/email');
const url = 'https://eu10.chat-api.com/instance8578';
var token = { token: 'eu8htn7gz3no08ed' };

module.exports = {
    //Function to send standard text messages
    sendMessage: function(chatId, message) {

        const options = {
            url: url + '/sendMessage',
            method: 'POST',
            qs: token,
            json: {
                "chatId": chatId,
                "body": message
            },
            headers: {
                'content-type': 'application/json'
            }
        };

        request(options, function(err, res, body) {
            console.log(body);
            console.log(res.statusCode);
        });
    },

    //Function to send audio, image and video files
    sendFile: function(chatId, filename, link, caption) {

        const options = {
            url: url + '/sendFile',
            method: 'POST',
            qs: token,
            json: {
                "chatId": chatId,
                "body": link,
                "filename": filename,
                "caption": caption

            },
            headers: {
                'content-type': 'application/json'
            }
        };

        request(options, function(err, res, body) {
            console.log(body);
            console.log(res.statusCode);
        });
    },
    blockcheck: function() {
        const options = {
            url: url + '/showMessagesQueue',
            method: 'GET',
            qs: token,
            json: true,
        };

        request(options, function(err, res, body) {
            //console.log(res.statusCode);
            var totalMsg = res.body.totalMessages;
            if (totalMsg > 10) {
                email.sendEmailAlert("Alerta 10 Mensajes en cola");
                console.log("Alerta 10");
            } else if (totalMsg > 5) {
                console.log("Alerta 5");
                email.sendEmailAlert("Alerta 5 Mensajes en cola");

                //email.enviar(); invocar enviador de emails con parametro totalmsg
            }
        });
    },
    sendMessagecheck: function() {
        const options = {
            url: url + '/sendMessage',
            method: 'POST',
            qs: token,
            json: {
                "chatId": "59899262662@c.us",
                "body": "Funcionando"
            },
            headers: {
                'content-type': 'application/json'
            }
        };

        request(options, function(err, res, body) {
            //console.log(body);
            //console.log(res.statusCode);
        });
    },
}