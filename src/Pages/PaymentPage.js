import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/payments/Layout"
import Row from "../components/payments/prebuilt/Row";
import DuckShop from "../components/payments/prebuilt/DuckShop";
import CheckoutForm from "../components/payments/CheckoutForm";
import { getDucksPrice } from "../utils/get-ducks-price"; //TOD

const PaymentPage = (props) => {
  const [numDucks, setNumDucks] = useState(0);

  const addDuck = () => setNumDucks(num => Math.min(250, num + 5));
  const remDuck = () => setNumDucks(num => Math.max(0, num - 5));
  const navigate = useNavigate();
  
  return (
    <Layout title="Ducks Shop">
      <Row>
        <DuckShop
          onAddDuck={addDuck}
          onRemoveDuck={remDuck}
          numDucks={numDucks}
        />
      </Row>
      <CheckoutForm
        price={getDucksPrice(numDucks)}
        onSuccessfulCheckout={() => { 
          
            setTimeout(() => {
              navigate(`/payment/ok`);
            }, 500);
          }
         } //TODO: review
      />
    </Layout>
  );
};

export default PaymentPage;
