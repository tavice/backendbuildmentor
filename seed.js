const mongoose = require('mongoose');
//const Course = require('./models/courses'); 
const Testimony = require('././models/testimonies');
const testimonySeedData = require('./SeedData/seedDataTestimony');
const session = require('express-session');
const methodOverride = require('method-override');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  // Seed data for courses
  // try {
  //   await Course.insertMany(seedData);
  //   console.log('Seed data inserted successfully');
  // } catch (err) {
  //   console.error('Error seeding data:', err.message);
  // }

   // Seed data for testimonies
   try {
    await Testimony.insertMany(testimonySeedData);
    console.log('Testimony seed data inserted successfully');
  } catch (err) {
    console.error('Error seeding testimony data:', err.message);
  }

  // Disconnect from MongoDB
  mongoose.disconnect();
});
