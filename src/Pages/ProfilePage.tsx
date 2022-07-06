import { useEffect, useState } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileForm from "../components/profile/ProfileForm";
import { NavBar } from "../components/NavBar";
import "./ProfilePage.css";
import { useLocation } from "react-router-dom";
import { getOtherProfile } from "../services/profile";
import { userById } from "../Redux/reducers/userById";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/authentication";

//TODO: review types any

export const ProfilePage = () => {
  //Needs loading status of user to render correct
  const [, loading] = useAuthState(auth);
  const [isInEditMode, setIsInEditMode] = useState<any>(true);

  const user = useSelector((state: any) => state.user.value);
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      //@ts-ignore
      const userPath = location.pathname.slice(9);
      console.log("userPath", userPath === "");

      if (userPath !== "") {
        const profileFound = await getOtherProfile(userPath);
        dispatch(userById(profileFound));
      } else if (user) {
        //means a redirect with a new user
        const profileFound = await getOtherProfile(user.uid);
        dispatch(userById(profileFound));
      }
      if (user.technologies.length === 0 && user.uid === userPath) {
        setIsInEditMode(false);
      }
    } catch (err) {
      console.error(err, "Error on fetch profile");
    }
  };

  useEffect(() => {
    if (loading) return;
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
            <ProfileForm
              setIsInEditMode={setIsInEditMode}
              isInEditMode={isInEditMode}
            ></ProfileForm>
          )}
        </div>
      </div>
    </div>
  );
};
