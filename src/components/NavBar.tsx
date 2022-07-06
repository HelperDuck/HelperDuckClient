import React from "react";
import { Icon } from "@iconify/react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authentication";
import { useDispatch, useSelector } from "react-redux";
import { userById } from "../Redux/reducers/userById";
import { playSound } from "../utils/playSound";
import duckQuack from '../media/audio/duckQuack.mp3';

const audio = new Audio(duckQuack)

type Props = {};

export const NavBar = (props: Props) => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();

  return (
    <div className="navBar">
      <div className="navBar-icons">
        <li>
          <Icon
            icon="icon-park-solid:duck"
            className="icons"
            onClick={() => playSound(audio)}
            color="rgb(255, 218, 35)"
            hFlip={true}
            height={70}
            width={70}
          />
        </li>
        <li onClick={() => navigate("/dashboard")}>
          <Icon
            icon="codicon:home"
            color="white"
            height={25}
            width={25}
            className="icons"
          />
        </li>
        <li
          onClick={() => {
            dispatch(userById(user));
            setTimeout(() => {
              navigate(`/profile/${user.uid}`);
            }, 500);
          }}
        >
          <Icon
            icon="ooui:user-avatar-outline"
            color="white"
            height={25}
            width={25}
            className="icons"
          />
        </li>
        <li onClick={() => navigate("/newrequest")}>
          <Icon
            icon="ant-design:plus-outlined"
            color="white"
            hFlip={true}
            height={25}
            width={25}
            className="icons"
          />
        </li>
        <li onClick={() => navigate("/payment")}>
          <Icon
            icon="fluent:wallet-credit-card-16-regular"
            color="white"
            hFlip={true}
            height={25}
            width={25}
            className="icons"
          />
        </li>
        <li>
          <Icon
            onClick={logout}
            icon="uil:signout"
            color="white"
            height={25}
            width={25}
            className="icons"
          />
        </li>
      </div>
    </div>
  );
};
