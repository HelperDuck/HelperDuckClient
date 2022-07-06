import { Icon } from "@iconify/react";
import React from "react";
import { useSelector } from "react-redux";
import "./SinglePastRequest.css";

type Props = {
  key: number;
  help: any;
};

export const SinglePastRequest = (props: Props) => {
  const { help } = props;
  const allHelpRequests = useSelector((state: any) => state.helpRequests.value);

  //since the help (above) does not have all the data I need
  //i had to find the complete data filtering this single help request from AllRequests
  const completeHelpRequest = allHelpRequests.filter(
    (item: any) => item.id === help.id
  );

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
        <div className="subject">{completeHelpRequest[0].subject}</div>
        <div className="user">
          by{" "}
          {completeHelpRequest[0].user.firstName +
            " " +
            completeHelpRequest[0].user.lastName}
        </div>
      </div>
      <div className="tip-container">
        <span className="tip">
          <Icon icon="icon-park-solid:duck" className="duck-icon" />
          <span className="credits-detail">{help.tipReceived}</span>
        </span>
      </div>
      <div className="score-container">
        <span className="score">
          <Icon icon="heroicons-solid:fire" className="fire-icon" />
          <span className="score-rating">{help.reviews[0].rating}</span>
        </span>
      </div>
      <div className="detail-button-container">
        <button className="detail-btn">View detail</button>
      </div>
    </div>
  );
};
