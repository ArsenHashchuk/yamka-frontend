"use client";

import React, { useState, useEffect } from "react";
import styles from "./current-maneuver.module.css";
import { useSelector, useDispatch } from "react-redux";
import { distance } from "@turf/distance";
import { formatDistance, getTurnIcon } from "@/src/lib/utils/utils";
import { togglePanel } from "@/src/lib/features/ui/uiSlice";

export default function CurrentManeuver() {
  const dispatch = useDispatch();
  const { route, isNavigating, currentInstructionIndex, userLocation } =
    useSelector((state) => state.ui);

  const [displayDistance, setDisplayDistance] = useState("...");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const instruction = route?.instructions?.[currentInstructionIndex];

  useEffect(() => {
    if (
      !isNavigating ||
      !userLocation ||
      !instruction ||
      instruction.sign === 4
    ) {
      setDisplayDistance("");
      return;
    }

    if (instruction.points && instruction.points.length > 0) {
      const userPoint = [userLocation.lng, userLocation.lat];
      const maneuverPoint = instruction.points[0]; // [lng, lat]

      const distInMeters = distance(userPoint, maneuverPoint, {
        units: "meters",
      });

      setDisplayDistance(formatDistance(distInMeters));
    }
  }, [userLocation, instruction, isNavigating]);

  const toggleInstructionList = () => {
    dispatch(togglePanel("instructions"));
  };

  if (!isClient || !isNavigating || !instruction) {
    return null;
  }

  return (
    <div className={styles.container} onClick={toggleInstructionList}>
      <div className={styles.maneuver}>
        <span className={styles.icon}>{getTurnIcon(instruction.sign)}</span>
        <div className={styles.details}>
          <span className={styles.distance}>{displayDistance}</span>
          <span className={styles.street}>{instruction.text}</span>
        </div>
      </div>
    </div>
  );
}
