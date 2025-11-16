"use client";

import React from "react";
import styles from "./current-maneuver.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getTurnIcon } from "@/src/lib/utils/utils";
import { togglePanel } from "@/src/lib/features/ui/uiSlice";
import { translateInstruction } from "@/src/lib/utils/instructionTranslator";

export default function CurrentManeuver() {
  const dispatch = useDispatch();
  const { route, currentInstructionIndex, activePanel } = useSelector(
    (state) => state.ui
  );

  const instruction = route?.instructions?.[currentInstructionIndex];
  const isInstructionsOpen = activePanel === "instructions";

  const toggleInstructionList = () => {
    dispatch(togglePanel("instructions"));
  };

  if (!instruction) {
    return null;
  }

  return (
    <div
      className={`${styles.container} ${isInstructionsOpen ? styles.open : ""}`}
      onClick={toggleInstructionList}
    >
      <div className={styles.maneuver}>
        <span className={styles.icon}>{getTurnIcon(instruction.sign)}</span>
        <div className={styles.details}>
          <span className={styles.street}>
            {translateInstruction(instruction)}
          </span>
        </div>
      </div>
    </div>
  );
}
