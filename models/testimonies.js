const mongoose = require('mongoose');

const testimonySchema = new mongoose.Schema({
    name: {type: String, required: true},
    testimony: {type: String, required: true},
    date: {type: Date, default: Date.now},
    image: {type: String, required: true},
    alt: {type: String, required: true},
    company: {type: String, required: true},
});


const Testimony = mongoose.model('Testimony', testimonySchema);
module.exports = Testimony;