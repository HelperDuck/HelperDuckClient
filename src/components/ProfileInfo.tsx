import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { storage } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "../Pages/ProfilePage.css";
import { ProfilePerformanceInfo } from "../components/ProfilePerformanceInfo";
import { useSelector, useDispatch } from "react-redux";
import { changeProfilePic } from "../Redux/reducers/user";
import { editUserProfile } from "../services/profile";

//TODO: check the correct type

type Props = {
  isInEditMode: boolean;
  setIsInEditMode: any;
};

export const ProfileInfo = ({ isInEditMode, setIsInEditMode }: Props) => {
  const user = useSelector((state: any) => state.user.value);
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
      const updateUser = await editUserProfile(user);
      console.log(updateUser, "updateUser");
    } catch (err) {
      console.error(err, "Error in updating user");
    }
  };

  return (
    <div className="profile-display">
      <div className="form-header">
        <button className="btn-edit" onClick={toggleEditMode}>
          Edit
          <Icon icon="ant-design:edit-filled" />
        </button>
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
              {user.profilePic ? (
                <img
                  className="img-input"
                  src={user.profilePic}
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
          <div id="full-name">{`${user.firstName} ${user.lastName}`}</div>
          <button
            className="request-btn"
            onClick={() => navigate("/newRequest")}
          >
            Create a request
          </button>
        </div>
      </div>
      <div id="aboutme">{user.userBio}</div>
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
                {user.technologies.map((item: any) => {
                  return (
                    <div id="programminglanguage">{item.technology.name}</div>
                  );
                })}
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
                {user.languages.map((item: any) => {
                  return <div id="speakinglanguage">{item.language.name}</div>;
                })}
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
                <div id="socialmedia">{user.gitHubProfile}</div>
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
