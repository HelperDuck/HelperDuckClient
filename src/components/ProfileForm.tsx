import React from "react";
import { Icon } from "@iconify/react";
import Select from "react-select";
import "../Pages/ProfilePage.css";

//TODO: link to list options in database

const stackList = [
  { value: "React", label: "React" },
  { value: "Redux", label: "Redux" },
  { value: "Angular", label: "Angular" },
];

const idiomsList = [
  { value: "Portuguese", label: "Portuguese" },
  { value: "Spanish", label: "Spanish" },
  { value: "English", label: "English" },
];

type Props = {
  userInfo: any;
  setUserInfo: any;
};

const ProfileForm = ({ userInfo, setUserInfo }: Props) => {
  const formSubmitHandler = (data: any) => {
    const editedData = {
      firstName: data.target.firstName.value,
      lastLame: data.target.lastName.value,
      description: data.target.aboutme.value,
      programmingLanguage: data.target.programmingLanguage.value,
      speakingLanguage: data.target.speakingLanguage.value,
      socialMedia: data.target.socialMedia.value,
    };
    setUserInfo(editedData);
  };

  return (
    <>
      <form className="profile-form" onSubmit={formSubmitHandler}>
        <div className="profile-header">
          {userInfo.image ? (
            <img
              className="img-input"
              src={userInfo.image}
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
                defaultValue={userInfo[0].firstName}
                //onChange={(e) => setFirstNameInput(e.target.value)}
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
                defaultValue={userInfo[0].lastName}
                //onChange={(e) => setLastNameInput(e.target.value)}
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
            defaultValue={userInfo[0].description}
            //onChange={(e) => setAboutMeInput(e.target.value)}
            rows={4}
          ></textarea>
        </div>
        <div className="input-expertise">
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
                  options={stackList}
                  className="select-input"
                  id="profile-programminglanguages"
                  placeholder="Choose stack options"
                  name="programmingLanguage"
                  defaultValue={userInfo[0].programmingLanguage.map(
                    (data: any) => {
                      return { label: data };
                    }
                  )}
                  //onChange={handleStackData}
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
                  options={idiomsList}
                  className="select-input"
                  id="profile-speakinglanguages"
                  placeholder="Choose languages options"
                  name="speakingLanguage"
                  defaultValue={userInfo[0].speakingLanguage.map(
                    (item: any) => {
                      return { label: item };
                    }
                  )}
                  //onChange={handleIdiomData}
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
                  defaultValue={userInfo[0].socialMedia}
                  //onChange={(e) => setSocialMediaInput(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
