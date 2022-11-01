import { createButton } from "./js/createButton.js";
import { runningUiOn, settingsUiOn, timerRunningUi, timerNotRunningUi } from "./js/timerUi.js";
import { validateInput } from "./js/validation.js";
import { addExercise } from "./js/exercises.js";
import { addClass, removeClass } from "./js/modifyClass.js";
import { disableTimerControl } from "./js/disable.js";

// let exerciseArray = [];

// Variables for timer
let seconds;
let hundredsOfSeconds = 0;

let activeTimeInSeconds = 0;
let restTimeInSeconds = 0;

let currentPhase = "active";

let isPaused = true;
let isEnded = false;

let activeElementIsSet;

let index = 0;

const exerciseList = document.getElementById("exerciseList");

// Add timer control buttons
createButton("button", "pause", "Pause", "timerControls");
document.getElementById("pause").classList.add("hidden");
createButton("button", "end", "End", "timerControls");
document.getElementById("end").classList.add("hidden");

// Listens if which button inside of the timerControls is clicked and runs function depens on clicked button
document.getElementById("timerControls").addEventListener("click", (e) => {
  const buttonPressed = e.target.id;
  console.log(e.target.id);
  switch (buttonPressed) {
    case "start":
      // Validate timer inputs
      validateInput({
        validationTargetId: "activeTime",
        messageText: "You must add active time!",
        messageTargetClass: "activeTimeErrorContainer",
        elementId: "timeError",
      });
      validateInput({
        validationTargetId: "restTime",
        messageText: "You must add rest time!",
        messageTargetClass: "restTimeErrorContainer",
        elementId: "timeError",
      });

      // Start timer
      start();
      break;
    case "pause":
      pause();
      break;
    case "end":
      end();
      break;
  }
});

// Add event listener for the exercise btn
document.getElementById("addExerciseBtn").addEventListener("click", addExercise);

//
// Timer
//

const activeTime = document.getElementById("activeTime");
activeTime.addEventListener("change", setActiveTime);

function setActiveTime() {
  activeTimeInSeconds = activeTime.value;
}

const restTime = document.getElementById("restTime");
restTime.addEventListener("change", setRestTime);

function setRestTime() {
  restTimeInSeconds = restTime.value;
}

// Active exercise indicator
// const activeIndicator = "ACTIVE EXERCISE";
// const activeElement = document.createElement("p");
// activeElement.setAttribute("id", "activeExercise");
// activeElement.textContent = activeIndicator;
const activeElement = document.getElementById("activeExercise");

function createMessage(targetId, message) {
  document.getElementById(targetId).innerHTML = message;
}

// Function to check if excercises is added and then add active element to first exercise
function setActiveElementFirstTime() {
  if (exerciseList.getElementsByTagName("li").length > 0 && activeElementIsSet === undefined) {
    // Activating first exercise from the list

    exerciseList.getElementsByTagName("li")[0].getElementsByClassName("dot")[0].classList.add("activeExercise");

    activeElementIsSet = true;
  }
}

// Show time in html element
function showTimeInHtmlElement() {
  let secondsForUi = seconds;
  let hundredsOfSecondsForUi = hundredsOfSeconds;
  // Checking when timer goes under 10 seconds and add leading 0 to seconds

  if (hundredsOfSeconds < 10) {
    hundredsOfSecondsForUi = `0${hundredsOfSeconds}`;
  }
  if (seconds < 10) {
    secondsForUi = `0${seconds}`;
  }
  createMessage("timer", `${secondsForUi}:${hundredsOfSecondsForUi}`);
}

