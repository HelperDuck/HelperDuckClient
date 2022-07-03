import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { storage } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "../Pages/ProfilePage.css";
import "./ProfileInfo.css";
import { ProfilePerformanceInfo } from "../components/ProfilePerformanceInfo";
import { useSelector, useDispatch } from "react-redux";
import { changeProfilePic } from "../Redux/reducers/userById";
import { editUserProfile } from "../services/profile";

//TODO: check the correct type

type Props = {
  isInEditMode: boolean;
  setIsInEditMode: any;
};

export const ProfileInfo = ({ isInEditMode, setIsInEditMode }: Props) => {
  const user = useSelector((state: any) => state.user.value);
  const otherUser = useSelector((state: any) => state.userById.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleEditMode = (e: any) => {
    e.preventDefault();
    setIsInEditMode(!isInEditMode);
  };

  const uploadFile = (profilePic: File) => {
    if (profilePic == null) return;

    //store image in firebase and display on FE
    const imageRef = ref(storage, `profilePics/${profilePic.name + v4()}`);
    uploadBytes(
      imageRef,
      profilePic as unknown as Blob | Uint8Array | ArrayBuffer
    ).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        dispatch(changeProfilePic({ url }));
        //----------------------
        const editedImg = {
          uid: user.uid,
          profilePic: url,
        };
        postUpdateUser(editedImg);
      });
    });
  };

  const postUpdateUser = async (user: any) => {
    try {
      await editUserProfile(user);
    } catch (err) {
      console.error(err, "Error in updating user");
    }
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
          <div className="profile-image">
            <label className="label-upload" htmlFor="img-input">
              <Icon
                className="icon-upload"
                icon="clarity:edit-solid"
                color="white"
              />
              <input
                className="upload-image"
                id="img-input"
                type="file"
                accept="image/*"
                name="image"
                onChange={(e?) => {
                  let file = (e!.target as HTMLInputElement)!.files![0];
                  uploadFile(file);
                }}
              ></input>
              {otherUser.profilePic ? (
                <img
                  className="img-input"
                  src={otherUser.profilePic}
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
            </label>
          </div>
          <div id="full-name">{`${otherUser.firstName} ${otherUser.lastName}`}</div>
          <button
            className="request-btn"
            onClick={() => navigate("/newRequest")}
          >
            Create a request
          </button>
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
        <ProfilePerformanceInfo></ProfilePerformanceInfo>
      </div>
    </div>
  );
};

export default ProfileInfo;
