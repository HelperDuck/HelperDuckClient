import { Icon } from "@iconify/react";
import React from "react";
import "./SinglePastRequest.css";

type Props = {};

export const SinglePastRequest = (props: Props) => {
  return (
    <div className="past-request">
      <div className="profile-pic-container">
        <img
          className="profile-pic-past-request"
          src="https://i.ibb.co/35ZbKjP/fernanda.png"
          alt="profile pic"
        ></img>
      </div>
      <div className="subject-user-container">
        <div className="subject">centerrrr divv</div>
        <div className="user">by Fernanda Gananca</div>
      </div>
      <div className="tip-container">
        <span className="tip">
          <Icon icon="icon-park-solid:duck" className="duck-icon" />
          <span>20</span>
        </span>
      </div>
      <div className="score-container">
        <span className="score">
          <Icon icon="heroicons-solid:fire" className="fire-icon" />
          <span>4.9</span>
        </span>
      </div>
      <div className="detail-button-container">
        <button className="detail-btn">View detail</button>
      </div>
    </div>
  );
};
