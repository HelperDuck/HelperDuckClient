import React, { useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import ProfileForm from "../components/ProfileForm";
import { NavBar } from "../components/NavBar";
import "./ProfilePage.css";
import { useLocation } from "react-router-dom";
import { getOtherProfile } from "../services/profile";
import { userById } from "../Redux/reducers/userById";
import { useDispatch } from "react-redux";

//TODO: review types any

export const ProfilePage = () => {
  const [isInEditMode, setIsInEditMode] = useState<any>(true);
  const location = useLocation();
  const dispatch = useDispatch();

  const userPath = location.pathname.slice(9);

  const fetchProfile = async () => {
    try {
      //@ts-ignore
      const profileFound = await getOtherProfile(userPath);
      console.log(profileFound, "profileFound");
      dispatch(userById(profileFound));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userPath]); //eslint-disable-line

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
