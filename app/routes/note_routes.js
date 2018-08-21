var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  //READ NOTE  

app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });


//WEBHOOK TEST
  app.post('/webhook?token=eu8htn7gz3no08ed', (req,res)=>{  //token asi?

    const chatid = JSON.parse('req.body.messages.cellphone') //seria esta la idea 

    
  


});
};