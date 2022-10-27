export function addClass(targetId, classNameToAdd) {
  const target = document.getElementById(targetId);
  target.classList.add(classNameToAdd);
}

export function removeClass(targetId, classNameToRemove) {
  const target = document.getElementById(targetId);
  target.classList.remove(classNameToRemove);
}

// Select specific elements by existing class and add new class
export function addClassForElements(elementSelector, classNameToAdd) {
  const elements = document.querySelectorAll(elementSelector);
  // Add class for each selected element
  elements.forEach((element) => {
    element.classList.add(classNameToAdd);
  });
}
export function removeClassForElements(elementSelector, classToRemove) {
  const elements = document.querySelectorAll(elementSelector);
  // Add class for each selected element
  elements.forEach((element) => {
    element.classList.remove(classToRemove);
  });
}
