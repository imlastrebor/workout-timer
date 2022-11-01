import { addClass, removeClass, addClassForElements, removeClassForElements } from "./modifyClass.js";

export let runningUiOn = false;
export let settingsUiOn = false;

// When timer is running show this UI
export function timerNotRunningUi() {
  settingsUiOn = true;
  runningUiOn = false;
  addClass("pause", "hidden");
  addClass("end", "hidden");

  // Left align button
  document.getElementById("timerControls").style.justifyContent = "start";

  // Show inputs
  removeClassForElements(".inputWrapper", "hidden");
}

// When timer is running show this UI
export function timerRunningUi() {
  removeClass("pause", "hidden");
  removeClass("end", "hidden");

  runningUiOn = true;
  settingsUiOn = false;

  // Center buttons
  document.getElementById("timerControls").style.justifyContent = "center";

  // Hide inputs
  addClassForElements(".inputWrapper", "hidden");
}