// Timer function
function timer() {
  // Check if excercises is added and then add active element to first exercise
  setActiveElementFirstTime();

  // Remove 1 millisecond every time this function runs
  hundredsOfSeconds -= 1;

  // When hundredsOfSeconds hit 0 remove 1 second and set hundredsOfSeconds to 99
  if (hundredsOfSeconds <= 0) {
    seconds--;
    hundredsOfSeconds = 99;
  }

  // Show time in html element
  showTimeInHtmlElement();

  // Take action when timer phase is done
  if (seconds <= -1) {
    // Set timer to be 00:00 after timer is done.
    // This is needed because otherwise timer goes minus one millisecond (0-1:99)
    createMessage("timer", `00:00`);

    isPaused = true;

    if (currentPhase === "active") {
      if (exerciseList.getElementsByTagName("li").length >= 1) {
        exerciseList
          .getElementsByTagName("li")
          [index].getElementsByClassName("dot")[0]
          .classList.remove("activeExercise");
      }

      createMessage("timerHeading", `Workout done! Time to rest.`);

      // If current phase is active lets change the it to rest
      currentPhase = "rest";

      // Set up seconds to rest seconds and reset hundredsOfSeconds
      seconds = restTimeInSeconds;
      hundredsOfSeconds = 0;

      setTimeout(() => {
        // If end timer is clicked during timeout timer doesn't start running after timeout ends
        if (!isEnded) {
          createMessage("timerHeading", `Rest time`);
          // Set value for isPaused to false so timer starts running
          isPaused = false;
        }
      }, 2000);
    } else if (currentPhase === "rest") {
      createMessage("timerHeading", `Rest done. Get ready!`);
      //document.getElementById('timer').innerHTML = `Rest done! Get ready for next excercise.`;
      // If current phase is rest lets change the it to active
      currentPhase = "active";

      // Set next exercise active
      if (exerciseList.getElementsByTagName("li").length >= 1) {
        // Check if index grows bigger than list has items return it to starting position
        if (exerciseList.getElementsByTagName("li").length <= index + 1) {
          index = -1;
        }
        // Bump up the index
        index++;

        // Add active indicator into the element
        exerciseList.getElementsByTagName("li")[index].getElementsByClassName("dot")[0].classList.add("activeExercise");
      }

      // Set up seconds to active seconds and reset hundredsOfSeconds
      seconds = activeTimeInSeconds;
      hundredsOfSeconds = 0;

      setTimeout(() => {
        // If end timer is clicked during timeout timer doesn't start running after timeout ends
        if (!isEnded) {
          createMessage("timerHeading", `Workout time`);
          // Set value for isPaused to false so timer starts running
          isPaused = false;
        }
      }, 2000);
    }
  }
}

// Start timer function
function start() {
  // Check if error messages are displayd. If not run timer.
  if (document.querySelectorAll(".timeError").length == 0) {
    // Show timer headeading
    removeClass("timerHeading", "hidden");
    addClass("timerHeading", "visible");

    disableTimerControl("started");

    // If timer has been ended and user clicks start
    if (isEnded) {
      createMessage("timerHeading", `Workout time`);
      seconds = activeTimeInSeconds;
      hundredsOfSeconds = 0;
      currentPhase = "active";
      if (exerciseList.getElementsByTagName("li").length > 0) {
        // Activating first exercise from the list
        exerciseList.getElementsByTagName("li")[0].getElementsByClassName("dot")[0].classList.add("activeExercise");
      }
      isEnded = false;
    }
    // If timer has been paused and user clicks start
    if (isPaused) {
      // Check if timer is used first time
      if (currentPhase === "active" && seconds === undefined) {
        createMessage("timerHeading", `Workout time`);

        // Set seconds to active time that user has set
        seconds = activeTimeInSeconds;

        // Check if excercises is added
        if (exerciseList.getElementsByTagName("li").length > 0) {
          // Activating first exercise from the list
          exerciseList.getElementsByTagName("li")[0].getElementsByClassName("dot")[0].classList.add("activeExercise");
        }
      }
      if (runningUiOn === false) {
        // Add timer running UI
        timerRunningUi();
      }

      // Unpause timer
      isPaused = false;
    }
  }
}

// Pause timer function
function pause() {
  // If timer is not paused
  if (!isPaused) {
    disableTimerControl("paused");
    // Pause timer
    isPaused = true;
  }
}

// End timer function
function end() {
  // Add timer setting UI
  if (settingsUiOn === false) {
    disableTimerControl("ended");
    timerNotRunningUi();
  }

  // Pauses timer
  isPaused = true;
  // Ends timer
  isEnded = true;

  // Hide timer heading
  removeClass("timerHeading", "visible");
  addClass("timerHeading", "hidden");

  // Reset timer text element
  createMessage("timer", ``);
  // Reset timer heading text element
  createMessage("timerHeading", ``);

  // Check if excercises is added
  if (exerciseList.getElementsByTagName("li").length > 0) {
    // Removes active indicator
    document.getElementsByTagName("li")[index].getElementsByClassName("dot")[0].classList.remove("activeExercise");
    // Sets index back to 0 so when timer is started it's correct
    index = 0;
  }
}

// Function that runs timer after every 10 hundredsOfSeconds if timer is not paused
const timerInterval = setInterval(() => {
  if (!isPaused) {
    timer();
  }
}, 10);

function handleSubmit(event) {
  event.preventDefault();
  console.log("Exercise added!");
}

document.getElementById("addExerciseForm").addEventListener("submit", handleSubmit);
