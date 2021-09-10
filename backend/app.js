let port = 5000;
//var createError = require('http-errors');
var express = require('express');

let cors = require('cors');

//var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');
var db = require('./db.js');

var usersRouter = require('./routes/users');
var contactsRouter = require('./routes/contacts');

var app = express();

db.connect();

app.use(cors());

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/adviz/login', usersRouter);
app.use('/adviz/contacts', contactsRouter);
app.use('/static', express.static('./static/'));
app.use("*", ((req, res) => res.status(404).json({ error: "not found"})))

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

//module.exports = app;
