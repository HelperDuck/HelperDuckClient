import React from "react";
import { DashUserInfo } from "../components/DashUserInfo";
import { IncomingRequestsCarrousel } from "../components/IncomingRequestsCarrousel";
import { NavBar } from "../components/NavBar";
import { RequestHistory } from "../components/RequestHistory";
import boySvg from "../media/boy.svg";
import Avatar from "react-avatar";
import "./DashboardPage.css";
type Props = {};

export const DashboardPage = (props: Props) => {
  return (
    <div className="dashboard-wrapper">
      <NavBar></NavBar>

      <div className="outer-wrapper">
        <div className="inner-wrapper">
          <div className="first-half-container">
            <div className="hello-wrapper">
              <div className="hello-container">
                <div className="hello">Hello Mauricio!</div>
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
                {/* <img
                  className="dash-profile-pic"
                  src="https://i.ibb.co/35ZbKjP/fernanda.png"
                  alt="profile pic"
                ></img> */}
                <Avatar
                  src="https://firebasestorage.googleapis.com/v0/b/helper-duck.appspot.com/o/profilePics%2Fhackercat.jpg?alt=media&token=3cd1ed19-6dd5-47b1-8f19-9da64389cbb8"
                  size="50"
                  round={true}
                ></Avatar>
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
