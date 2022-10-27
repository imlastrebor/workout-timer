import { addClass, removeClass, addClassForElements, removeClassForElements } from "./modifyClass.js";

export let runningUiOn = false;
export let settingsUiOn = false;

// When timer is running show this UI
export function timerNotRunningUi() {
  settingsUiOn = true;
  runningUiOn = false;
  console.log("timer is ended");

  removeClass("pause", "visible");
  addClass("pause", "hidden");
  removeClass("end", "visible");
  addClass("end", "hidden");

  // Show inputs
  addClassForElements(".inputWrapper", "visible");
  removeClassForElements(".inputWrapper", "hidden");
}

// When timer is running show this UI
export function timerRunningUi() {
  removeClass("pause", "hidden");
  addClass("pause", "visible");
  removeClass("end", "hiddeb");
  addClass("end", "visible");

  runningUiOn = true;
  settingsUiOn = false;

  // Hide inputs
  addClassForElements(".inputWrapper", "hidden");
  removeClassForElements(".inputWrapper", "visible");
}
