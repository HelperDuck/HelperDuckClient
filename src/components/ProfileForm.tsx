import React from "react";
import { Icon } from "@iconify/react";
import Select from "react-select";
import "../Pages/ProfilePage.css";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../Redux/reducers/user";
import { editUserProfile } from "../services/profile";

type Props = {
  setIsInEditMode: any;
};

const ProfileForm = ({ setIsInEditMode }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.value);
  const technologies = useSelector((state: any) => state.technologies.value);
  const languages = useSelector((state: any) => state.languages.value);

  const formSubmitHandler = (data: any) => {
    data.preventDefault();

    const techs: { technology: { name: string } }[] = [];
    data.target.programmingLanguage.forEach((item: any) =>
      techs.push({ technology: { name: item.value } })
    );

    const idioms: { language: { name: string } }[] = [];
    data.target.speakingLanguage.forEach((item: any) =>
      idioms.push({ language: { name: item.value } })
    );

    const editedData = {
      uid: user.uid,
      firstName: data.target.firstName.value,
      lastName: data.target.lastName.value,
      userBio: data.target.aboutme.value,
      technologies: techs,
      languages: idioms,
      gitHubProfile: data.target.socialMedia.value,
    };

    postUpdateUser(editedData);
    dispatch(updateUserInfo({ user: editedData }));
    setIsInEditMode(true);
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
    <>
      <form className="profile-form" onSubmit={formSubmitHandler}>
        <button type="submit">
          <Icon icon="bi:check-lg" />
        </button>
        <div className="profile-header">
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
          <div className="input-name">
            <div id="input-firstName">
              <label className="label-profileForm" htmlFor="profile-firstname">
                First name
              </label>
              <input
                className="profile-input"
                id="profile-firstname"
                type="text"
                placeholder="First Name"
                name="firstName"
                defaultValue={user.firstName}
              ></input>
            </div>
            <div id="input-lastName">
              <label className="label-profileForm" htmlFor="profile-lastname">
                Last name
              </label>
              <input
                className="profile-input"
                id="profile-lastname"
                type="text"
                placeholder="Last Name"
                name="lastName"
                defaultValue={user.lastName}
              ></input>
            </div>
          </div>
        </div>
        <div id="input-aboutme">
          <label className="label-profileForm" htmlFor="profile-aboutme">
            About me
          </label>
          <textarea
            className="profile-input"
            id="profile-aboutme"
            placeholder="Brif description of your experience"
            name="aboutme"
            defaultValue={user.userBio}
            rows={6}
          ></textarea>
        </div>
        <div className="input-expertise">
          <div className="profile-boxes-wrapper">
            <div className="profile-boxes" id="input-programming-box">
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
                    htmlFor="profile-programminglanguages"
                  >
                    Programming languages
                  </label>
                  <Select
                    options={technologies.map((item: any) => {
                      return { value: item.name, label: item.name };
                    })}
                    className="select-input"
                    id="profile-programminglanguages"
                    placeholder="Choose stack options"
                    name="programmingLanguage"
                    defaultValue={user.technologies.map((item: any) => {
                      return {
                        value: item.technology.name,
                        label: item.technology.name,
                      };
                    })}
                    isMulti
                  ></Select>
                </div>
              </div>
            </div>
            <div className="profile-boxes" id="input-language-box">
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
                    htmlFor="profile-speakinglanguages"
                  >
                    Speaking languages
                  </label>
                  <Select
                    options={languages.map((item: any) => {
                      return { value: item.name, label: item.name };
                    })}
                    className="select-input"
                    id="profile-speakinglanguages"
                    placeholder="Choose languages options"
                    name="speakingLanguage"
                    defaultValue={user.languages.map((item: any) => {
                      return { label: item.language.name };
                    })}
                    isMulti
                  ></Select>
                </div>
              </div>
            </div>
            <div className="profile-boxes" id="input-socialmedia-box">
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
                  <label
                    className="label-profileForm"
                    htmlFor="profile-socialmedia"
                  >
                    Social media
                  </label>
                  <input
                    className="profile-input"
                    id="profile-socialmedia"
                    type="text"
                    placeholder="Add the URL here"
                    name="socialMedia"
                    defaultValue={user.gitHubProfile}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
