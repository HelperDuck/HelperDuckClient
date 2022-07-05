import React, { useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import ProfileForm from "../components/ProfileForm";
import { NavBar } from "../components/NavBar";
import "./ProfilePage.css";
import { useLocation } from "react-router-dom";
import { getOtherProfile } from "../services/profile";
import { userById } from "../Redux/reducers/userById";
import { useDispatch, useSelector } from "react-redux";

//TODO: review types any

export const ProfilePage = () => {
  const [isInEditMode, setIsInEditMode] = useState<any>(true);

  const user = useSelector((state: any) => state.user.value);
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      //@ts-ignore
      const userPath = await location.pathname.slice(9);

      if (userPath === "") {
        const profileFound = await getOtherProfile(user.uid);
        dispatch(userById(profileFound));
      } else {
        const profileFound = await getOtherProfile(userPath);
        dispatch(userById(profileFound));
      }
    } catch (err) {
      console.error(err, "Error on fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []); //eslint-disable-line

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
