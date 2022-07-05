import GlobalStyles from "./prebuilt/GlobalStyles";
import {ReactNode} from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

//PUBLIC KEY 
const stripePromise = loadStripe('pk_test_51LHZS2FoVOc20WxaO5cuf75NsH25K6llpma2IGQeL41UgJxMpyayAPYCULNjih58c49F8eRkV574TjOG49lNOweY004d2hRTmt');

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
