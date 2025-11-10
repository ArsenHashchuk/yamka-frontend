"use client";
import { useSelector } from "react-redux";
import InstructionsPanel from "./instructions-panel";

export default function InstructionsPanelWrapper() {
  const activePanel = useSelector((state) => state.ui.activePanel);

  if (activePanel !== "instructions") {
    return null;
  }

  return <InstructionsPanel />;
}
