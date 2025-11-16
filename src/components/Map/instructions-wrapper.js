"use client";
import { useSelector } from "react-redux";
import InstructionsPanel from "./instructions-panel";

export default function InstructionsPanelWrapper() {
  const activePanel = useSelector((state) => state.ui.activePanel);

  const isVisible = activePanel === "instructions";

  return <InstructionsPanel isVisible={isVisible} />;
}
