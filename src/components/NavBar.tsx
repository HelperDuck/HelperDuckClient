import React from "react";
import { Icon } from "@iconify/react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authentication";
import { useDispatch, useSelector } from "react-redux";
import { userById } from "../Redux/reducers/userById";
import { playSound } from "../utils/playSound";
import duckQuack from '../media/audio/duckQuack.mp3';
type Props = {};

export const NavBar = (props: Props) => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();
  const otherUser = useSelector((state: any) => state.userById.value);

  console.log(otherUser, "dentro do userbyId state");
  return (
    <div className="navBar">
      <div className="navBar-icons">
        <li>
          <Icon
            icon="icon-park-solid:duck"
            className="icons"
            onClick={() => playSound(duckQuack)}
            color="white"
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
            console.log(user, "userrr");
            console.log(otherUser, "otherrr");
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
            icon="ic:outline-video-call"
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
