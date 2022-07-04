import { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

import Row from "./prebuilt/Row";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
import SubmitButton from "./prebuilt/SubmitButton";
import CheckoutError from "./prebuilt/CheckoutError";

import { CardElement,  useStripe, useElements } from "@stripe/react-stripe-js";

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false); 
  const [checkoutError, setCheckoutError] = useState();
  
  const stripe = useStripe()
  const elements = useElements();

  const handleFormSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
      }
    };
    
    try {
    //lets control the submit button state
    setProcessingTo(true);
    
    const { data: clientSecret } = await axios.post('/api/payment_intents', {
      amount: price * 100,
    });
    
    const cardElement = elements.getElement(CardElement);
    
    //create a payment method
    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    })
    
    const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    })
    
    console.log('Confirm Payment: ', confirmedCardPayment);
    onSuccessfulCheckout();
    // console.log(paymentMethodReq);
    // console.log(clientSecret);
    
   } catch (err) {
    console.log('Error processing payment: ', err)
   }
    //TIP Stripe amount is in the lowest denomination of the currency
    //Ex. 1 USD 100 cents
    
    //create a payment intent on the server
    //client_secret of that payment intent
    
    //need a reference to the cardElement
    //need stripe.js
    //create a payment method
    
    //confirm the card payment
    //payment method id
    //client_secret
  };
  
  //stripe.com/docs/js
  const cardElementOptions = {
    //a way to inject styles into iframe
    style: {
      base: {
        fontSize: "16px",
        color: "#111",
        "::placeholder": {
          color: '#87bbfd'
        }
      },
      invalid: {
        color: "#FFC7EE",
        iconColor: "#FFC7EE",
      },
      complete: {
        
      }
    },
    hidePostalCode: true
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Row>
        <BillingDetailsFields />
      </Row>
      <Row>
        <CardElementContainer>
          <CardElement options={cardElementOptions} />
        </CardElementContainer>
      </Row>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <Row>
        <SubmitButton disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Pay $${price}`}
        </SubmitButton>
      </Row>
    </form>
  );
};

export default CheckoutForm;
