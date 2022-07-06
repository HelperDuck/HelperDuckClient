import styled from "@emotion/styled";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import giphy_dancing_gif from "../../media/giphy_dancing_gif.gif";

import Layout from "./Layout";

const Container = styled.div`
  width: 475px;
  margin: 30px auto 0 auto;
  text-align: center;
  color: #999;
`;

const Title = styled.div`
  font-size: 58px;
  color: #999;
`;

const Message = styled.div`
  margin-top: 40px;
`;

const PaymentSuccessful = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });

  return (
    <Layout title="Success!">
      <Container>
        <Confetti width={width} height={height} numberOfPieces={450} />
        <Title>Congratulations!</Title>
        <img src={giphy_dancing_gif} alt="Dancing duck" />
        <Message>
          Stripe has successfully processed your payment and Your Ducks Bag has
          been topped up!
        </Message>

        <button
          className="accept-button"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Proceed
        </button>
      </Container>
    </Layout>
  );
};

export default PaymentSuccessful;
