import React from "react";
import { useSelector } from "react-redux";
import "./ProfilePerformanceInfo.css";
type Props = {};

export const ProfilePerformanceInfo = (props: Props) => {
  const user = useSelector((state: any) => state.user.value);

  return (
    <div className="profilePerformanceInfo-wrapper">
      <div className="profile-requests-stats">
        <div className="request-title">Requests</div>
        <div className="stats-outer-container">
          <div className="stats-inner-container dash-wrapper">
            <div className="number">
              <span>{user.helpRequests.length}</span>
            </div>
            <div className="word">
              <span>Opened</span>{" "}
            </div>
          </div>
          <div className="stats-inner-container dash-wrapper">
            <div className="number">
              <span>{user.helpOffers.length}</span>
            </div>
            <div className="word">
              <span>Taken</span>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-requests-stats">
        <div className="request-title">Score</div>
        <div className="stats-outer-container">
          <div className="stats-inner-container dash-wrapper">
            <div className="number">
              <span>{user.avgTip}</span>
            </div>
            <div className="word">
              <span>Avg Tip</span>{" "}
            </div>
          </div>
          <div className="stats-inner-container dash-wrapper">
            <div className="number">
              <span>{user.rating}</span>
            </div>
            <div className="word">
              <span>Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
