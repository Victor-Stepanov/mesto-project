import { openPopup, closePopup } from "./utils.js";
import { createCard } from "./card.js";
import {toggleButtonState} from "./validate.js"
import {
  inputLink,
  inputTitle,
  elementsContainer,
  popupCard,
  nameInput,
  jobInput,
  profileInfoName,
  profileInfoAbout,
  popupProfile,
  popupImageBig,
  popupFigcaption,
  popupImage,
} from "./const.js";

//
export const editProfile = () => {
  nameInput.value = profileInfoName.textContent;
  jobInput.value = profileInfoAbout.textContent;
  openPopup(popupProfile);
};
export const sendProfile = (evt) => {
  evt.preventDefault();
  profileInfoName.textContent = nameInput.value;
  profileInfoAbout.textContent = jobInput.value;
  closePopup(popupProfile);
};
//add new card
export const addNewCard = (evt) => {
  evt.preventDefault();
  const newCard = { name: inputTitle.value, link: inputLink.value };
  elementsContainer.prepend(createCard(newCard));
  evt.target.reset();
  closePopup(popupCard);
  const buttonElement = document.querySelector('.img');
  buttonElement.classList.add('popup__button_disabled');
  buttonElement.disabled = true;
};

export const openImage = (evt) => {
  popupImageBig.src = evt.target.src;
  popupImageBig.alt = evt.target.alt;
  popupFigcaption.textContent = evt.target.alt;
  openPopup(popupImage);
};
