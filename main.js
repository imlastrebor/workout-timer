let exerciseArray = [];

// Variables for timer
let seconds;
let milliSeconds = 0;

let activeTimePhase = false;
let activeTimeInSeconds = 0;

let restTimePhase = false;
let restTimeInSeconds = 0;

let currentPhase = "active";

let isPaused = true;
let isEnded = false;

const exerciseList = document.getElementById("exerciseList");

// Select specific elements by existing class and add new class
function setClassForElement(elementSelector, classNameToAdd, classToRemove) {
  const elements = document.querySelectorAll(elementSelector);
  // Add class for each selected element
  elements.forEach((element) => {
    element.classList.add(classNameToAdd);
    element.classList.remove(classToRemove);
  });
}

// When timer is running show this UI
let settingsUiOn = false;
function timerSettingsUi() {
  settingsUiOn = true;
  runningUiOn = false;
  console.log("timer is ended");
  document.getElementById("pause").remove();
  document.getElementById("end").remove();

  // Show inputs
  setClassForElement(".inputWrapper", "visible", "hidden");
}

// Create button
function createButton(setElementClass, setElementId, buttonText, targetId) {
  const button = document.createElement("button");
  button.setAttribute("class", setElementClass);
  button.setAttribute("id", setElementId);
  button.textContent = buttonText;
  document.getElementById(targetId).appendChild(button);
}

// When timer is running show this UI
let runningUiOn = false;
function timerRunningUi() {
  runningUiOn = true;
  settingsUiOn = false;

  // Add timer control buttons
  createButton("button", "pause", "Pause", "timerControls");
  createButton("button", "end", "End", "timerControls");

  // Hide inputs
  setClassForElement(".inputWrapper", "hidden", "visible");
}

// Function creates error message
function createErrorMessage(messageText, setElementClass, targetId) {
  // Check is there already error message and if there's not function creates one
  if (document.getElementById(targetId).querySelector("." + setElementClass) == null) {
    // Create new p element for error message and add it to target
    const errorElement = document.createElement("p");
    errorElement.setAttribute("class", setElementClass);
    errorElement.textContent = messageText;
    document.getElementById(targetId).appendChild(errorElement);
  }
}

// Function to remove error message
function removeErrorMessage(errorMessageClassName, targetId) {
  // Select all elements with specific class name
  const elementToDelete = document.getElementById(targetId).querySelectorAll("." + errorMessageClassName);
  // Run remove for each selected element
  elementToDelete.forEach((element) => {
    element.remove();
  });
}

// Validation
function validateInput(validationTargetId, messageText, messageTargetClass, elementId) {
  if (document.getElementById(validationTargetId).value == "") {
    createErrorMessage(messageText, elementId, messageTargetClass);
  } else {
    removeErrorMessage(elementId, messageTargetClass);
  }
}

function exercisesToList() {
  // Export items froms array and add items as li element to exerciseList
  exerciseArray.map((exercise, index) => {
    // Variables for li element
    const listElement = document.createElement("li");

    // Variable for p element. Inserts exercise name to p element
    const exerciseText = document.createElement("p");
    exerciseText.textContent = exercise;

    // Add delete button
    const btn = document.createElement("button");
    btn.innerHTML = "Delete";
    btn.dataset.id = index;
    btn.addEventListener("click", deleteExercise);

    // Adds p element and button to li element and after that adds li element to ul
    listElement.appendChild(exerciseText);
    listElement.appendChild(btn);
    exerciseList.appendChild(listElement);
  });
}

