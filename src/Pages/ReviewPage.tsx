import "./VideoCallPage.css";
import { roomIdState } from "../Redux/reducers/RoomId";
import { Modal, ModalContainer } from "../components/review/ReviewModal";
import "./CreateReviewPage.css";


const ReviewPage = () => {
  return (
    <ModalContainer>
      <Modal  />
    </ModalContainer>
  )
}

export default ReviewPage;