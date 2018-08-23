const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost:27017/myDatabase');

// create ninja Schema & model
const contactSchema = new Schema({
    cellphone: {
        type: Number,
        required: [true, 'Name field is required']
    },
    idContact: {
        type: String,
       
    },

    idStory:{
        type: Number,
        required: [true, 'Name field is required']


    },

    // add in geo location
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
