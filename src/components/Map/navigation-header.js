"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CurrentManeuver from "./current-maneuver";
import InstructionsPanelWrapper from "./instructions-wrapper";
import styles from "./navigation-header.module.css";

export default function NavigationHeader() {
  const [isClient, setIsClient] = useState(false);
  const { activePanel, isNavigating, route, currentInstructionIndex } =
    useSelector((state) => state.ui);

  const isInstructionsOpen = activePanel === "instructions";
  const instruction = route?.instructions?.[currentInstructionIndex];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isNavigating || !instruction) {
    return null;
  }

  return (
    <div
      className={`${styles.container} ${isInstructionsOpen ? styles.open : ""}`}
    >
      <CurrentManeuver />
      <InstructionsPanelWrapper />
    </div>
  );
}
