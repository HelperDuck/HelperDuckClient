import React from "react";
import { Icon } from "@iconify/react";
import Select from "react-select";
import "../../Pages/ProfilePage.css";
import { useSelector, useDispatch } from "react-redux";
import { updateByIdUserInfo } from "../../Redux/reducers/userById";
import { editUserProfile } from "../../services/profile";
import { updateUserInfo } from "../../Redux/reducers/user";
import { ProfilePic } from "./profilePic";

type Props = {
  isInEditMode: boolean;
  setIsInEditMode: any;
};

const ProfileForm = ({ isInEditMode, setIsInEditMode }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.value);
  const technologies = useSelector((state: any) => state.technologies.value);
  const languages = useSelector((state: any) => state.languages.value);
  // const otherUser = useSelector((state: any) => state.userById.value);

  const formSubmitHandler = (data: any) => {
    data.preventDefault();
    try {
      // Update user Technologies
      //to fix if only one is selected (not an array)
      let inputTech = data.target.programmingLanguage;
      const newTechs: any[] = [];

      if (inputTech instanceof HTMLInputElement) {
        newTechs.push(inputTech);
      } else {
        newTechs.push(...inputTech);
      }
      const techs: { technology: { name: string; icon: string } }[] = [];

      for (const tech of newTechs) {
        const foundTech = technologies.find(
          (item: any) => item.name === tech.value
        );
        techs.push({
          technology: { name: foundTech.name, icon: foundTech.icon },
        });
      }

      //Same solution for languages (one selected vs many), but not extra data is needed (no icon)
      let inputIdioms = data.target.speakingLanguage;
      const newIdioms: any[] = [];

      if (inputIdioms instanceof HTMLInputElement) {
        newIdioms.push(inputIdioms);
      } else {
        newIdioms.push(...inputIdioms);
      }

      const idioms: { language: { name: string } }[] = [];
      for (const idiom of newIdioms) {
        idioms.push({ language: { name: idiom.value } });
      }

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
      //Why do we have two dispatchs here?
      dispatch(updateUserInfo({ user: editedData }));
      dispatch(updateByIdUserInfo({ user: editedData }));
      setIsInEditMode(true);
    } catch (err) {
      console.log("Error at formSubmitHandler: ", err);
    }
  };

  const postUpdateUser = async (user: any) => {
    try {
      await editUserProfile(user);
    } catch (err) {
      console.error(err, "Error in updating user");
    }
  };
  //test
  return (
    <>
      <form className="profile-form" onSubmit={formSubmitHandler}>
        <button className="btn-submit-edit" type="submit">
          Update
          <Icon icon="bi:check-lg" />
        </button>

        <div className="profile-header">
          <ProfilePic isInEditMode={isInEditMode} />
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
            placeholder="Please tell us a bit about yourself"
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
                      return {
                        value: item.name,
                        label: item.name,
                        data: item.icon,
                      };
                    })}
                    className="select-input"
                    id="profile-programminglanguages"
                    placeholder="Choose stack options"
                    name="programmingLanguage"
                    data-Tech={user.technologies.map((item: any) => item)}
                    defaultValue={user.technologies.map((item: any) => {
                      return {
                        //really hacky way to get the icon
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
                      return {
                        value: item.language.name,
                        label: item.language.name,
                      };
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
                    icon="akar-icons:github-fill"
                    hFlip={true}
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
                    GitHub Profile
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
