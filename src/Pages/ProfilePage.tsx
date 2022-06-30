import React, { useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import ProfileForm from "../components/ProfileForm";
import { NavBar } from "../components/NavBar";
import "./ProfilePage.css";

//TODO: make update image profile work
//TODO: review types any
//TODO: change permission in button edit to only if is your profile

export const ProfilePage = () => {
  const [isInEditMode, setIsInEditMode] = useState<any>(true);

  return (
    <div className="profile-wrapper">
      <NavBar></NavBar>
      <div className="profile-container">
        <div className="form-container">
          {isInEditMode ? (
            <ProfileInfo
              isInEditMode={isInEditMode}
              setIsInEditMode={setIsInEditMode}
            ></ProfileInfo>
          ) : (
            <ProfileForm setIsInEditMode={setIsInEditMode}></ProfileForm>
          )}
        </div>
      </div>
    </div>
  );
};
