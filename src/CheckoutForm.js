import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const element = useElements();
  const [form, setForm] = useState({});

  const cart = {
    amount: 25,
    name: "pen box",
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !element) {
      return;
    }
    try {
      //call api
      const paymentAPI = "http://localhost:8002/create-payment-intent";

      const { data } = await axios.post(paymentAPI, {
        amount: cart.amount,
        currency: "aud",
        paymentMethodType: "card",
      });

      const clientSecret = data.clientKey;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: element.getElement(CardElement),
          billing_details: {
            name: form.name,
            email: form.email,
          },
        },
      });

      if (paymentIntent.status === "succeeded") {
        alert("payment success");
      } else {
        alert("Payment fail");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <p>
          name:
          <input
            type="text"
            name="name"
            onChange={({ target: { name, value } }) => {
              setForm({ ...form, [name]: value });
            }}
          />
        </p>
        <p>
          email:
          <input
            type="email"
            name="email"
            onChange={({ target: { name, value } }) => {
              setForm({ ...form, [name]: value });
            }}
          />
        </p>
      </div>
      <CardElement options={{ hidePostalCode: true }} />
      <button>submit</button>
    </form>
  );
};

export default CheckoutForm;
