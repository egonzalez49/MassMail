import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../actions';

class Payments extends React.Component {
  render() {
    //amount of money (amount) in cents
    return (
      <StripeCheckout
        name="MassMail"
        description="$5 for 5 email credits."
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  { handleToken }
)(Payments);
