import styled from "@emotion/styled";
import { playSound } from "../../../utils/playSound";
import duckQuack from "../../../media/audio/duckQuack.mp3";

const audio = new Audio(duckQuack);

const Input = styled.input`
  width: 80px;
  padding: 0 12px;
  vertical-align: top;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  outline: none;
  background: transparent;
  border: 1px solid rgba(0,0,0,0.1);;
  color: rgba(0,0,0,0.9);
  height: 40px;
  user-select: none;
`;

const Button = styled.span`
  display: inline-block;
  width: 30px;
  line-height: 38px;
  color: rgba(0,0,0,0.9);;
  height: 40px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  
  user-select: none;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(0,0,0,0.9);;
`;

const DecrementButton = styled(Button)`
  border-right: none;
  background-color: #EBEF18;
  color: rgba(0,0,0,0.9);
  border-radius: 4px 0 0 4px;
`;

const IncrementButton = styled(Button)`
  border-left: none;
  background-color: #EBEF18;
  color: rgba(0,0,0,0.9);
  border-radius: 0 4px 4px 0;
`;

const DuckQuantity = ({ onAdd, onRemove, quantity }) => {
  return (
    <>
      <DecrementButton onClick={onRemove}>–</DecrementButton>
      <Input type="text" onChange={playSound(audio)} value={quantity} readOnly />
      <IncrementButton onClick={onAdd}>+</IncrementButton>
    </>
  );
};

export default DuckQuantity;
