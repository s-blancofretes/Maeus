const request = require('request');
const bodyParser = require('body-parser');
const querystring = require('querystring')
var email = require('../functions/email');
var database = require('../functions/database');
const url = 'https://eu10.chat-api.com/instance8578';
var token = { token: 'eu8htn7gz3no08ed' };
var utils = require('../functions/utils');
var chatapi = require('../../config/chatapi');
const TIMEOUT = 1000 * 60 * 2;

module.exports = {
    //Function to send standard text messages
    sendMessage: async function(db, chatId, message) {

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
            },
            timeout: TIMEOUT
        };

        request(options, function(err, res, body) {
            console.log(body);
            console.log(res.statusCode);
        });
        await database.updateMessageSent(db, chatId);
    },

    //Function to send audio, image and video files
    sendFile: async function(db, chatId, filename, link, caption) {
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
            },
            timeout: TIMEOUT
        };

        request(options, function(err, res, body) {
            if (err) {
                console.log("Error sending file to api :" + err.message);
            }
        });
        await database.updateMessageSent(db, chatId);
    },
    blockcheck: function() {
        const options = {
            url: url + '/showMessagesQueue',
            method: 'GET',
            qs: token,
            json: true,
            timeout: TIMEOUT
        };

        request(options, function(err, res, body) {
            var totalMsg = res.body.totalMessages;
            if (totalMsg > 10) {
                email.sendEmailAlert("Alerta 10 Mensajes en cola");
            } else if (totalMsg > 5) {
                email.sendEmailAlert("Alerta 5 Mensajes en cola");
            }
        });
    },
    sendMessagecheck: function() {
        const options = {
            url: url + '/sendMessage',
            method: 'POST',
            qs: token,
            json: {
                "chatId": "59892521866@c.us",
                "body": "Funcionando"
            },
            headers: {
                'content-type': 'application/json'
            },
            timeout: TIMEOUT
        };

        request(options, function(err, res, body) {});
    },
    rebootApi: async function(db) {
        await database.resetcountDeliveredMsgIfActiveUser(db);
        //email.sendEmailAlert("Se rebooteo la API");
        const options = {
            url: url + '/reboot',
            method: 'GET',
            qs: token,
            json: true,
            timeout: TIMEOUT
        };
        request(options, function(err, res, body) {});
        const options2 = {
            url: url + '/settings/ackNotificationsOn',
            method: 'POST',
            qs: token,
            json: {
                "ackNotificationsOn": true
            },
            headers: {
                'content-type': 'application/json'
            },
            timeout: TIMEOUT
        };
        setTimeout(async function() {
            request(options2, function(err, res, body) {});
        }, 60000)
    },
    status: function() {
        const options = {
            url: url + '/status',
            method: 'GET',
            qs: token,
            json: true,
            timeout: TIMEOUT
        };
        request(options, function(err, res, body) {
            try {
                console.log("response: " + res.body.accountStatus);
                chatapi.setStatus(res.body.accountStatus);
            }
            catch(err) {
                console.log("There was an error trying to retrieve ChatAPI status");
            }
        });
    }
}