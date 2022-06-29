import { Icon } from "@iconify/react";
import React from "react";
import brainBook from "../media/brainBook.svg";
import "./DashUserInfo.css";
import { useSelector } from "react-redux";
import { LanguagesUserType } from "../Types/LanguagesType";
import { TechnologiesType } from "../Types/TechnologiesType";

type Props = {};

export const DashUserInfo = (props: Props) => {
  const user = useSelector((state: any) => state.user.value);
  const languages = useSelector((state: any) => state.languages.value);
  const technologies = useSelector((state: any) => state.technologies.value);
  const allHelpRequests = useSelector((state: any) => state.helpRequests.value);
  const allUsers = useSelector((state: any) => state.allUsers.value);

  console.log(user, "User inside the State");
  console.log(languages, "languages inside the State");
  console.log(technologies, "technologies inside the State");
  console.log(allHelpRequests, "allHelpRequests inside the State");
  console.log(allUsers, "allUsers inside the State");

  return (
    <div className="dash-user-wrapper">
      <div className="credits-taken-outer-container">
        <div className="credits-container">
          <div className="number">
            <span>55</span>
          </div>
          <div className="word">
            <span>Credits</span>{" "}
          </div>
        </div>
        <div className="taken-container">
          <div className="number">
            <span>{user.openedRequests}</span>
          </div>
          <div className="word">
            <span>Taken requests</span>{" "}
          </div>
        </div>
      </div>
      <div className="languages-outer-container">
        <div className="languages-inner-container">
          <div className="languages-icon">
            <Icon className="icon1" icon="lucide:languages" />
          </div>
          <div className="languages-container">
            <div className="languages-title">
              <span>Languages</span>
            </div>
            <div className="languages-list">
              {user.languages.map((lang: LanguagesUserType) => {
                return <div key={lang.language.id}>{lang.language.name}</div>;
              })}
            </div>
          </div>
        </div>

        <div className="expertise-inner-container">
          <div className="languages-icon">
            <Icon className="icon1" icon="healthicons:eyeglasses" />
          </div>
          <div className="languages-container">
            <div className="languages-title">
              <span>Expertise</span>
            </div>
            <div className="languages-list">
              <div className="test">
                {user.technologies.map((tech: TechnologiesType) => {
                  return (
                    <div key={tech.technology.id} className="singleLang">
                      {tech.technology.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="aboutme-outer-container">
        <div className="about-me-container">
          <div className="about-me-title">About me</div>
          <div className="about-me-description">{user.userBio}</div>
        </div>
        <div className="about-me-icon">
          <img src={brainBook} alt="boy img" />
        </div>
      </div>
    </div>
  );
};
