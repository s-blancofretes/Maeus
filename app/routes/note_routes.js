const mongoose = require('mongoose');
var utils = require('../functions/utils')

var Contact = require('../../models/contact.js');

module.exports = function(app, db) {
//WEBHOOK
app.post('/webhook', (req,res) => {
  var reqJson = req.body;
    for (var i = 0; i < reqJson.messages.length; i++) {
      var message = reqJson.messages[i];
      if(message.body=="Clave"){
        //Aca va la persistencia a la DB
        var phone = utils.splitPhone(message.author);
        console.log("Phone: " + utils.splitPhone(message.author));
        console.log("Timestamp: " + message.time);
        
        var newContact = new Contact ({
          cellphone: phone,
          idContact: message.author,
          idStory: 1
            });
      
        newContact.save( (err) => { 
          if (err) {
              res.type('html').status(500);
              res.send('Error: ' + err);
          }
          else {
              res.send('created'+ {contact : newContact});
          }
            } ); 
      }
  }
//res.send("200 OK")
});
};