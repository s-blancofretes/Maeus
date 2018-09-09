module.exports = {
    dbCreateNewUser : function(db, phone, idUser, idStory, numMensaje){
        const user = { cellphone: phone, idContact: idUser, story: idStory, msjNumb: numMensaje};
        db.collection('usuarios').insert(user, (err, result) => {
          if (err) { 
            return ({ 'error': 'An error has occurred' }); 
          } else {
            return (result.ops[0]);
          }
        });
    }

};
