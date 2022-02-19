// Модальные окна
export const popupProfile = document.querySelector(".popup_profile");
export const popupCard = document.querySelector(".popup_card");
export const popupImage = document.querySelector(".popup_image");

// section profile
export const sectionProfile = document.querySelector(".profile");
export const editProfileButton = sectionProfile.querySelector(".profile__edit-button");
export const profileInfoName = sectionProfile.querySelector(".profile__name"); // h1 Имя
export const profileInfoAbout = sectionProfile.querySelector(".profile__moniker"); // p Профессия
export const addProfileButton = sectionProfile.querySelector(".profile__add-button");

//
export const popupCardCloseButton = popupCard.querySelector(".close-card");
export const inputTitle = popupCard.querySelector('input[name="name-card"]');
export const inputLink = popupCard.querySelector('input[name="link"]');

//
export const formElement = popupProfile.querySelector(".profile-form");
export const nameInput = formElement.querySelector('input[name="name"]');
export const jobInput = formElement.querySelector('input[name="about"]');
export const closeProfilePopupButton = popupProfile.querySelector(".close-profile");

// Место для модального окна увеличения фото
export const popupFigure = popupImage.querySelector(".popup__figure");
export const popupImageBig = popupFigure.querySelector(".popup__figure-image");
export const popupFigcaption = popupFigure.querySelector(".popup__figure-figcaption");
export const buttonCloseImage = popupFigure.querySelector(".figure-close");
//
export const elementsContainer = document.querySelector(".elements");
export const cardTemplate = document.querySelector("#card-template").content;