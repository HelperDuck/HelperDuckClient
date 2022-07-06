import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { helpRequests } from "../../Redux/reducers/helpRequest";
import { deleteRequest } from "../../services/request";
import { requestAskedType } from "../../Types/RequestAskedType";
import "./CreatedByMe.css";

type Props = {
  help: requestAskedType;
};

export const CreatedByMe = (props: Props) => {
  const dispatch = useDispatch();
  const allHelpRequests = useSelector((state: any) => state.helpRequests.value);
  const { help } = props;

  const navigate = useNavigate();

  const OfferHelp = () => {
    navigate(`/call/${help.roomId}`);
  };

  const handleDelete = async (help: any) => {
    await deleteRequest(help.id);
    dispatch(
      helpRequests(allHelpRequests.filter((item: any) => item.id !== help.id))
    );
    // window.location.reload(); //TODO this is just a quick fix
  };

  return (
    <div className="past-request">
      <div className="subject-user-container">
        <div className="subject">{help.subject!.substring(0, 60) + "..."}</div>
        {/* <div className="user">
          // by {help.user.firstName} {help.user.lastName}
        </div> */}
      </div>
      <div className="tip-container">
        <span className="tip">
          <Icon icon="icon-park-solid:duck" className="duck-icon" />
          {/* <span>{help.user.avgTip as any}</span> */}
          {/* //TODO this should display how much Tip i GAVE */}
        </span>
      </div>
      <div
        onClick={() => {
          handleDelete(help);
        }}
        className="delete-request-container"
      >
        <Icon
          icon="clarity:trash-solid"
          className="trash-bin"
          width="20"
          height="20"
        />
      </div>
      <div className="detail-button-container">
        <button
          onClick={OfferHelp}
          className={
            help.helpOffers.length ? "start-call-btn-accept" : "start-call-btn"
          }
        >
          Start Call
        </button>
        {/* //TODO add View Detail Function */}
      </div>
    </div>
  );
};
