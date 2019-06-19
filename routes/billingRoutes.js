const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: 'MassMail - $5 for 5 credits',
      source: req.body.id
    });

    if (charge.status != 'succeeded')
      return res.status(402).send({ error: 'Payment failed.' });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
