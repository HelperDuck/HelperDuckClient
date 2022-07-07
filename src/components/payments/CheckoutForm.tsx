import { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { playSound } from "../../utils/playSound";
//@ts-ignore
import duckQuack from "../../media/audio/duckQuack.mp3";
import Row from "./prebuilt/Row";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
import SubmitButton from "./prebuilt/SubmitButton";
import CheckoutError from "./prebuilt/CheckoutError";
import { BACKEND_CONNECTION } from "../../services/backEndConnection";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { addCreditsToUser } from "../../services/payment";
import { updateCredits } from "../../Redux/reducers/user";
import { useDispatch } from "react-redux";

const BASE_URL = BACKEND_CONNECTION;

const audio = new Audio(duckQuack);

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

type Props = {
  price: any;
  onSuccessfulCheckout: () => void;
};

const CheckoutForm = ({ price, onSuccessfulCheckout }: Props) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState(); //eslint-disable-line
  const [creditsBought, setCreditsBought] = useState<number>(0);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.value);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    const billingDetails = {
      name: e.target.name.value,
      email: e.target.email.value,
      address: {
        city: e.target.city.value,
        line1: e.target.address.value,
        state: e.target.state.value,
        postal_code: e.target.zip.value,
      },
    };

    try {
      //lets control the submit button state
      setProcessingTo(true);

      //create a payment intent on the server //TODO: replace by BASE URL
      const { data: clientSecret } = await axios.post(
        `${BASE_URL}/payment/create`,
        {
          amount: price * 100,
        }
      );

      if (elements && stripe) {
        const cardElement = elements.getElement(CardElement);

        //create a payment method
        if (cardElement) {
          const paymentMethodReq = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: billingDetails,
          });

          if (stripe && paymentMethodReq.paymentMethod) {
            const confirmedCardPayment = await stripe.confirmCardPayment(
              clientSecret,
              {
                payment_method: paymentMethodReq.paymentMethod.id,
              }
            );

            if (confirmedCardPayment.paymentIntent) {
              let amount: number =
                confirmedCardPayment.paymentIntent.amount / 100;
              setCreditsBought(amount);
              dispatch(updateCredits(amount));
            }
            playSound(audio);
            onSuccessfulCheckout();
          }
        }
      }
    } catch (err) {
      console.log("Error processing payment: ", err);
    }
  };

  if (creditsBought !== 0) {
    const userData = {
      uid: user.uid,
      creditsBought: creditsBought,
    };
    addCreditsToUser(userData);
  }

  //stripe.com/docs/js
  const cardElementOptions = {
    //a way to inject styles into iframe
    style: {
      base: {
        fontSize: "16px",
        color: "#111",
        "::placeholder": {
          color: "#505050e5",
        },
      },
      invalid: {
        color: "#FFC7EE",
        iconColor: "#FFC7EE",
      },
      complete: {},
    },
    hidePostalCode: true,
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
          {isProcessing ? "Processing..." : `Pay ${price} €`}
        </SubmitButton>
      </Row>
      <Row>
        <button
          className="cancel-btn"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          {" "}
          Cancel
        </button>
      </Row>
    </form>
  );
};

export default CheckoutForm;
