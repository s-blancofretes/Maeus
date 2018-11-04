const request = require('request');
const querystring = require('querystring')
const url = 'https://eu10.chat-api.com/instance8578';
var token = { token:'eu8htn7gz3no08ed'};

module.exports = {
    //Function to send standard text messages
    sendMessage : function(chatId,message){

        const options = {  
            url: url + '/sendMessage',
            method: 'POST',
            qs: token,
            json:{
                "chatId":chatId,
                "body":message
            },
            headers:{
                'content-type': 'application/json'
            }
        };
        
        request(options, function(err, res, body) {  
            console.log(body);
            console.log(res.statusCode);
        });
    },

        //Function to send audio, image and video files
        sendFile : function(chatId,filename,link){

            const options = {  
                url: url + '/sendFile',
                method: 'POST',
                qs: token,
                json:{
                    "chatId":chatId,
                    "body":link,
                    "filename":filename
                },
                headers:{
                    'content-type': 'application/json'
                }
            };
            
            request(options, function(err, res, body) {  
                console.log(body);
                console.log(res.statusCode);
            });
        }

};