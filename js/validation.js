import { createErrorMessage, removeErrorMessage } from "./errorMessage.js";

// Validation
export function validateInput({ validationTargetId, messageText, messageTargetClass, elementId }) {
  if (document.getElementById(validationTargetId).value === "") {
    createErrorMessage(messageText, elementId, messageTargetClass);
  } else {
    removeErrorMessage(elementId, messageTargetClass);
  }
}
