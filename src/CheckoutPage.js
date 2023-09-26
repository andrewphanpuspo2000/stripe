import React from "react";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51LdBFlJyhE6wVt3HGo1BIm2BB8kSDr9lZcE9ahEQjcOLKyZiPfNGKauPsr3dVBh5JSZpK0uXEgKTo0MMLxDDCUrY00sbLa2hoa"
);
const CheckoutPage = () => {
  //   const options = {
  //     // passing the client secret obtained from the server
  //     clientSecret: "{{CLIENT_SECRET}}",
  //   };
  return (
    <Container>
      <div>
        <div className="order-details">Cart Total $500</div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </Container>
  );
};

export default CheckoutPage;
