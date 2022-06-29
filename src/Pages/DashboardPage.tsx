// import React from "react";
import { DashUserInfo } from "../components/DashUserInfo";
import { IncomingRequestsCarrousel } from "../components/IncomingRequestsCarrousel";
import { NavBar } from "../components/NavBar";
import { RequestHistory } from "../components/RequestHistory";
import boySvg from "../media/boy.svg";
import Avatar from "react-avatar";
import "./DashboardPage.css";
import { useSelector } from "react-redux";

type Props = {};

export const DashboardPage = (props: Props) => {
  const user = useSelector((state: any) => state.user.value);

  return (
    <div className="dashboard-wrapper">
      <NavBar></NavBar>

      <div className="outer-wrapper">
        <div className="inner-wrapper">
          <div className="first-half-container">
            <div className="hello-wrapper">
              <div className="hello-container">
                <div className="hello">Hello {user.firstName}!</div>
                <div className="hello-msg">It`s good to see you again.</div>
              </div>
              <div className="about-me-icon">
                <img className="img-boy" src={boySvg} alt="boy img" />{" "}
              </div>
            </div>
            <IncomingRequestsCarrousel></IncomingRequestsCarrousel>
          </div>

          <div className="second-half-container">
            <div className="search-and-profile">
              <div className="search-container">
                <form className="search-form">
                  <input
                    className="search-input"
                    type="search"
                    placeholder="Search"
                  ></input>
                  <button className="search-btn" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <div className="profile-setting-container">
                <Avatar src={user.profilePic} size="50" round={true}></Avatar>
              </div>
            </div>

            <DashUserInfo></DashUserInfo>
          </div>
        </div>

        <div className="bottom-cointainer">
          {" "}
          <div className="bottom-container">
            <RequestHistory></RequestHistory>
          </div>
        </div>
      </div>
    </div>
  );
};
