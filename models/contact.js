const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja Schema & model
const ContactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    cellphone: {
        type: Number,
        required: [true, 'Name field is required']
    },
    idContact: {
        type: Number,
        required: [true, 'Name field is required']

    },

    idStory:{
        type: Number,
        required: [true, 'Name field is required']


    },
    available: {
        type: Boolean,
        default: false
    }
    // add in geo location
});

const Ninja = mongoose.model('ninja', ContactSchema);

module.exports = Ninja;
