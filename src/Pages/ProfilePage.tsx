import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ProfileInfo from "../components/ProfileInfo";
import ProfileForm from "../components/ProfileForm";
import { NavBar } from "../components/NavBar";
import "./ProfilePage.css";

const user = [
  {
    firstName: "Fernanda",
    lastName: "Ganança",
    programmingLanguage: ["Redux", "React"],
    speakingLanguage: ["Portuguese", "English", "Spanish"],
    socialMedia: "https://github.com/fegananca",
    image: "Users/fernandarodrigues/Desktop/Documentos/foto_linkedin1.JPG",
    description:
      "+10 years experience in blablabla+10 years experience in blablabla+10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla+10 years experience in blablabla +10 years experience in blablablaa",
  },
];

//TODO: make update image profile work
//TODO: check boolean type in attribute value
//TODO: define type for event
//TODO: define type for stackInput, languageInput and socialMedia
//TODO: replace mock user to real database
//TODO: change permission in button edit to only if is your profile
//TODO: make button to change picture to work

// type Props = {};

export const ProfilePage = () => {
  const [isInEditMode, setIsInEditMode] = useState<any>(true);
  const [userInfo, setUserInfo] = useState([user[0]]);

  const toggleEditMode = (e: any) => {
    e.preventDefault();
    setIsInEditMode(!isInEditMode);
  };

  const updateInfo = (e: any) => {
    e.preventDefault();
    //TODO: Create function onEdit(userInfo)
    console.log("hi");
    setUserInfo([]);
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="profile-container">
        <div className="form-container">
          <div className="form-header">
            <button onClick={toggleEditMode}>
              Edit
              <Icon icon="ant-design:edit-filled" />
            </button>
            <button onClick={updateInfo}>
              <Icon icon="bi:check-lg" />
            </button>
          </div>
          {isInEditMode ? (
            <ProfileInfo userInfo={userInfo}></ProfileInfo>
          ) : (
            <ProfileForm
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            ></ProfileForm>
          )}
        </div>
      </div>
    </>
  );
};
