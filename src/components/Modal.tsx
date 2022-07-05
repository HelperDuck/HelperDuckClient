import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Rating from "../components/Rating";
import SliderRange from "./Slider";
import { Backdrop } from "./Backdrop";
import { reviewType } from "../Types/ReviewType";
import { useSelector } from "react-redux";
// import { helpRequests } from "../Redux/reducers/helpRequest";
import { useLocation } from "react-router-dom";
import {
  getRequestByRoomId,
  postReviewHelpAsker,
  postReviewHelpOffer,
} from "../services/reviews";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return { modalOpen, close, open };
};

export const ModalContainer = ({ children }: any) => (
  // Enables the animation of components that have been removed from the tree
  <AnimatePresence
    // Disable any initial animations on children that
    // are present when the component is first rendered
    initial={false}
    // Only render one component at a time.
    // The exiting component will finish its exit
    // animation before entering component is rendered
    exitBeforeEnter={true}
    // Fires when all exiting nodes have completed animating out
  >
    {children}
  </AnimatePresence>
);

export const Modal = ({ handleClose, onSubmitReview }: any) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className="modal-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ModalText />
        {/* <ModalButton onClick={handleClose} label="Submit" /> */}
      </motion.div>
    </Backdrop>
  );
};

const ModalText = () => {
  const location: any = useLocation();
  const user = useSelector((state: any) => state.user.value);
  // const allHelpRequests = useSelector((state: any) => state.helpRequests.value);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [value, setValue] = useState(0);
  const [requestByRoomId, setRequestByRoomId] = useState({
    helpOffer: { user: { id: 0 }, id: 0 },
    helpRequest: { id: 0, userId: 0 },
  });

  // const requestId = allHelpRequests.filter((requests: any) => {
  //   return requests.roomId === location.state.roomId;
  // });
  // console.log(requestId[0].id, "requestID");
  // console.log(requestId[0].helpOffers[0].id, "helpOfferID");

  const helpByRoomId = async () => {
    try {
      const result = await getRequestByRoomId(location.state.roomId);
      setRequestByRoomId(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    helpByRoomId();
  }, []); //eslint-disable-line

  const onSubmitReview = (e: any) => {
    e.preventDefault();
    const newAskerReview: reviewType = {
      tipGiven: value,
      review: {
        rating: rating,
        comment: comment,
      },
    };

    const newOfferReview: reviewType = {
      rating: rating,
      comment: comment,
      userId: requestByRoomId.helpOffer.user.id,
      helpOfferId: requestByRoomId.helpOffer.id,
    };

    if (user.id === requestByRoomId.helpRequest.userId) {
      postReviewHelpAsker(
        requestByRoomId.helpRequest.id,
        requestByRoomId.helpOffer.id,
        newAskerReview
      );
    } else {
      postReviewHelpOffer(newOfferReview);
    }
    setRating(0);
    setComment("");
    setValue(0);
  };

  return (
    <div className="modal-text">
      <div className="model-header-container">
        <h1 id="h1">We value your feedback</h1>
        <h2 id="h2">
          Please complete the following form and help us grow our community
        </h2>
      </div>
      <form className="form-container">
        <div className="box-wrapper">
          <label htmlFor="rating">How do you rate this service?</label>
          <Rating
            rating={rating}
            onRating={(rate: any) => setRating(rate)}
          ></Rating>
          <textarea
            className="write-review"
            placeholder="Please write a review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        {user.id === requestByRoomId.helpRequest.userId ? (
          <>
            <label className="price-range-label">
              Was it helpful? Contribute with a tip!
            </label>
            <SliderRange value={value} setValue={setValue}></SliderRange>{" "}
          </>
        ) : (
          <>
            {/* <label className="tip-range-label">
              Was it helpful? Contribute with a tip!
            </label>
            <SliderRange value={value} setValue={setValue}></SliderRange> */}
          </>
        )}
        <button id="form-submit" onClick={onSubmitReview}>
          Submit
        </button>
      </form>
    </div>
  );
};

// const ModalButton = ({ onClick, label }: any) => (
//   <motion.button
//     className="modal-button"
//     type="button"
//     whileHover={{ scale: 1.1 }}
//     whileTap={{ scale: 0.95 }}
//     onClick={onClick}
//   >
//     {label}
//   </motion.button>
// );