// Listens if which button inside of the timerControls is clicked and runs function depens on clicked button
document.getElementById("timerControls").addEventListener("click", (e) => {
  const buttonPressed = e.target.id;
  console.log(e.target.id);
  switch (buttonPressed) {
    case "start":
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

function deleteExercise(e) {
  // Empty ul content
  exerciseList.innerHTML = "";

  // Get data-id of the element that is going to be deleted
  // Data-id can be used as index
  const index = e.target.dataset.id;

  // Use array index to specify which exercise is going to be deleted
  exerciseArray.splice(index, 1);

  // Export items froms array and add items as li element to exerciseList
  exercisesToList();

  // If there's no exercises after deleting exercise show message to user
  if (exerciseArray.length <= 0) {
    // Creates p element for message and add some text into element
    const messageExerciseListEmpty = document.createElement("p");
    messageExerciseListEmpty.textContent = `You removed all list elements. Add new exercises.`;

    // Adds p element to ul
    exerciseList.appendChild(messageExerciseListEmpty);
  }
}

function addExercise() {
  validateInput("exercises", "Add exercises name", "exerciseErrorContainer", "exerciseError");
  // Check is errors displayd
  if (document.querySelectorAll(".exerciseError").length == 0) {
    // Empty ul
    exerciseList.innerHTML = "";

    // Removes error message element from HTML
    //removeErrorMessage("exerciseError");

    // Get the exercise name from input field
    const exerciseInput = document.getElementById("exercises");

    // Add exercise to array
    exerciseArray.push(exerciseInput.value);

    // Export items froms array and add items as li element to exerciseList
    exercisesToList();

    // Empty input field
    exerciseInput.value = "";
  }
}

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
const activeIndicator = "ACTIVE EXERCISE";
const activeElement = document.createElement("p");
activeElement.setAttribute("id", "activeExercise");
activeElement.textContent = activeIndicator;

let index = 0;

function createMessage(targetId, message) {
  document.getElementById(targetId).innerHTML = message;
}

// Timer function
function timer() {
  // Remove 1 millisecond every time this function runs
  milliSeconds -= 1;

  // When milliseconds hit 0 remove 1 second and set milliseconds to 99
  if (milliSeconds <= 0) {
    seconds--;
    milliSeconds = 99;
  }

  // Add time to html element
  // Checking when timer goes under 10 seconds and add leading 0 to seconds
  if (seconds > 9) {
    document.getElementById("timer").innerHTML = `${seconds}:${milliSeconds}`;
  } else {
    document.getElementById("timer").innerHTML = `0${seconds}:${milliSeconds}`;
  }

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

      // Set up seconds to rest seconds and reset milliseconds
      seconds = restTimeInSeconds;
      milliSeconds = 0;

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

      // Set up seconds to active seconds and reset milliseconds
      seconds = activeTimeInSeconds;
      milliSeconds = 0;

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

// Start timer function
function start() {
  // Validations for inputs
  validateInput("activeTime", "You must add active time!", "activeTimeErrorContainer", "timeError");
  validateInput("restTime", "You must add rest time!", "restTimeErrorContainer", "timeError");

  // Check if error messages are displayd. If not run timer.
  if (document.querySelectorAll(".timeError").length == 0) {
    // If timer has been ended and user clicks start
    if (isEnded) {
      createMessage("timerHeading", `Keep going on!`);
      seconds = activeTimeInSeconds;
      milliSeconds = 0;
      currentPhase = "active";
      if (exerciseList.getElementsByTagName("li").length > 0) {
        // Activating first exercise from the list
        exerciseList.getElementsByTagName("li")[0].appendChild(activeElement);
      }
      isEnded = false;
    }
    // If timer has been paused and user clicks start
    if (isPaused) {
      // Check if timer is used first time
      if (currentPhase === "active" && seconds === undefined) {
        createMessage("timerHeading", `Keep going on!`);

        // Set seconds to active time that user has set
        seconds = activeTimeInSeconds;

        // Check if excercises is added
        if (exerciseList.getElementsByTagName("li").length > 0) {
          // Activating first exercise from the list
          exerciseList.getElementsByTagName("li")[0].appendChild(activeElement);
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
    // Pause timer
    isPaused = true;
  }
}

// End timer function
function end() {
  // Add timer setting UI
  if (settingsUiOn === false) {
    timerSettingsUi();
  }

  // Pauses timer
  isPaused = true;
  // Ends timer
  isEnded = true;

  // Reset timer text element
  createMessage("timer", ``);
  // Reset timer heading text element
  createMessage("timerHeading", ``);

  // Check if excercises is added
  if (exerciseList.getElementsByTagName("li").length > 0) {
    // Removes active indicator
    document.getElementById("activeExercise").remove();
    // Sets index back to 0 so when timer is started it's correct
    index = 0;
  }
}

// Function that runs timer after every 10 milliseconds if timer is not paused
const timerInterval = setInterval(() => {
  if (!isPaused) {
    timer();
  }
}, 10);
