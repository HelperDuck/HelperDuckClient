// import { useState } from "react";
import "./CreateRequestPage.css";
import Select from "react-select";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { requestAskedType } from "../Types/RequestAskedType";
import { postRequest } from "../services/request";

type Props = {};

export const CreateRequestPage = (props: Props) => {
  const technologies = useSelector((state: any) => state.technologies.value);
  const user = useSelector((state: any) => state.user.value);
  
  const newRequestHandler = async (e: any) => {
    e.preventDefault();
    try {
      const roomId = uuid();     
      const techs: { technology: { name: string } }[] = [];
      e.target.programmingLanguages.forEach((item: any) =>
      techs.push({ technology: { name: item.value } }));
      
      const newRequest: requestAskedType = {
        userId: user.id,
        subject: e.target.subject.value,
        description: e.target.description.value,
        linkToSandbox: e.target.linkToSandbox.value,
        technologies: techs,
        roomId: roomId,
      };
    
      await postRequest(newRequest);
      e.target.reset();
      window.location.replace("/dashboard2");
      
    } catch (err) {
      console.log('Error posting newRequest at CreateRequestPage', err);
    }
  };

  return (
    <div className="request-page-container">
      <div className="request-container">
        <div className="table-request-form">
          <form className="request-form" onSubmit={newRequestHandler}>
            <h2>Create your request</h2>
            <div className="input-box-wrapper">
              <div className="input-request-box">
                <label className="label-input-form" htmlFor="subject-input">
                  Subject
                </label>
                <input
                  type="text"
                  className="input-request"
                  id="subject-input"
                  name="subject"
                />
              </div>
              <div className="input-request-box">
                <label className="label-input-form" htmlFor="description-input">
                  Description
                </label>
                <textarea
                  className="input-request"
                  id="description-input"
                  name="description"
                  rows={6}
                ></textarea>
              </div>
              <div className="input-request-box">
                <label
                  className="label-input-form"
                  htmlFor="sandoboxlink-input"
                >
                  Sandbox link
                </label>
                <input
                  type="text"
                  className="input-request"
                  id="sandboxlink-input"
                  name="linkToSandbox"
                />
              </div>
              <div className="input-request-box">
                <label className="label-input-form" htmlFor="techStack-input">
                  Technologies
                </label>
                <Select
                  options={technologies.map((item: any) => {
                    return { value: item.name, label: item.name };
                  })}
                  className="input-request"
                  id="techStack-input"
                  name="programmingLanguages"
                  isMulti
                ></Select>
              </div>

              <button className="btn-request" onClick={() => console.log("hi")}>
                <p id="btn-request">Submit</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
