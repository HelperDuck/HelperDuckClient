import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Select from "react-select";
import "./ProfilePage.css";
//import { motion } from "framer-motion";

//TODO: install packages "@iconify/react" and "react-select"
//TODO: add image profile
//TODO: check boolean type in attribute value
//TODO: define type for event
//TODO: define type for stackInput, languageInput and socialMedia
//TODO: connect real database
//TODO: change permission in button edit to only if is your profile

const db = {
  firstName: "Fernanda",
  lastName: "Ganança",
  programmingLanguage: ["Redux", "React"],
  speakingLanguage: ["Portuguese", "English", "Spanish"],
  socialMedia: "https://github.com/fegananca",
  description:
    "+10 years experience in blablabla+10 years experience in blablabla+10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla +10 years experience in blablabla+10 years experience in blablabla +10 years experience in blablablaa",
};
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

type Props = {};

export const ProfilePage = (props: Props) => {
  const [isInEditMode, setIsInEditMode] = useState<any>(true);
  const [fileInput, setFileInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState<string>(db.firstName);
  const [lastNameInput, setLastNameInput] = useState<string>(db.lastName);
  const [aboutMeInput, setAboutMeInput] = useState<string>(db.description);
  const [stackInput, setStackInput] = useState<any>(db.programmingLanguage);
  const [languageInput, setLanguageInput] = useState<any>(db.speakingLanguage);
  const [socialMediaInput, setSocialMediaInput] = useState<any>(db.socialMedia);

  const toggleEditMode = (e: any) => {
    e.preventDefault();
    setIsInEditMode(!isInEditMode);
  };

  const updateInfo = (e: any) => {
    e.preventDefault();
    //TODO: Create function onEdit(firstNameInput etc)
    console.log("hi");
    setFirstNameInput("");
    setLastNameInput("");
    setStackInput("");
    setLanguageInput("");
    setSocialMediaInput("");
  };

  const handleFileInputChange = (e: any) => {
    setFileInput(URL.createObjectURL(e.target.files[0]));
  };

  const handleStackData = (data: any) => {
    setStackInput(data);
  };

  const handleIdiomData = (data: any) => {
    setLanguageInput(data);
  };

  return (
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
          <div className="profile-display">
            <div className="profile-header">
              <div id="profile-image">
                {fileInput ? (
                  fileInput
                ) : (
                  <Icon
                    icon="ooui:user-avatar-outline"
                    height={100}
                    width={90}
                    id="icon-avatar"
                  />
                )}
              </div>
              <div id="full-name">{`${firstNameInput} ${lastNameInput}`}</div>
            </div>
            <div id="aboutme">{aboutMeInput}</div>
            <div className="profile-expertise">
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
                    <div id="programminglanguage">{stackInput}</div>
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
                    <div id="speakinglanguage">{languageInput}</div>
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
                    <div id="socialmedia">{socialMediaInput}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <form className="profile-form">
              <div className="profile-header">
                <img
                  className="img-input"
                  src={fileInput}
                  alt="profilePic"
                  style={{ maxHeight: "188px", maxWidth: "171px" }}
                />
                <input
                  className="upload-image"
                  id="img-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                ></input>
                <div className="input-name">
                  <input
                    className="profile-input"
                    id="profile-firstname"
                    type="text"
                    placeholder="First Name"
                    value={firstNameInput}
                    onChange={(e) => setFirstNameInput(e.target.value)}
                  ></input>
                  <input
                    className="profile-input"
                    id="profile-lastname"
                    type="text"
                    placeholder="Last Name"
                    value={lastNameInput}
                    onChange={(e) => setLastNameInput(e.target.value)}
                  ></input>
                </div>
              </div>
              <label className="label-profileForm" htmlFor="profile-aboutme">
                About me
              </label>
              <textarea
                className="profile-input"
                id="profile-aboutme"
                placeholder="Brif description of your experience"
                value={aboutMeInput}
                onChange={(e) => setAboutMeInput(e.target.value)}
              ></textarea>
              <div className="input-expertise">
                <label
                  className="label-profileForm"
                  htmlFor="programminglanguages"
                >
                  Programming languages
                </label>
                <Select
                  options={stackList}
                  className="profile-input"
                  id="profile-programminglanguages"
                  placeholder="Choose stack options"
                  defaultValue={stackInput.map((data: any) => {
                    return { label: data };
                  })}
                  onChange={handleStackData}
                  isMulti
                ></Select>
                <label
                  className="label-profileForm"
                  htmlFor="speakinglanguages"
                >
                  Speaking languages
                </label>
                <Select
                  options={idiomsList}
                  className="profile-input"
                  id="profile-speakinglanguages"
                  placeholder="Choose languages options"
                  defaultValue={languageInput.map((data: any) => {
                    return { label: data };
                  })}
                  onChange={handleIdiomData}
                  isMulti
                ></Select>
                <label className="label-profileForm" htmlFor="socialmedia">
                  Your Git profile
                </label>
                <input
                  className="profile-input"
                  id="profile-socialmedia"
                  type="text"
                  placeholder="Add the URL here"
                  value={socialMediaInput}
                  onChange={(e) => setSocialMediaInput(e.target.value)}
                ></input>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
