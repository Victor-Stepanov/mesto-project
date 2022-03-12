import { openPopup, closePopup } from "./utils.js";
import { createCard } from "./card.js";
import { updateProfileInfo, sendCardFromServer, updateProfilePhoto } from "./api.js"

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
  inputLinkPhoto,
  updatePhoto,
  popupUpdate,
  log
} from "./const.js";

//Блок профиля
export function editProfile(evt) {
  evt.preventDefault();
  const buttonElement = document.querySelector('.popup__button')
  buttonElement.textContent = "Сохранение..."
  updateProfileInfo(
    {
      name: nameInput.value,
      about: jobInput.value
    }
  )
    .then((res) => {
      profileInfoName.textContent = nameInput.value;
      profileInfoAbout.textContent = jobInput.value;
      closePopup(popupProfile);
    })
    .catch(err => log("Ошибка", err.message))
    .finally(() => {
      buttonElement.textContent = "Сохранить"
      buttonElement.classList.add('popup__button_disabled');
      buttonElement.disabled = true;
    })

}

export const updatePictureProfile = (evt) => {
  evt.preventDefault();
  const buttonElement = document.querySelector('.send')
  buttonElement.textContent = "Сохранение..."
  updateProfilePhoto(
    { avatar: inputLinkPhoto.value }
  )
    .then((res) => {
      updatePhoto.src = inputLinkPhoto.value;
      closePopup(popupUpdate);
    })
    .catch(err => log("Что-то пошло не так", err))
    .finally(() => {
      inputLinkPhoto.value = '';
      buttonElement.classList.add('popup__button_disabled');
      buttonElement.disabled = true;
      buttonElement.textContent = "Сохранить"
    })

};
//add new card
export function addNewCardFromServer(evt) {
  evt.preventDefault();
  const buttonElement = document.querySelector(".img");
  buttonElement.textContent = "Создание...";
  sendCardFromServer({
    name: inputTitle.value,
    link: inputLink.value,
  })
    .then((res) => {
      elementsContainer.prepend(createCard(res));
      closePopup(popupCard);
    })
    .catch((err) => log("При добалении card возникла ошибка", err))
    .finally(() => {
      buttonElement.textContent = "Создать";
      inputTitle.value = '';
      inputLink.value = '';
      buttonElement.classList.add('popup__button_disabled');
      buttonElement.disabled = true;
    });
}

export const openImage = (evt) => {
  popupImageBig.src = evt.target.src;
  popupImageBig.alt = evt.target.alt;
  popupFigcaption.textContent = evt.target.alt;
  openPopup(popupImage);
};
