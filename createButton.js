// Create button
export function createButtonModule(setElementClass, setElementId, buttonText, targetId) {
  const button = document.createElement("button");
  button.setAttribute("class", setElementClass);
  button.setAttribute("id", setElementId);
  button.textContent = buttonText;
  document.getElementById(targetId).appendChild(button);
}
