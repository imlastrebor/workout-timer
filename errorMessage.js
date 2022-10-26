// Function creates error message
export function createErrorMessage(messageText, setElementClass, targetId) {
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
export function removeErrorMessage(errorMessageClassName, targetId) {
  // Select all elements with specific class name
  const elementToDelete = document.getElementById(targetId).querySelectorAll("." + errorMessageClassName);
  // Run remove for each selected element
  elementToDelete.forEach((element) => {
    element.remove();
  });
}
