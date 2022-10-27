import { createMessage } from "./createMessage.js";
import { activeElement, isEnded, isPaused } from "./globalVariables.js";

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
const activeIndicator = "ACTIVE EXERCISE";
activeElement.setAttribute("id", "activeExercise");
activeElement.textContent = activeIndicator;

let index = 0;

// Function to check if excercises is added and then add active element to first exercise
function setActiveElementFirstTime() {
  if (exerciseList.getElementsByTagName("li").length > 0 && activeElementIsSet === undefined) {
    // Activating first exercise from the list
    exerciseList.getElementsByTagName("li")[0].appendChild(activeElement);
    activeElementIsSet = true;
  }
}

// Show time in html element
function showTimeInHtmlElement() {
  // Checking when timer goes under 10 seconds and add leading 0 to seconds
  if (seconds > 9) {
    createMessage("timer", `${seconds}:${hundredsOfSeconds}`);
  } else {
    createMessage("timer", `0${seconds}:${hundredsOfSeconds}`);
  }
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
      createMessage("timerHeading", `Exercise done!`);
      //document.getElementById('timer').innerHTML = `Workout done! Time to rest`;

      // If current phase is active lets change the it to rest
      currentPhase = "rest";

      // Set up seconds to rest seconds and reset hundredsOfSeconds
      seconds = restTimeInSeconds;
      hundredsOfSeconds = 0;

      setTimeout(() => {
        // If end timer is clicked during timeout timer doesn't start running after timeout ends
        if (!isEnded) {
          createMessage("timerHeading", `Time to rest.`);
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
        exerciseList.getElementsByTagName("li")[index].appendChild(activeElement);
      }

      // Set up seconds to active seconds and reset hundredsOfSeconds
      seconds = activeTimeInSeconds;
      hundredsOfSeconds = 0;

      setTimeout(() => {
        // If end timer is clicked during timeout timer doesn't start running after timeout ends
        if (!isEnded) {
          createMessage("timerHeading", `Keep going on!`);
          // Set value for isPaused to false so timer starts running
          isPaused = false;
        }
      }, 2000);
    }
  }
}

// Function that runs timer after every 10 hundredsOfSeconds if timer is not paused
const timerInterval = setInterval(() => {
  if (!isPaused) {
    timer();
  }
}, 10);
