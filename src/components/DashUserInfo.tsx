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

  return (
    <div className="dash-user-wrapper">
      <div className="credits-taken-outer-container">
        <div className="credits-container dash-wrapper">
          <div className="number">
            <span>{user.credits}</span>
          </div>
          <div className="word">
            <span>Credits</span>{" "}
          </div>
        </div>
        <div className="taken-container dash-wrapper">
          <div className="number">
            {user.helpOffers.length ? user.helpOffers.length : 0}
          </div>
          <div className="word">
            <span>Taken requests</span>{" "}
          </div>
        </div>
      </div>
      <div className="languages-outer-container">
        <div className="languages-inner-container dash-wrapper">
          <div className="languages-icon">
            <Icon className="icon1" icon="lucide:languages" />
          </div>
          <div className="languages-container">
            <div className="languages-title">
              <span>Languages</span>
            </div>
            <div className="languages-list">
              {user.languages.map((lang: LanguagesUserType, key: number) => {
                return <div key={key}>{lang.language.name}</div>;
              })}
            </div>
          </div>
        </div>

        <div className="expertise-inner-container dash-wrapper">
          <div className="languages-icon">
            <Icon className="icon1" icon="healthicons:eyeglasses" />
          </div>
          <div className="languages-container">
            <div className="languages-title">
              <span>Expertise</span>
            </div>
            <div className="languages-list">
              <div className="test">
                {user.technologies.map(
                  (tech: TechnologiesType, key: number) => {
                    return (
                      <div key={key} className="singleLang">
                        {tech.technology.name}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="aboutme-outer-container dash-wrapper">
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
