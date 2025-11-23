"use client";

import { useSelector, useDispatch } from "react-redux";
import styles from "./arrival-info.module.css";
import { Volume2, VolumeOff } from "lucide-react";
import {
  calculateETA,
  formatTripDistance,
  formatTripDuration,
} from "@/src/lib/utils/utils";
import { useEffect, useState, useMemo } from "react";
import { toggleMute } from "@/src/lib/features/ui/uiSlice";

export default function ArrivalInfo() {
  const { route, units, isMuted, currentInstructionIndex, isNavigating } =
    useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState(false);

  const [eta, setETA] = useState("...");

  const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(null);
  const [remainingDistanceInMeters, setRemainingDistanceInMeters] =
    useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // effect to re-sync on progress
  useEffect(() => {
    if (
      !isClient ||
      !route ||
      !route.instructions ||
      typeof currentInstructionIndex === "undefined"
    ) {
      return;
    }

    let newRemainingTime = 0;
    let newRemainingDistance = 0;

    for (let i = currentInstructionIndex; i < route.instructions.length; i++) {
      newRemainingTime += route.instructions[i].time / 1000 || 0;
      newRemainingDistance += route.instructions[i].distance || 0;
    }

    setRemainingTimeInSeconds(Math.floor(newRemainingTime));
    setRemainingDistanceInMeters(newRemainingDistance);
  }, [route, currentInstructionIndex, isClient]);

  // effect to recalculate the eta
  useEffect(() => {
    if (remainingTimeInSeconds === null) return;

    const remainingMinutes = Math.floor(remainingTimeInSeconds / 60);

    let timerId;

    const updateOnMinuteChange = () => {
      setETA(calculateETA(remainingMinutes));

      const now = new Date();
      const millisecondsPastMinute =
        now.getSeconds() * 1000 + now.getMilliseconds();
      const delayUntilNextMinute = 60000 - millisecondsPastMinute + 50;

      timerId = setTimeout(updateOnMinuteChange, delayUntilNextMinute);
    };

    updateOnMinuteChange();

    return () => clearTimeout(timerId);
  }, [remainingTimeInSeconds]);

  const { duration, distance } = useMemo(() => {
    if (remainingTimeInSeconds === null || remainingDistanceInMeters === null) {
      return { duration: "...", distance: "..." };
    }

    const remainingTimeInMs = remainingTimeInSeconds * 1000;

    return {
      duration: formatTripDuration(remainingTimeInMs),
      distance: formatTripDistance(remainingDistanceInMeters, units),
    };
  }, [remainingTimeInSeconds, remainingDistanceInMeters, units]);

  if (
    !isClient ||
    !route ||
    !route.instructions ||
    remainingTimeInSeconds === null ||
    !isNavigating
  ) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.etaAndMuteWrapper}>
        <span className={styles.etaText}>{eta}</span>
        <button
          onClick={() => {
            dispatch(toggleMute());
          }}
          className={styles.iconButton}
        >
          {isMuted ? <VolumeOff size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      <div className={styles.tripInfoLine}>
        <span className={styles.tripDetails}>{duration}</span>
        <span className={styles.dotSeparator}> • </span>
        <span className={styles.tripDetails}>{distance}</span>
      </div>
    </div>
  );
}
