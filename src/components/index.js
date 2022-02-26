import { enableValidation } from "./validate.js";
import { addNewCard, editProfile, sendProfile } from "./modal.js";
import { openPopup, closePopup, closePopupfromOverlay } from "./utils.js";
import { renderElement } from "./card.js";
import {
  initialCards,
  editProfileButton,
  closeProfilePopupButton,
  popupProfile,
  validationConfig,
  addProfileButton,
  popupCardCloseButton,
  popupCard,
  popupImage,
  buttonCloseImage,
} from "./const.js";

//Рендер карточек
initialCards.forEach(renderElement);
// Блок работы с профилем
editProfileButton.addEventListener("click", editProfile);
closeProfilePopupButton.addEventListener("click", () =>
  closePopup(popupProfile)
);
popupProfile.addEventListener("submit", sendProfile);
//add card
addProfileButton.addEventListener("click", () => openPopup(popupCard));
popupCardCloseButton.addEventListener("click", () => closePopup(popupCard));
popupCard.addEventListener("submit", addNewCard);
// close image
buttonCloseImage.addEventListener("click", () => closePopup(popupImage));
//close
document.addEventListener("click", closePopupfromOverlay);

enableValidation(validationConfig);
