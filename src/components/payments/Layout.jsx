import styled from "@emotion/styled";
import GlobalStyles from "./prebuilt/GlobalStyles";

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);
//TODO: add keys to env file
//TIP : dont call loadStripe 
// dont want to load more than you have to

const Layout = ({ children, title }) => {
  return (
    <>
      <GlobalStyles />
      
      <Elements stripe={stripePromise}>{children}</Elements>
    </>
  );
};

export default Layout;
