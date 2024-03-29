//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override')
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

//get controllers
const courseController = require('./controllers/courseController.js')
const testimonyController = require('./controllers/testimonyController.js')
//const blogArticlesController = require('./controllers/blogArticlesController.js')


// Connect to MongoDB
mongoose.set('strictQuery', false)

const SESSION_SECRET = process.env.SESSION_SECRET
console.log('here is the session secret')
console.log(SESSION_SECRET)

app.use(session({
    secret: SESSION_SECRET,
    resave: false,//https://www.npmjs.com/package/express-session#resave 
    saveUninitialized: true
}))

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true, 
})

//Mongo error/succes
const db = mongoose.connection
db.on('error', (err)=> console.log(`${err.message} MongoDB Not Running!`))
db.on('connected', ()=> console.log('mongo connected'))
db.on('disconnected', ()=> console.log('mongo disconnected'))

//Middleware
//body parser add JSON dada from request to the request object
app.use(express.json());
//body parser give use access to req.body
app.use(express.urlencoded({extended:false}))

//This will allow use to make DELETE and UPDATE request
app.use(methodOverride('_method'))

//Cors
const whitelist = ['http://localhost:8000','http://localhost:3001',  'https://buildmentrcademy-9a67ce3164f0.herokuapp.com/']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors())

//Project controller route
app.use('/testimony', testimonyController)
app.use('/course', courseController)
//app.use('/blog-articles', blogArticlesController)

//Home route
app.get('/', (req, res) => res.send('Hello World Test!'));


//404 route
app.get('*', (req, res) => {
    res.status(404).send('Page not found')
})



//Port
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log('listening on port', PORT);
});
