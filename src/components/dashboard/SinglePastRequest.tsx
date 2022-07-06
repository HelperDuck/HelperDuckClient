import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { getHelpById } from "../../services/request";
import "./SinglePastRequest.css";

type Props = {
  key: number;
  help: any;
};

const initialState = {
  subject: "",
  user: {
    profilePic: "",
    firstName: "",
    lastName: "",
  },
};
export const SinglePastRequest = (props: Props) => {
  const { help } = props;
  const [helpById, setHelpById] = useState(initialState);

  const fetchRequestById = async () => {
    const helpRequest = await getHelpById(help.helpRequestId);
    setHelpById(helpRequest);
  };

  useEffect(() => {
    fetchRequestById();
  }, []); //eslint-disable-line

  return (
    <div className="past-request">
      <div className="profile-pic-container">
        <img
          className="profile-pic-past-request"
          src={helpById.user.profilePic}
          alt="profile pic"
        ></img>
      </div>
      <div className="subject-user-container">
        <div className="subject">{helpById.subject}</div>
        <div className="user">
          by {helpById.user.firstName + " " + helpById.user.lastName}
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
          <span className="score-rating">
            {help.reviews.length ? help.reviews[0].rating : ""}
          </span>
        </span>
      </div>
      <div className="detail-button-container">
        <button className="detail-btn">View detail</button>
      </div>
    </div>
  );
};
