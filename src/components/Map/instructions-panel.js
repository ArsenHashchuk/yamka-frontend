"use client";

import styles from "./instructions-panel.module.css";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import { setActivePanel } from "@/src/lib/features/ui/uiSlice";
import {
  formatTripDistance,
  formatTripDuration,
  getTurnIcon,
} from "@/src/lib/utils/utils";
import { translateInstruction } from "@/src/lib/utils/instructionTranslator";

export default function InstructionsPanel({ isVisible }) {
  const { route, units } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setActivePanel(null));
  };

  if (!route || !route.instructions) {
    return null;
  }

  const totalMinutes = Math.floor(route.time / 60000);

  const panelClassName = `${styles.panel} ${isVisible ? styles.visible : ""}`;

  return (
    <div className={panelClassName}>
      <div className={styles.header}>
        <h4>Your Route</h4>
        <button onClick={handleClose} className={styles.closeButton}>
          <X size={20} />
        </button>
      </div>
      <hr className={styles.divider} />
      <div className={styles.summary}>
        <strong>{formatTripDuration(totalMinutes)}</strong>
        <span> ({formatTripDistance(route.distance, units)})</span>
      </div>
      <ol className={styles.list}>
        {route.instructions.map((step, index) => {
          return (
            <li key={index} className={styles.step}>
              <span className={styles.icon}>{getTurnIcon(step.sign)}</span>
              <span className={styles.text}>{translateInstruction(step)}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
