import styled from "@emotion/styled";
import { Icon } from "@iconify/react";
import DuckQuantity from "./DuckQuantity";
// import { playSound } from "../../../utils/playSound";
// import duckQuack from '../../../media/audio/duckQuack.mp3';

// const audio = new Audio(duckQuack)

const Shop = styled.div`
  padding: 10px 20px 40px 20px;
`;

const ShopName = styled.h1`
  font-size: 22px;
  color: #111;
  font-style: normal;
  font-family:"Baloo Bhai";
  text-align: center;
  font-variant: normal;
  font-weight: 800;
  line-height: 26.4px;
  margin-bottom: 20px;
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

type Props = {
  onAddDuck?: any;
  onRemoveDuck?: any;
  numDucks?: number;
}

const DuckShop = ({ onAddDuck, onRemoveDuck, numDucks }:Props) => {
  return (
    <Shop>
      <ShopName>Top up your Ducks bag</ShopName>
      <Icon
            icon="icon-park-solid:duck"
            className="icons"
            color="rgb(0, 0, 0, 0.8)"
            hFlip={true}
            height={70}
            width={70}
          />
      <Controls>
        <DuckQuantity
          onAdd={onAddDuck}
          onRemove={onRemoveDuck}
          quantity={numDucks}
        />
      </Controls>
    </Shop>
  );
};

export default DuckShop;
