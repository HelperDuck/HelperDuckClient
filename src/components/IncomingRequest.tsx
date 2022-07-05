import React from "react";
import "./IncomingRequest.css";
import { Icon } from "@iconify/react";
import { requestAskedType } from "../Types/RequestAskedType";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userById } from "../Redux/reducers/userById";
import { postDeclineOffer, postOfferHelp } from "../services/request";
import { helpRequests } from "../Redux/reducers/helpRequest";

type Props = {
  help: requestAskedType;
};

export const IncomingRequest = (props: Props) => {
  const { help } = props;
  const allHelpRequests = useSelector((state: any) => state.helpRequests.value);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();

<<<<<<< HEAD
  const OfferHelp = async (help: any) => {
=======

  const OfferHelp = async (helpID: any) => {
>>>>>>> dev
    const offer = {
      userId: user.id,
    };
    console.log(help, "help");
    try {
      await postOfferHelp(help.id, offer);
      navigate(`/call/${help.roomId}`);
      //TODO add here +1 to acceptedRequests
    } catch (err) {
      console.error(err, "Error in updating user");
    }
  };

  const handleDecline = async (help: any) => {
    const offer = {
      userId: user.id,
    };

    try {
      await postDeclineOffer(help.id, offer);
      dispatch(
        helpRequests(allHelpRequests.filter((item: any) => item.id !== help.id))
      );
    } catch (err) {
      console.error(err, "Error in updating user");
    }
  };

  return (
    <div className="IncomingRequest-wrapper">
      <div className="info-container">
        <div className="profile-info-container">
          <div className="picture-container">
            <img
              onClick={() => {
                dispatch(userById(help.user));
                navigate(`/profile/${help.user?.uid}`);
              }}
              className="profile-pic"
              src={help.user?.profilePic}
              alt="profile pic"
            ></img>
          </div>
          <div className="info">
            <div className="subject">{help.subject}</div>
            <div
              onClick={() => {
                dispatch(userById(help.user));
                navigate(`/profile/${help.user?.uid}`);
              }}
              className="user"
            >
              by {help.user?.firstName} {help.user?.lastName}{" "}
            </div>
            <div className="stats-container">
              <span className="avg-tip">
                <Icon icon="icon-park-solid:duck" className="duck-icon" />
                <span className="credits-detail">20</span>
              </span>
              <span className="avg-score">
                <Icon icon="heroicons-solid:fire" className="fire-icon" />
                <span className="score-rating">4.9</span>
              </span>
            </div>
          </div>
        </div>
        <div className="buttons-container">
          <button
            className="accept-button"
            onClick={() => {
              OfferHelp(help);
            }}
          >
            Accept
          </button>
          <button
            className="decline-button"
            onClick={() => {
              handleDecline(help);
            }}
          >
            Decline
          </button>
        </div>
      </div>
      <div className="IncomingRequest-description">{help.description}</div>
    </div>
  );
};
