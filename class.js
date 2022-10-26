export function addClass(targetId, classNameToAdd) {
  const target = document.getElementById(targetId);
  target.classList.add(classNameToAdd);
}

export function removeClass(targetId, classNameToRemove) {
  const target = document.getElementById(targetId);
  target.classList.remove(classNameToRemove);
}
