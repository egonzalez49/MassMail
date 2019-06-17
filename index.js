const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
//must require model before using it in another file
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

//initialization
const app = express();

//tell passport to use cookies
app.use(bodyParser.json()); //req.body
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
require('./routes/billingRoutes')(app);

//express behaving in production (send unknown routes to client build)
if (process.env.NODE_ENV === 'production') {
  //serve up production assets like main.js or .css
  app.use(express.static('client/build'));
  //unknown route? return html
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//port determination (heroku deployment)
const PORT = process.env.PORT || 5000;
app.listen(PORT);
