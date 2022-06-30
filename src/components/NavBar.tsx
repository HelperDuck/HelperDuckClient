import React from "react";
import { Icon } from "@iconify/react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authentication";
import { useSelector } from "react-redux";
type Props = {};

export const NavBar = (props: Props) => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.value);
  return (
    <div className="navBar">
      <div className="navBar-icons">
        <li>
          <Icon
            icon="icon-park-solid:duck"
            className="icons"
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
        <li onClick={() => navigate(`/profile/${user.uid}`)}>
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
