const request = require('request');
const bodyParser = require('body-parser');
const querystring = require('querystring')
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
    sendFile: function(chatId, filename, link) {

        const options = {
            url: url + '/sendFile',
            method: 'POST',
            qs: token,
            json: {
                "chatId": chatId,
                "body": link,
                "filename": filename
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
            console.log(res.body.totalMessages); //no se porque me da un undefine
            var totalMsg = res.body.totalMessages;
            if (totalMsg > 5) {
                console.log("ALERTA_5");
            } else if (totalMsg > 1) {
                console.log("ALERTA_1");
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