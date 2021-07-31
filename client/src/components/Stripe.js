import React, { useEffect, useState } from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { paymentIntent } from "../functions/stripe";
import { useDispatch, useSelector } from "react-redux";
import { selectUserToken } from "../features/user/userSlice";
import { Link } from "react-router-dom";
import numeral from "numeral";
import { createOrder } from "../functions/order";
import { setCart } from "../features/cart/cartSlice";
import { setCouponRedux } from "../features/cart/couponSlice";
import { removeCart } from "../functions/cart";
import Loader from "./loading/Loader";

const Stripe = () => {
  const [succeed, setSucceed] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);

  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    paymentIntent(token).then((res) => {
      console.log(res.data);
      setClientSecret(res.data.clientSecret);
      setFinalPrice(res.data.Payable / 100);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment Faild ${payload.error.message}`);
      setProcessing(false);
    } else {
      createOrder(payload, token).then((res) => {
        if (typeof window !== undefined) localStorage.removeItem("cart");
        dispatch(setCart({ cart: [] }));
        dispatch(setCouponRedux({ coupon: false }));
        removeCart(token);
      });
      console.log(JSON.stringify(payload, null, 4));
      setProcessing(false);
      setError(null);
      setSucceed(true);
    }
  };

  const handleChange = async (e) => {
    setDisabled(e.error ? true : false);
    setError(e.error ? e.error.message : "");
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "20px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      <p className={succeed ? "result-message" : "result-message hidden"}>
        Payment SuccessFul.{" "}
        <Link to="/user/history">See it in your purchase history</Link>
      </p>
      {finalPrice !== 0 ? (
        <>
          <div className="stripe_amount">
            <p>
              Amount Payable : ₹{" "}
              {finalPrice && numeral(finalPrice).format("0,0.00")}
            </p>
            <p></p>
            <p></p>
          </div>

          <form
            id="payment-form"
            className="stripe-form"
            onSubmit={handleSubmit}
          >
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
            <button
              className="stripe-button"
              disabled={disabled || processing || succeed}
              onClick={handleSubmit}
            >
              <span id="button-text">
                {processing ? (
                  <div className="spinner2" id="spinner2"></div>
                ) : (
                  "PAY"
                )}
              </span>
            </button>
            {error && (
              <div id="card-error" role="alert">
                {error}
              </div>
            )}
          </form>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Stripe;
