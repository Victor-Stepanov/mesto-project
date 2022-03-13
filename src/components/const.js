// Модальные окна
export const popupCard = document.querySelector(".popup_card");
export const popupImage = document.querySelector(".popup_image");
export const popupUpdate = document.querySelector(".popup_update-photo");

//Block work with profile
export const sectionProfile = document.querySelector(".profile"); // section prifle
export const editProfileButton = sectionProfile.querySelector(".profile__edit-button"); // btn edit
export const profileInfoName = sectionProfile.querySelector(".profile__name"); // h1 Имя
export const profileInfoAbout = sectionProfile.querySelector(".profile__moniker"); // p Профессия
export const addProfileButton = sectionProfile.querySelector(".profile__add-button"); // btn save/add
//modal profile
export const popupProfile = document.querySelector(".popup_profile");// modal
export const formProfileElement = popupProfile.querySelector(".profile-form");// form profile modal
export const nameInput = formProfileElement.querySelector('input[name="name"]');// input profile name
export const jobInput = formProfileElement.querySelector('input[name="about"]');// input profile about/job
export const closeProfilePopupButton = popupProfile.querySelector(".close-profile");// btn close

//
export const updatePhoto = document.querySelector('.profile__avatar');
export const inputLinkPhoto = document.querySelector('input[name="link-photo"]');
export const formPhotoElement = document.querySelector('form[name="new-photo"]')
export const buttonCLoseUpdatePhoto = document.querySelector('.update-close');
//

export const popupCardCloseButton = popupCard.querySelector(".close-card");
export const inputTitle = popupCard.querySelector('input[name="name-card"]');
export const inputLink = popupCard.querySelector('input[name="link"]');

// Место для модального окна увеличения фото
export const popupFigure = popupImage.querySelector(".popup__figure");
export const popupImageBig = popupFigure.querySelector(".popup__figure-image");
export const popupFigcaption = popupFigure.querySelector(".popup__figure-figcaption");
export const buttonCloseImage = popupFigure.querySelector(".figure-close");
//Кнопки для работы
export const buttonAddCard = document.querySelector(".img"); // addNewCardFromServer
export const buttonEditProfile = document.querySelector(".edit"); // editProfile
export const buttonEditProfilePhoto = document.querySelector(".send"); // editProfilePhoto

//
export const elementsContainer = document.querySelector(".elements");
export const cardTemplate = document.querySelector("#card-template").content;
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validationConfig = {
  formSelector: ".popup__form", // форма
  inputSelector: ".popup__input", // инпуты
  submitButtonSelector: ".popup__button", // кнопка
  inactiveButtonClass: "popup__button_disabled", // не актив кнопка
  inputErrorClass: "popup__input_type-error", // добавляем красную полоску
  errorClass: "popup__input-error_active", //
};
export const { log } = console;
export const user = {};
const token = '78c185d4-31af-42e6-8e64-c3782dbb21e3'
export const config = {
	baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
	headers: {
		authorization: token,
		'Content-Type': 'application/json'
	}
}


