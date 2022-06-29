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
        {/* <div className="user">
          // by {help.user.firstName} {help.user.lastName}
        </div> */}
      </div>
      <div className="tip-container">
        <span className="tip">
          <Icon icon="icon-park-solid:duck" className="duck-icon" />
          {/* <span>{help.user.avgTip as any}</span> */}
          {/* //TODO this should display how much Tip i GAVE */}
        </span>
      </div>
      <div className="delete-request-container">
        <span className="delete-request">
          <Icon icon="clarity:trash-solid" width="20" height="20" />
          {/* //TODO add delete Help Request function */}
        </span>
      </div>
      <div className="detail-button-container">
        <button className="detail-btn">View detail</button>
        {/* //TODO add View Detail Function */}
      </div>
    </div>
  );
};
