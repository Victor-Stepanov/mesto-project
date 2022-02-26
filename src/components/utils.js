export function openPopup(popup) {
  document.addEventListener("keydown", closePopupfromEsc);
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  document.removeEventListener("keydown", closePopupfromEsc);
  popup.classList.remove("popup_opened");
}

export function closePopupfromEsc(evt) {
  if (evt.key === "Escape") {
    const form = document.querySelectorAll(".popup");
    form.forEach((item) => {
      closePopup(item);
    });
  }
}

export function closePopupfromOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}
