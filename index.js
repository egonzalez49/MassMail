const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
//must require model before using it in another file
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

//initialization
const app = express();

//tell passport to use cookies
app.use(
  cookieSession({
    //how long cookie active in milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //key to encrypt cookie
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//takes app object and wraps routes
require('./routes/authRoutes')(app);

//port determination (heroku deployment)
const PORT = process.env.PORT || 5000;
app.listen(PORT);
