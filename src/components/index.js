import "../pages/index.css";
import { enableValidation } from "./validate.js";
import {
  getInitialCards,
  getInfoAboutUser,
  sendCardFromServer,
  updateProfileInfo,
  updateProfilePhoto
} from "./api.js";
import { renderElement, createCard } from "./card.js";
import {
  editProfileButton,
  closeProfilePopupButton,
  popupProfile,
  validationConfig,
  addProfileButton,
  popupCardCloseButton,
  popupCard,
  popupImage,
  buttonCloseImage,
  popupUpdate,
  nameInput,
  jobInput,
  profileInfoAbout,
  profileInfoName,
  buttonCLoseUpdatePhoto,
  buttonEditProfile,
  buttonEditProfilePhoto,
  updatePhoto,
  log,
  buttonAddCard,
  elementsContainer,
  inputTitle,inputLink, user, formPhotoElement, inputLinkPhoto
} from "./const.js";

import {openPopup, closePopup} from './modal.js'
//
["mouseover", "click"].forEach(function (idx) {
  let handler = function () {
    if (idx === "click") {
      openPopup(popupUpdate);
    }
  };
  updatePhoto.addEventListener(idx, handler);
});
// Блок работы с профилем
editProfileButton.addEventListener("click", () => {
  //nameInput - инпут считывания в форме
  //profileInfoName - поле профиля
  nameInput.value = profileInfoName.textContent;
  jobInput.value = profileInfoAbout.textContent;
  openPopup(popupProfile);
});
closeProfilePopupButton.addEventListener("click", () =>
  closePopup(popupProfile)
);
popupProfile.addEventListener("submit", editProfile);
//add card
addProfileButton.addEventListener("click", () => openPopup(popupCard));
popupCardCloseButton.addEventListener("click", () => closePopup(popupCard));
popupCard.addEventListener("submit", addNewCardFromServer);
// close image
buttonCloseImage.addEventListener("click", () => closePopup(popupImage));
//close
enableValidation(validationConfig);
//Обновление профиля пользователя
const promises = [getInfoAboutUser(), getInitialCards()];
const getInfo = Promise.all(promises)
getInfo
  //Сделали запрос, из массива 0(инфо о профиле), получили нужную информацию
  .then((res) => {
    profileInfoName.textContent = res[0].name;
    profileInfoAbout.textContent = res[0].about;
    updatePhoto.src = res[0].avatar;
    user.id = res[0]._id;
    //Рендер элементов из массива 1(карточки) полученных с сервера
    res[1].forEach((element) => {
      renderElement(element, user.id)
    })
    })
  .catch(err => log("Ошибка при получение данных", err))


popupProfile.addEventListener("submit", editProfile); // форма профиля
// Добавление карточки
function addNewCardFromServer(evt) {
  evt.preventDefault();
  buttonAddCard.textContent = "Создание...";
  sendCardFromServer({
    name: inputTitle.value,
    link: inputLink.value,
  })
    .then((res) => {
      elementsContainer.prepend(createCard(res, user.id));
      closePopup(popupCard); 
    })
    .catch((err) => log("При добалении card возникла ошибка", err))
    .finally(() => {
      buttonAddCard.textContent = "Создать";
      inputTitle.value = '';
      inputLink.value = '';
      buttonAddCard.classList.add('popup__button_disabled');
      buttonAddCard.disabled = true;
    });
}


//Блок профиля
function editProfile(evt) {
  evt.preventDefault();
  buttonEditProfile.textContent = "Сохранение..."
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
    .catch(err => log("Что-то пошло не так", err.message))
    .finally(() => {
      buttonEditProfile.textContent = "Сохранить"
      buttonEditProfile.classList.add('popup__button_disabled');
      buttonEditProfile.disabled = true;
    })

}

const updatePictureProfile = (evt) => {
  evt.preventDefault();
  buttonEditProfilePhoto.textContent = "Сохранение..."
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
      buttonEditProfilePhoto.classList.add('popup__button_disabled');
      buttonEditProfilePhoto.disabled = true;
      buttonEditProfilePhoto.textContent = "Сохранить"
    })

};

formPhotoElement.addEventListener("submit", updatePictureProfile);

buttonCLoseUpdatePhoto.addEventListener("click", () => closePopup(popupUpdate));
//Инфо о пользователе для работы с карточками
