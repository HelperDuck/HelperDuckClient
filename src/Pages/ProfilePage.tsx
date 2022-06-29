import React, { useState } from "react";

import { Icon } from "@iconify/react";
import ProfileInfo from "../components/ProfileInfo";
import ProfileForm from "../components/ProfileForm";
import { NavBar } from "../components/NavBar";
import "./ProfilePage.css";

//TODO: make update image profile work
//TODO: check boolean type in attribute value
//TODO: define type for event
//TODO: define type for stackInput, languageInput and socialMedia
//TODO: replace mock user to real database
//TODO: change permission in button edit to only if is your profile
//TODO: make button to change picture to work

export const ProfilePage = () => {
  const [isInEditMode, setIsInEditMode] = useState<any>(true);

  const toggleEditMode = (e: any) => {
    e.preventDefault();
    setIsInEditMode(!isInEditMode);
  };

  return (
    <div className="profile-wrapper">
      <NavBar></NavBar>
      <div className="profile-container">
        <div className="form-container">
          <div className="form-header">
            <button onClick={toggleEditMode}>
              Edit
              <Icon icon="ant-design:edit-filled" />
            </button>
          </div>
          {isInEditMode ? (
            <ProfileInfo></ProfileInfo>
          ) : (
            <ProfileForm setIsInEditMode={setIsInEditMode}></ProfileForm>
          )}
        </div>
      </div>
    </div>
  );
};
