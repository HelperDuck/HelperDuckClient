import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "../Pages/ProfilePage.css";

//TODO: check the correct type
//TODO: check how to update the profile pic

type Props = {
  userInfo: any;
};

export const ProfileInfo = ({ userInfo }: Props) => {
  const [fileInput, setFileInput] = useState("");

  //TODO: use this once redux-toolkit is set up
  //const dispatch = useDispatch();
  //const user = userSelector((state) => state.users.value)
  //state.users.value (users is the name given in reducers, value is the key given in the initial state in reducers )

  const handleFileInputChange = (e: any) => {
    setFileInput(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="profile-display">
      <div className="profile-header">
        <div id="profile-image">
          <button
            onClick={() => (
              <input
                className="upload-image"
                id="img-input"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
              ></input>
            )}
          >
            {fileInput ? (
              <img
                className="img-input"
                src={fileInput}
                alt="profilePic"
                style={{ maxHeight: "188px", maxWidth: "171px" }}
              />
            ) : (
              <Icon
                icon="ooui:user-avatar-outline"
                height={100}
                width={90}
                id="icon-avatar"
              />
            )}
          </button>
        </div>
        {/* //TODO: set up this function once redux is ready */}
        {/* {user.map((data) => { return (//everything below)} )} */}
        <div id="full-name">{`${userInfo[0].firstName} ${userInfo[0].lastName}`}</div>
      </div>
      <div id="aboutme">{userInfo[0].description}</div>
      <div className="profile-expertise">
        <div className="profile-boxes-wrapper">
          <div className="profile-boxes" id="programming-box">
            <div className="wrapper-box">
              <div className="icons-box-profile-page">
                <Icon
                  icon="healthicons:eyeglasses-outline"
                  id="icon-profileStack"
                  height={50}
                  width={50}
                />
              </div>
              <div className="box-info">
                <label
                  className="label-profileForm"
                  htmlFor="programminglanguages"
                >
                  Programming languages
                </label>
                <div id="programminglanguage">
                  {userInfo[0].programmingLanguage}
                </div>
              </div>
            </div>
          </div>
          <div className="profile-boxes" id="language-box">
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
                <div id="speakinglanguage">{userInfo[0].speakingLanguage}</div>
              </div>
            </div>
          </div>
          <div className="profile-boxes" id="socialmedia-box">
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
                  Social media
                </label>
                <div id="socialmedia">{userInfo[0].socialMedia}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
