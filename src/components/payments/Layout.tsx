import GlobalStyles from "./prebuilt/GlobalStyles";
import {ReactNode} from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY as string);

type Props = {
  children?: ReactNode;
  title?: string;
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
