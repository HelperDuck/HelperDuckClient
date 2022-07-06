// import React from "react";
import { DashUserInfo } from "../components/dashboard/DashUserInfo";
import { IncomingRequestsCarrousel } from "../components/dashboard/IncomingRequestsCarrousel";
import { NavBar } from "../components/NavBar";
import { RequestHistory } from "../components/dashboard/RequestHistory";
// @ts-ignore    TODO
import boySvg from "../media/boy.svg";
import Avatar from "react-avatar";
import "./DashboardPage.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/authentication";
import DetailsModal from "../components/DetailsModal";
import { Modal, ModalContainer } from "../components/review/ReviewModal";

type Props = {};

export const DashboardPage = (props: Props) => {
  const [, loading] = useAuthState(auth);
  const user = useSelector((state: any) => state.user.value);
  const modalOpen = useSelector(
    (state: any) => state.myRequestModalState.value
  );
  const modalState = useSelector((state: any) => state.modalState.value);
  const navigate = useNavigate();

  const redirectProfile = () => {
    if (user.uid !== "" && user.technologies.length === 0) {
      navigate(`/profile/${user.uid}`);
    }
  };

  useEffect(() => {
    if (loading) return;
    redirectProfile();
  }, [user.uid]); //eslint-disable-line

  return (
    <div className="dashboard-wrapper">
      <NavBar></NavBar>

      <div className="outer-wrapper">
        <div className="inner-wrapper">
          <div className="first-half-container">
            <div className="hello-wrapper dash-wrapper">
              <div className="hello-container">
                <div className="hello">Hello {user.firstName}!</div>
                <div className="hello-msg">It`s good to see you again.</div>
              </div>
              <div className="about-me-icon">
                <img className="img-boy" src={boySvg} alt="boy img" />{" "}
              </div>
            </div>
            {user.uid && user.uid !== "" ? (
              <IncomingRequestsCarrousel></IncomingRequestsCarrousel>
            ) : (
              <></>
            )}
          </div>

          <div className="second-half-container">
            <div className="search-and-profile">
              <div className="search-container">
                <form className="search-form dash-wrapper">
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
                <Avatar
                  className="dash-profile-pic"
                  src={user.profilePic}
                  size="50"
                  round={true}
                ></Avatar>
              </div>
            </div>
            <ModalContainer>{modalState && <Modal />}</ModalContainer>
            <DashUserInfo></DashUserInfo>
          </div>
        </div>

        <div className="bottom-container">
          {" "}
          <div className="bottom-container">
            <RequestHistory></RequestHistory>
          </div>
        </div>
      </div>
      {modalOpen && <DetailsModal />}
    </div>
  );
};
