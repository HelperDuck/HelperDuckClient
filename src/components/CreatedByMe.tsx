import { Icon } from "@iconify/react";
import React from "react";
import { requestAskedType } from "../Types/RequestAskedType";
import "./CreatedByMe.css";

type Props = {
  help: requestAskedType;
};

export const CreatedByMe = (props: Props) => {
  const { help } = props;

  return (
    <div className="past-request">
      <div className="subject-user-container">
        <div className="subject">{help.subject}</div>
        <div className="user">by Fernanda Gananca</div>
      </div>
      <div className="tip-container">
        <span className="tip">
          <Icon icon="icon-park-solid:duck" className="duck-icon" />
          <span>20</span>
        </span>
      </div>
      <div className="delete-request-container">
        <span className="delete-request">
          <Icon icon="clarity:trash-solid" width="20" height="20" />
        </span>
      </div>
      <div className="detail-button-container">
        <button className="detail-btn">View detail</button>
      </div>
    </div>
  );
};
