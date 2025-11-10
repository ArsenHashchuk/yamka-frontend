import React from "react";
import styles from "./arrival-modal.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setRoute,
  setIsNavigating,
  setDestinationCoords,
  setCurrentInstructionIndex,
} from "@/src/lib/features/ui/uiSlice";

import { speak, unlockSpeech } from "@/src/lib/utils/speech";

export default function ResumeNavigationModal({ onClose }) {
  const dispatch = useDispatch();

  const { route } = useSelector((state) => state.ui);

  const handleEndRoute = () => {
    dispatch(setRoute(null));
    dispatch(setIsNavigating(false));
    dispatch(setDestinationCoords(null));
    dispatch(setCurrentInstructionIndex(0));
    onClose();
  };

  const handleContinue = () => {
    console.log("Unlocking speech on resume...");
    unlockSpeech();

    const firstInstruction = route?.instructions?.[0];

    if (firstInstruction) {
      speak(firstInstruction.text);
      dispatch(setCurrentInstructionIndex(1));
    }

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Continue Navigation?</h3>
        <p className={styles.subtitle}>
          Are you still driving to this destination?
        </p>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.finishButton} ${styles.cancelButton}`}
            onClick={handleEndRoute}
          >
            No
          </button>
          <button className={styles.finishButton} onClick={handleContinue}>
            Continue driving...
          </button>
        </div>
      </div>
    </div>
  );
}
