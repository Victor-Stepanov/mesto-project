import "../pages/index.css";
import { enableValidation } from "./validate.js";
import { editProfile, updatePictureProfile, addNewCardFromServer } from "./modal.js";
import {
  getInitialCards,
  getInfoAboutUser,
} from "./api.js";
import { openPopup, closePopup } from "./utils.js";
import { renderElement } from "./card.js";
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
  formSumbit,
  btnClose,
  updatePhoto,
  log
} from "./const.js";

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

popupProfile.addEventListener("submit", editProfile); // форма профиля

formSumbit.addEventListener("submit", updatePictureProfile);
//Инфо о пользователе для работы с карточками
//TODO: Promise.all
const promises = [getInfoAboutUser(), getInitialCards()];
const getInfo = Promise.all(promises)
getInfo
  //Сделали запрос, из массива 0(инфо о профиле), получили нужную информацию
  .then((res) => {
    const userID = res[0]._id;
    profileInfoName.textContent = res[0].name;
    profileInfoAbout.textContent = res[0].about;
    updatePhoto.src = res[0].avatar;
    //Рендер элементов из массива 1(карточки) полученных с сервера
    res[1].forEach((element) => {
      renderElement(element, userID);
    })
  })
  .catch(err => log("Ошибка при получение данных", err))


// Добавление карточки

btnClose.addEventListener("click", () => closePopup(popupUpdate));
