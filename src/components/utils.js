export function openPopup(popup) {
  document.addEventListener("keydown", handleEscKey);
  document.addEventListener("click", handleOverlayClick);
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  document.removeEventListener("keydown", handleEscKey);
  document.removeEventListener("click", handleOverlayClick);
  popup.classList.remove("popup_opened");
}

export function handleEscKey(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

export function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}
