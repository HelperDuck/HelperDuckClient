import styled from "@emotion/styled";
import GlobalStyles from "./prebuilt/GlobalStyles";
import {ReactNode} from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY as string);
//TODO: add keys to env file
//TIP : dont call loadStripe 
// dont want to load more than you have to

type Props = {
  children?: ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <>
      <GlobalStyles />
      
      <Elements stripe={stripePromise}>{children}</Elements>
    </>
  );
};

export default Layout;
