import React from "react";
import "./CreateRequestPage.css";
import Select from "react-select";

//Subject // Description // Code sandbox link // Tech stack

type Props = {};

//TODO: replace with real data
const stackList = [
  { value: "React", label: "React" },
  { value: "Redux", label: "Redux" },
  { value: "Angular", label: "Angular" },
];

export const CreateRequestPage = (props: Props) => {
  return (
    <div className="request-container">
      <div className="table-request-form">
        <h2>Create your request</h2>
        <form className="request-form">
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
              name="description-input"
              rows={6}
            ></textarea>
          </div>
          <div className="input-request-box">
            <label className="label-input-form" htmlFor="sandoboxlink-input">
              Sandbox link
            </label>
            <input
              type="text"
              className="input-request"
              id="sandboxlink-input"
              name="sandboxlink-input"
            />
          </div>
          <div className="input-request-box">
            <label className="label-input-form" htmlFor="techStack-input">
              Technologies
            </label>
            <Select
              options={stackList}
              className="input-request"
              id="techStack-input"
              name="techStack-input"
              isMulti
            ></Select>
          </div>
        </form>
      </div>
    </div>
  );
};
