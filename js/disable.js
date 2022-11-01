import { addClass, removeClassForElements } from "./modifyClass.js";

export function disableTimerControl(state) {
  removeClassForElements("button", "disabledBtn");
  switch (state) {
    case "paused":
      addClass("pause", "disabledBtn");
      break;
    case "ended":
      addClass("end", "disabledBtn");
      break;
    case "started":
      addClass("start", "disabledBtn");
  }
}
