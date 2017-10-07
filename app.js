let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

// Customs
const constant      = require('./util/const');
const mongoose      = require('mongoose');
const DB_URL        = constant.DB_HOST + ":" + constant.DB_PORT + "/" + constant.DB_NAME;
const FoodController = require('./controllers/FoodController');
const Busboy        = require('connect-busboy');
const fs            = require('fs');
const fileUploader  = require('express-fileupload');

// Connect mongodb
mongoose.connect("mongodb://" + DB_URL, {useMongoClient: true});

// Insert default data
FoodController.addDefaultFood(function (err) {
    if(err) console.error(err);
});

let index = require('./routes/index');
let users = require('./routes/users');
let foods = require('./routes/food');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(Busboy({ immediate: true }));
app.use(fileUploader());

app.use('/', index);
app.use('/users', users);
app.use('/foods', foods);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
