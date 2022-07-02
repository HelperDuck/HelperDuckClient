import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Rating from "../components/Rating";
import SliderRange from "./Slider";
import { Backdrop } from "./Backdrop";

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
console.log(dropIn, "dropiN");

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

export const Modal = ({ handleClose }: any) => {
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
        <ModalButton onClick={handleClose} label="Submit" />
      </motion.div>
    </Backdrop>
  );
};

const ModalText = ({ handleClose }: any) => {
  const [rating, setRating] = useState(0);

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
        </div>
        <label className="price-range-label">
          Was it helful? Contribute with a tip!
        </label>
        <SliderRange></SliderRange>
      </form>
    </div>
  );
};

const ModalButton = ({ onClick, label }: any) => (
  <motion.button
    className="modal-button"
    type="button"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {label}
  </motion.button>
);
