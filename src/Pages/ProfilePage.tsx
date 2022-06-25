import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Select from "react-select";

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
  description: "+10 years experience in blablabla",
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
            <div id="full-name">{`${firstNameInput} ${lastNameInput}`}</div>
            <div id="aboutme">{aboutMeInput}</div>
            <label className="label-profileForm" htmlFor="programminglanguages">
              Programming languages
            </label>
            <div id="programminglanguage">{stackInput}</div>
            <label className="label-profileForm" htmlFor="speakinglanguages">
              Speaking languages
            </label>
            <div id="speakinglanguage">{languageInput}</div>
            <label className="label-profileForm" htmlFor="socialmedia">
              Your Git profile
            </label>
            <div id="socialmedia">{socialMediaInput}</div>
          </div>
        ) : (
          <>
            <form className="profile-form">
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
