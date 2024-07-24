import { useState } from "react";
import { Start } from "./sMachine";

const useExpress = () => {
  const [state, setState] = useState(Start());

  const turnOn = () => {
    setState((prevState) =>
      prevState.key === "idle" ? prevState.PowerOn() : state
    );
  };

  return {
    state,
    turnOn
  };
};