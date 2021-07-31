import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Stripe from "../components/Stripe";
import "../stripe.css";

const STRIPE_KEY =
  "pk_test_51IxA6WSHAenAsUcM0VhOn8iNJ0b64loDcTpkdKQ1uVFZnnVLsLA4ahZKLPmQ4WhIDFEk8rq8GKkNoseCee2k5bwd00fPNhiXTk";

const promise = loadStripe(STRIPE_KEY);

const Payment = () => {
  return (
    <div className="payment">
      <div className="payment_container">
        <div className="payment_title">
          <h2>Complete Your Purchase</h2>
        </div>
      </div>

      {/*****************stripe*************/}
      <Elements stripe={promise}>
        <div className="stripe_container">
          <Stripe />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
