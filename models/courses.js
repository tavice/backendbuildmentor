const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    image: { type: String, required: true },
    alt: { type: String, required: true },
    price: { type: Number, required: true }, // Changed data type to Number for price
    duration: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true }, // Added enum for level
    category: { type: String, required: true },
    instructor: { type: String, required: true },
    instructorImage: { type: String, required: true },
    instructorAlt: { type: String, required: true },
    instructorBio: { type: String, required: true },
    instructorCompany: { type: String, required: true },
    instructorTitle: { type: String, required: true },
    instructorEmail: { type: String, required: true, unique: true }, // Added unique constraint
    instructorPhone: { type: String, required: true },
    videoCourse: { type: String, required: true },
});

module.exports = mongoose.model('Course', courseSchema);
