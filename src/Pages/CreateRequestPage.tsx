// import { useState } from "react";
import "./CreateRequestPage.css";
import Select from "react-select";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
// import { requestAskedType } from "../Types/RequestAskedType";
import { postRequest } from "../services/request";
// import { TechnologiesSlice } from "../Redux/reducers/technologies";
// import { createRequest } from "../Redux/reducers/helpRequest"

//Subject // Description // Code sandbox link // Tech stack

type Props = {};



export const CreateRequestPage = (props: Props) => {
  // const [newRequest, setNewRequest] = useState<requestAskedType>();
  const technologies = useSelector((state: any) => state.technologies.value);
  // const dispatch = useDispatch()
  console.log(technologies, 'techSTack')

  const newRequestHandler = async (e: any) => {
    e.preventDefault();
    try {
      const id = uuid();
      // const techs: any = [];

      // const techno = e.target.technologies;
      // console.log(techno, "techno");

      // techno.forEach((item: any) => {
      //   techs.push({ technology: { name: item.value } });
      // });
      
      const techs: { technology: { name: string } }[] = [];
      e.target.programmingLanguages.forEach((item: any) =>
      techs.push({ technology: { name: item.value } })
      );

      // console.log(techs, "techs");

      const newRequest = {
        userId: 3,
        subject: e.target.subject.value,
        description: e.target.description.value,
        linkToSandbox: e.target.linkToSandbox.value,
        technologies: techs,
        roomId: id,
      };
      //   [{technology : { 
      //     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      //     id: 46,
      //     name: "Express"
      //  }}],

      console.log(newRequest.technologies, "newRequest at newRequestHandler");

      await postRequest(newRequest) && console.log('success');
      e.target.reset();
     
      // dispatch(createRequest( newRequest ))
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
