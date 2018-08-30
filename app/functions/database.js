module.exports = {
    dbCreateNewUser : function(db, phone, idUser, idStory){
        const user = { cellphone: phone, idContact: idUser, story: idStory};
        db.collection('usuarios').insert(user, (err, result) => {
          if (err) { 
            //res.send({ 'error': 'An error has occurred' }); 
          } else {
            //res.send(result.ops[0]);
          }
        });
    }

};
