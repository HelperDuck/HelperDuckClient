import React from "react";
import { Icon } from "@iconify/react";
import "./NavBar.css";

type Props = {};

export const NavBar = (props: Props) => {
  return (
    <div className="navBar">
      <div className="navBar-icons">
        <li id="logo-navBar">
          <Icon
            icon="icon-park-solid:duck"
            color="white"
            hFlip={true}
            height={70}
            width={70}
          />
        </li>
        <li>
          <Icon icon="codicon:home" color="white" height={25} width={25} />
        </li>
        <li>
          <Icon
            icon="ooui:user-avatar-outline"
            color="white"
            height={25}
            width={25}
          />
        </li>
        <li>
          <Icon
            icon="ic:outline-video-call"
            color="white"
            hFlip={true}
            height={25}
            width={25}
          />
        </li>
        <li>
          <Icon icon="uil:signout" color="white" height={25} width={25} />
        </li>
      </div>
    </div>
  );
};
