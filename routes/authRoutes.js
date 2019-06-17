const passport = require('passport');

module.exports = app => {
  //route handler to start auth sequence
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  //after successful code from google auth, send google code and run strategy callback
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  //logout
  app.get('/api/logout', (req, res) => {
    //attached by passport, removes id from cookie
    req.logout();
    res.redirect('/');
  });

  //testing route to show logged-in user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
