import {ReactNode} from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './Layout.css';
//PUBLIC KEY 
const stripePromise = loadStripe('pk_test_51LHZS2FoVOc20WxaO5cuf75NsH25K6llpma2IGQeL41UgJxMpyayAPYCULNjih58c49F8eRkV574TjOG49lNOweY004d2hRTmt');

type Props = {
  children?: ReactNode;
  title?: string;
}
const Layout = ({ children }: Props) => {
  return (
    <>
     <div className="payments-wrapper">
      
      <Elements stripe={stripePromise}>{children}</Elements>
      </div>
    </>
  );
};

export default Layout;
