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
import { translateInstruction } from "@/src/lib/utils/instructionTranslator";

export default function ResumeNavigationModal({ onClose }) {
  const dispatch = useDispatch();

  const route = useSelector((state) => state.ui.route);
  const currentInstructionIndex = useSelector(
    (state) => state.ui.currentInstructionIndex
  );

  const handleEndRoute = () => {
    dispatch(setRoute(null));
    dispatch(setIsNavigating(false));
    dispatch(setDestinationCoords(null));
    dispatch(setCurrentInstructionIndex(0));
    onClose();
  };

  const handleContinue = () => {
    unlockSpeech();
    speak(
      translateInstruction(route.instructions[currentInstructionIndex]),
      "en"
    );
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
