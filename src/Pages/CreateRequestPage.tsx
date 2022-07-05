import { useState } from "react";
import "./CreateRequestPage.css";
import Select from "react-select";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { requestAskedType } from "../Types/RequestAskedType";
import { getAllHelpRequests, postRequest } from "../services/request";
import { NavBar } from "../components/NavBar";
import Editor, { loader } from "@monaco-editor/react";
import { availableProgramLangs } from "../utils/availableProgramLangs";
import { useNavigate } from "react-router-dom";
import { helpRequests } from "../Redux/reducers/helpRequest";

type Props = {};

export const CreateRequestPage = (props: Props) => {
  const technologies = useSelector((state: any) => state.technologies.value);
  const user = useSelector((state: any) => state.user.value);
  const [codeSnippet, setCodeSnippet] = useState("");
  const [codeSnippetLanguage, setCodeSnippetLanguage] = useState("JavaScript");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAllHelpRequests = async () => {
    try {
      const allHelpRequests = await getAllHelpRequests();
      dispatch(helpRequests(allHelpRequests));
    } catch (err) {
      console.error(err, "Error in All Languages Fetch reducer");
    }
  };

  function handleEditorChange(value: any, event: any): void {
    setCodeSnippet(value);
  }

  function changeCodeSnippetLanguage(value: any, event: any): void {
    //transforms value into array of strings
    const inputTech = value.map((tech: any) => tech.value);

    //checks first language that is in availableProgramLangs
    let firstPossibleTech = inputTech.find((tech: string) =>
      availableProgramLangs.includes(tech)
    );

    firstPossibleTech = firstPossibleTech ? firstPossibleTech : "JavaScript";
    setCodeSnippetLanguage(firstPossibleTech);
  }

  const optionsCodeSnippet = {
    readOnly: false,
    minimap: { enabled: false },
    scrollBeyondLastColumn: 1,
    loader: loader,
  };

  const newRequestHandler = async (e: any) => {
    e.preventDefault();
    try {
      const roomId = uuid();
      const techs: { technology: { name: string } }[] = [];

      const inputTechData = e.target.programmingLanguages;
      const requestTechs: any[] = [];

      if (inputTechData instanceof HTMLInputElement) {
        requestTechs.push(inputTechData);
      } else {
        requestTechs.push(...inputTechData);
      }

      for (const tech of requestTechs) {
        techs.push({ technology: { name: tech.value } });
      }

      const newRequest: requestAskedType = {
        userId: user.id,
        subject: e.target.subject.value,
        description: e.target.description.value,
        linkToSandbox: e.target.linkToSandbox.value,
        technologies: techs,
        roomId: roomId,
        codeSnippet: codeSnippet,
      };

      await postRequest(newRequest);
      e.target.reset();
      fetchAllHelpRequests();
      navigate("/dashboard");
    } catch (err) {
      console.log("Error posting newRequest at CreateRequestPage", err);
    }
  };

  return (
    <div className="request-page-container">
      <NavBar></NavBar>
      <div className="all-wrapper">
        <div className="create-title">Create your request</div>
        <div className="request-container">
          <div className="angle-brack1">
            <img
              className="brack"
              src="https://res.cloudinary.com/brnl/image/upload/v1656589231/HelperDuck/bracket2-removebg-preview_llbvl7.png"
              alt="brack"
            />
          </div>

          <div className="table-request-form">
            <form className="request-form" onSubmit={newRequestHandler}>
              <div className="input-box-wrapper">
                <div className="input-request-box">
                  <label className="label-input-form" htmlFor="subject-input">
                    Subject:
                  </label>
                  <input
                    type="text"
                    className="input-request"
                    id="subject-input"
                    name="subject"
                  />
                </div>
                <div className="input-request-box">
                  <label
                    className="label-input-form"
                    htmlFor="description-input"
                  >
                    Description:
                  </label>
                  <textarea
                    className="input-request"
                    id="description-input"
                    name="description"
                    rows={5}
                  ></textarea>
                </div>
                <div className="input-request-box">
                  <label
                    className="label-input-form"
                    htmlFor="sandoboxlink-input"
                  >
                    Sandbox link:
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
                    Technologies:
                  </label>
                  <Select
                    options={technologies.map((item: any) => {
                      return { value: item.name, label: item.name };
                    })}
                    className="input-request"
                    id="techStack-input"
                    name="programmingLanguages"
                    onChange={changeCodeSnippetLanguage}
                    isMulti
                  ></Select>
                </div>
                <div className="input-request-box">
                  <label
                    className="label-input-form"
                    htmlFor="description-input"
                  >
                    Code - {codeSnippetLanguage} :
                  </label>

                  <Editor
                    height="80vh"
                    language={codeSnippetLanguage.toLowerCase()}
                    defaultValue="// Please write your code here"
                    value={codeSnippet}
                    onChange={handleEditorChange}
                    options={optionsCodeSnippet}
                    className="input-request"
                  />
                </div>

                <div className="newrequest-button-container">
                  {" "}
                  <button className="btn-request" type="submit">
                    <p id="btn-request">Submit</p>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="angle-brack">
            {" "}
            <img
              className="brack"
              src="https://res.cloudinary.com/brnl/image/upload/v1656589231/HelperDuck/bracket1-removebg-preview_afsmdv.png"
              alt="brack"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
