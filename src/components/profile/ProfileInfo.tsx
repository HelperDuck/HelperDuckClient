import React from "react";
import { Icon } from "@iconify/react";
import "../../Pages/ProfilePage.css";
import "./ProfileInfo.css";
import { ProfilePerformanceInfo } from "./ProfilePerformanceInfo";
import { useSelector } from "react-redux";

import { ProfilePic } from "./profilePic";
import { SingleReview } from "./SingleReview";

//TODO: check the correct type

type Props = {
  isInEditMode: boolean;
  setIsInEditMode: any;
};

export const ProfileInfo = ({ isInEditMode, setIsInEditMode }: Props) => {
  const user = useSelector((state: any) => state.user.value);
  const otherUser = useSelector((state: any) => state.userById.value);

  const toggleEditMode = (e: any) => {
    e.preventDefault();
    setIsInEditMode(!isInEditMode);
  };

  return (
    <div className="profile-display">
      <div className="form-header">
        {user.uid === otherUser.uid ? (
          <button className="btn-edit" onClick={toggleEditMode}>
            Edit
            <Icon icon="ant-design:edit-filled" />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="header-wrapper">
        <div className="profile-header">
          <ProfilePic isInEditMode={isInEditMode} />
          <div id="full-name">{`${otherUser.firstName} ${otherUser.lastName}`}</div>
        </div>
      </div>
      <div id="aboutme">{otherUser.userBio}</div>
      <div className="profile-expertise">
        <div className="profile-boxes-wrapper">
          <div className="profile-boxes dash-wrapper" id="programming-box">
            <div className="wrapper-box">
              <div className="icons-box-profile-page">
                <Icon
                  icon="healthicons:eyeglasses-outline"
                  id="icon-profileStack"
                  height={50}
                  width={50}
                />
              </div>
              <div className="profileInformation-containers">
                <label
                  className="label-profileForm"
                  htmlFor="programminglanguages"
                >
                  Technologies
                </label>
                <div className="technologiesContainer">
                  {otherUser.technologies.map((item: any, key: number) => {
                    return (
                      <div key={key} className="technologyContainer">
                        <img
                          className="technologyIcons"
                          src={item.technology.icon}
                          alt=""
                        />
                        <h5> {item.technology.name} </h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="profile-boxes dash-wrapper" id="language-box">
            <div className="wrapper-box">
              <div className="icons-box-profile-page">
                <Icon
                  icon="clarity:language-line"
                  id="icon-profileLanguage"
                  height={50}
                  width={50}
                />
              </div>
              <div className="box-info">
                <label
                  className="label-profileForm"
                  htmlFor="speakinglanguages"
                >
                  Speaking languages
                </label>
                {otherUser.languages.map((item: any, key: number) => {
                  return (
                    <div key={key} id="speakinglanguage">
                      {item.language.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="profile-boxes dash-wrapper" id="socialmedia-box">
            <div className="wrapper-box">
              <div className="icons-box-profile-page">
                <Icon
                  icon="ic:baseline-connect-without-contact"
                  id="icon-profileSocialMedia"
                  height={50}
                  width={50}
                />
              </div>
              <div className="box-info">
                <label className="label-profileForm" htmlFor="socialmedia">
                  GitHub Profile
                </label>
                <div id="socialmedia">{otherUser.gitHubProfile}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="performance-reviews-wrapper">
          <div>
            <ProfilePerformanceInfo></ProfilePerformanceInfo>
          </div>
          <div>
            <div className="review-word">Reviews</div>
            <div className="single-review-outer-container">
              {otherUser.reviews.length ? (
                otherUser.reviews.map((review: any, key: number) => {
                  return (
                    <SingleReview review={review} key={key}></SingleReview>
                  );
                })
              ) : (
                <div className="noRequests">
                  <div>No Reviews Yet</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
