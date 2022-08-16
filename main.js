require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router/router')
const authRouter = require('./router/authRoutes')
const passport = require('./auth/passport')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json({ limit: '50mb' }))

const mongodb = process.env.DATABASE
 function connectToMongo() {
     mongoose.connect(mongodb, {
        useNewUrlParser: true
    });
    return mongoose;
};

 connectToMongo();

// mongoose.connect(mongodb).then(console.log(`Mongo Connected ${mongodb}`)).catch(err => console.log(err));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Content-Length, Authorization, X-Requested-With, X-XSRF-TOKEN');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        console.log('OPTIONS SUCCESS');
        res.end();
    }
    next();
});

app.use('/api', passport.authenticate('jwt', {session: false}), router); 
app.use('/auth', authRouter)
app.all('*', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '/client/index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port);