import React from "react";
import { motion } from "framer-motion";
import { useModal, Modal, ModalContainer } from "../components/Modal";
import "./CreateReviewPage.css";

//TODO: to delete motion-main button

export const CreateReviewPage = () => {
  const { modalOpen, close, open } = useModal();
  return (
    <>
      <motion.main>
        <motion.button className="save-button" onClick={open}>
          End
        </motion.button>
      </motion.main>
      <div className="review-container">
        <ModalContainer>
          {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
        </ModalContainer>
      </div>
    </>
  );
};
