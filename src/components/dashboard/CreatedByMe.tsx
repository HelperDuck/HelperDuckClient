import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { helpDetails } from "../../Redux/reducers/helpDetails";
import { helpRequests } from "../../Redux/reducers/helpRequest";
import { myRequestModalState } from "../../Redux/reducers/myRequestModalState";
import { deleteRequest } from "../../services/request";
import { requestAskedType } from "../../Types/RequestAskedType";
import "./CreatedByMe.css";

type Props = {
  help: requestAskedType;
};

export const CreatedByMe = (props: Props) => {
  const { help } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allHelpRequests = useSelector((state: any) => state.helpRequests.value);
  console.log(help, "help created by ME");

  const OfferHelp = () => {
    navigate(`/call/${help.roomId}`);
  };

  const handleDelete = async (help: any) => {
    await deleteRequest(help.id);
    dispatch(
      helpRequests(allHelpRequests.filter((item: any) => item.id !== help.id))
    );
  };

  return (
    <div className="byMe-request">
      <div className="byMe-subject-user-container">
        <div className="byMe-subject">
          {help.subject!.length > 60
            ? help.subject!.substring(0, 60) + "..."
            : help.subject}
        </div>
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
      <div className="byMe-detail-button-container">
        {help.status !== "solved" ? (
          <button
            onClick={OfferHelp}
            className={
              help.helpOffers.length
                ? "start-call-btn-accept"
                : "start-call-btn"
            }
          >
            Start Call
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(myRequestModalState(true));
              dispatch(helpDetails(help));
            }}
            className="start-call-btn"
          >
            Details
          </button>
        )}

        {/* //TODO add View Detail Function */}
      </div>
    </div>
  );
};
