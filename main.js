let exerciseList = [];

// Validation
function validateInput(validationId, messageTargetId, message) {
  if (document.getElementById(validationId).value == "") {
    document.getElementById(messageTargetId).innerHTML = message;
  } else {
    document.getElementById(messageTargetId).innerHTML = "";
  }
}

function exercisesToList() {
  // Export items froms array and add items as li element to exerciseList
  exerciseList.map((exercise) => {
    // Variables for li element
    const listElement = document.createElement("li");

    // Variable for p element. Inserts exercise name to p element
    const exerciseText = document.createElement("p");
    exerciseText.textContent = exercise;

    // Add delete button
    const btn = document.createElement("button");
    btn.innerHTML = "Delete";
    btn.addEventListener("click", deleteExercise);

    // Adds p element and button to li element and after that adds li element to ul
    listElement.appendChild(exerciseText);
    listElement.appendChild(btn);
    document.getElementById("exerciseList").appendChild(listElement);
  });
}

function deleteExercise(e) {
  // Empty ul
  document.getElementById("exerciseList").innerHTML = "";

  // Checks the name of the exercise which is being deleted
  const targetLi = e.target.previousSibling.innerHTML;

  // Checks array index of the exercise which is being deleted
  const indexOfTarget = exerciseList.indexOf(targetLi);

  // Use array index to specify which exercise is going to be deleted
  exerciseList.splice(indexOfTarget, 1);

  // Export items froms array and add items as li element to exerciseList
  exercisesToList();

  // If there's no exercises after deleting exercise show message to user
  if (exerciseList.length <= 0) {
    // Creates p element for message and add some text into element
    const messageExerciseListEmpty = document.createElement("p");
    messageExerciseListEmpty.textContent = `You removed all list elements. Add new exercises.`;

    // Adds p element to ul
    document.getElementById("exerciseList").appendChild(messageExerciseListEmpty);
  }
}

function addExercise() {
  // Check is the input field filled
  if (document.getElementById("exercises").value != "") {
    // Empty ul and errorMessage
    document.getElementById("exerciseList").innerHTML = "";
    document.getElementById("messageContainer").innerHTML = "";

    // Get the exercise name from input field
    const exerciseInput = document.getElementById("exercises");

    // Add exercise to array
    exerciseList.push(exerciseInput.value);

    // Export items froms array and add items as li element to exerciseList
    exercisesToList();

    // Empty input field
    exerciseInput.value = "";
  } else {
    validateInput("exercises", "messageContainer", "You need to enter exercise!");

    /*
        Tulisiko validation funktion ottaa mallia tästä?
        - Nyt HTML:n sekaan on määritelty tyhjiä p -elementtejä.
        - Tulisiko ne lisätä ja poistaa aina tarpeen mukaan? 
        
        // Empty error message
        document.getElementById('messageContainer').innerHTML = '';
        
        // Create new p element for error message and add it to errorMessageContainer
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'You need to enter exercise!';
        document.getElementById('messageContainer').appendChild(errorMessage);
        */
  }
}

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
      }, "2000");
    } else if (currentPhase === "rest") {
      createMessage("timerHeading", `Rest done. Get ready!`);
      //document.getElementById('timer').innerHTML = `Rest done! Get ready for next excercise.`;
      // If current phase is rest lets change the it to active
      currentPhase = "active";

      // Set next exercise active
      if (document.getElementById("exerciseList").getElementsByTagName("li").length >= 1) {
        // Check if index grows bigger than list has items return it to starting position
        if (document.getElementById("exerciseList").getElementsByTagName("li").length <= index + 1) {
          index = -1;
        }
        // Bump up the index
        index++;
        // Add active indicator into the element
        document.getElementById("exerciseList").getElementsByTagName("li")[index].appendChild(activeElement);
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
      }, "2000");
    }
  }
}

// Start timer function
function start() {
  validateInput("activeTime", "activeTimeError", "You must add active time!");
  validateInput("restTime", "restTimeError", "You must add rest time!");

  // Testing how to spot if error messages are displayd
  /* 
  if (condition) {
    console.log("Errors found. Fix them before you can continue.");
  }
  */

  console.log("Error length: " + document.getElementsByClassName("error").length);

  if (activeTime.value == "") {
    return;
  } else if (restTime.value == "") {
    return;
  } else {
    // If timer has been ended and user clicks start
    if (isEnded) {
      createMessage("timerHeading", `Keep going on!`);
      seconds = activeTimeInSeconds;
      milliSeconds = 0;
      currentPhase = "active";
      if (document.getElementById("exerciseList").getElementsByTagName("li").length > 0) {
        // Activating first exercise from the list
        document.getElementById("exerciseList").getElementsByTagName("li")[0].appendChild(activeElement);
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
        if (document.getElementById("exerciseList").getElementsByTagName("li").length > 0) {
          // Activating first exercise from the list
          document.getElementById("exerciseList").getElementsByTagName("li")[0].appendChild(activeElement);
        }
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
  // Pauses timer
  isPaused = true;
  // Ends timer
  isEnded = true;

  // Reset timer text element
  createMessage("timer", ``);
  // Reset timer heading text element
  createMessage("timerHeading", ``);

  // Check if excercises is added
  if (document.getElementById("exerciseList").getElementsByTagName("li").length > 0) {
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
