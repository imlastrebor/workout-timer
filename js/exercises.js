import { exerciseList } from "./globalVariables.js";
import { validateInput } from "./validation.js";
import { addClass, removeClass } from "./modifyClass.js";

export let exerciseArray = [];

export function exercisesToList() {
  // Export items froms array and add items as li element to exerciseList

  exerciseArray.forEach((exercise, index) => {
    // Variables for li element
    const listElement = document.createElement("li");

    const exerciseInfoContainer = document.createElement("div");
    exerciseInfoContainer.classList.add("exerciseInfoContainer");

    const activeIndicator = document.createElement("span");
    activeIndicator.classList.add("dot");

    // Variable for p element. Inserts exercise name to p element
    const exerciseText = document.createElement("p");
    exerciseText.textContent = exercise;

    // Add delete button
    const btn = document.createElement("button");
    btn.innerHTML = "Delete";
    btn.classList.add("secondaryBtn");
    btn.classList.add("deleteExerciseBtn");
    btn.dataset.id = index;
    btn.addEventListener("click", deleteExercise);

    // Adds p element and button to li element and after that adds li element to ul
    listElement.appendChild(exerciseInfoContainer);
    exerciseInfoContainer.appendChild(activeIndicator);
    exerciseInfoContainer.appendChild(exerciseText);
    listElement.appendChild(btn);
    exerciseList.appendChild(listElement);
  });
}

export function addExercise() {
  validateInput({
    validationTargetId: "exercises",
    messageText: "Add exercises name",
    messageTargetClass: "exerciseErrorContainer",
    elementId: "exerciseError",
  });

  // Show message container if errors displayed
  if (document.querySelectorAll(".exerciseError").length > 0) {
    addClass("exerciseErrorContainer", "visible");
    removeClass("exerciseErrorContainer", "hidden");
  }

  // If error are not displayed
  if (document.querySelectorAll(".exerciseError").length == 0) {
    // Empty ul so it doesn't show old elements as double
    exerciseList.innerHTML = "";
    document.getElementById("exerciseListInfoContainer").innerHTML = "";

    // Hides error message container element from HTML
    addClass("exerciseErrorContainer", "hidden");
    removeClass("exerciseErrorContainer", "visible");

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
    document.getElementById("exerciseListInfoContainer").appendChild(messageExerciseListEmpty);
  }
}
