import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/payments/Layout"
import Row from "../components/payments/prebuilt/Row";
import DonutShop from "../components/payments/prebuilt/DonutShop";
import CheckoutForm from "../components/payments/CheckoutForm";
import getDonutPrice from "../utils/get-donut-price"; //TOD

const MainPage = props => {
  const [numDonuts, setNumDonuts] = useState(1);

  const addDonut = () => setNumDonuts(num => Math.min(12, num + 1));
  const remDonut = () => setNumDonuts(num => Math.max(1, num - 1));
  const navigate = useNavigate();
  
  return (
    <Layout title="Ducks Shop">
      <Row>
        <DonutShop
          onAddDonut={addDonut}
          onRemoveDonut={remDonut}
          numDonuts={numDonuts}
        />
      </Row>
      <CheckoutForm
        price={getDonutPrice(numDonuts)}
        onSuccessfulCheckout={() => { 
          
            setTimeout(() => {
              navigate(`/payment/success`);
            }, 500);
          }
         } //TODO: review
      />
    </Layout>
  );
};

export default MainPage;
