// Модальные окна
const popupProfile = document.querySelector(".popup_profile");
const popupCard = document.querySelector(".popup_card");
const popupImage = document.querySelector(".popup_image");
//

const profileCloseButton = document.querySelector(".popup__button-close");
const buttonAddCard = document.querySelector(".profile__add-button");

// section profile
const sectionProfile = document.querySelector(".profile");
const profileEditButton = sectionProfile.querySelector(".profile__edit-button");
const profileInfoName = sectionProfile.querySelector(".profile__name"); // h1 Имя
const profileInfoAbout = sectionProfile.querySelector(".profile__moniker"); // p Профессия

//
const closeCard = popupCard.querySelector(".close-card");
//const  cardNameInput = popupCard.querySelector('input[name="name-card"]');
//const  cardLinkInput = popupCard.querySelector('input[name="link"]');

//
const formElement = popupProfile.querySelector(".profile-form");
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="about"]');

// Место для модального окна увеличения фото
const popupFigure = popupImage.querySelector(".popup__figure")
const popupImageBig = popupFigure.querySelector(".popup__figure-image");
const popupFigcaption = popupFigure.querySelector(".popup__figure-figcaption");
const buttonCloseImage = popupFigure.querySelector(".figure-close");
//

const popupShow = document.querySelector(".popup");
const elementsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const initialCards = [
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

// Блок работы с карточками
function renderElement(element) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const cardTitle = cardElement.querySelector(".element__name");
  const elementDeleteButton = cardElement.querySelector(".element__delete-button");
  const elementLikeButton = cardElement.querySelector(".element__like-button");
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  elementsContainer.append(cardElement);

  elementDeleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".element").remove();
  });
  elementLikeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__like-button_active");
  });
  cardImage.addEventListener("click", (evt) => {
    popupImageBig.src = evt.target.src;
    popupImageBig.alt = evt.target.alt;
    popupFigcaption.textContent = evt.target.alt;
    popupOpen(popupImage);
  });

  return cardElement;
}

// Блок работы с модальным окном профиля
/**
 * popupOpen - открытие модального окна 
 * popupClose - закрытие модального окна 
 */
function popupOpen(popup) {
  popup.classList.add("popup_opened");
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
}

// Блок работы с профилем
/**
 * profileEditButton - Открылили модальное окно редактирование профиля,
 получили информацию об имени и професии
 * profileCloseButton - закрыли модальное окно без редактирования
 * popupProfile - Изменили информацию об имени и професии 
 */
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileInfoName.textContent;
  jobInput.value = profileInfoAbout.textContent;
  popupOpen(popupProfile);
});
profileCloseButton.addEventListener("click", () => popupClose(popupProfile)); 

popupProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileInfoName.textContent = nameInput.value;
  profileInfoAbout.textContent = jobInput.value;
  popupClose(popupProfile);
}); 

// Блок работы с карточками
/**
 * buttonAddCard - Открыли модальное окно добавления карточки
 * closeCard - Закрыли модальное окно без добавления карточки
 * const addNewCard - Ф-ция добавления новой карточки в начало имеющихся карточек, 
   используется объект newCard в который добавляются значение name, link полученные из полей формы.
 * popupCard - Добавили новую карточку
 */

const addNewCard = (evt) => {
  evt.preventDefault();
  const inputTitle = popupCard.querySelector('input[name="name-card"]');
  const inputLink = popupCard.querySelector('input[name="link"]');
  const newCard = { name: inputTitle.value, link: inputLink.value };
  elementsContainer.prepend(renderElement(newCard));
  popupClose(popupCard);

  inputTitle.value = "";
  inputLink.value = "";
};

buttonAddCard.addEventListener("click", () => popupOpen(popupCard));

closeCard.addEventListener("click", () => popupClose(popupCard));

popupCard.addEventListener("submit", addNewCard);

// Закрытие модального окна увелеченного фото

buttonCloseImage.addEventListener("click", () => popupClose(popupImage));

// Рендер карточек
initialCards.forEach(renderElement);

// TODO: ...