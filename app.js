const { hashSync } = require('bcrypt');
const saltRounds = 10;
const express = require('express');
const app = express();
const UserModel = require('./config/database');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const { MongoClient } = require('mongodb');
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const password = 'password123';


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'images')))

app.use(session({ //session configuration
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/passport', collectionName: "sessions" }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

require('./config/passport'); //contains Passport.js configuration

app.use(passport.initialize());
app.use(passport.session()); //Configures session-based authentication.
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', {
        imagePath: 'C:\Users\Asus\Downloads\attachments\coffee-beans.png',
    });
});

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/login', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/register', (req, res) => {
    let user = new UserModel({
        username: req.body.username,
        password: hashSync(req.body.password, 10)
    })

    user.save().then(user => console.log(user));

    res.send({ success: true })

})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login')
})

app.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
        res.send("Protected")
    } else {
        res.status(401).send({ msg: "Unauthorized" })
    }
    console.log(req.session)
    console.log(req.user)
})


app.listen(5000, (req, res) => {
    console.log("Listening to port 5000");
})