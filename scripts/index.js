// Модальные окна
const popupProfile = document.querySelector(".popup_profile");
const popupCard = document.querySelector(".popup_card");
const popupImage = document.querySelector(".popup_image");

// section profile
const sectionProfile = document.querySelector(".profile");
const editProfileButton = sectionProfile.querySelector(".profile__edit-button");
const profileInfoName = sectionProfile.querySelector(".profile__name"); // h1 Имя
const profileInfoAbout = sectionProfile.querySelector(".profile__moniker"); // p Профессия
const addProfileButton = sectionProfile.querySelector(".profile__add-button");

//
const popupCardCloseButton = popupCard.querySelector(".close-card");
const inputTitle = popupCard.querySelector('input[name="name-card"]');
const inputLink = popupCard.querySelector('input[name="link"]');

//
const formElement = popupProfile.querySelector(".profile-form");
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="about"]');
const closeProfilePopupButton = popupProfile.querySelector(".close-profile");

// Место для модального окна увеличения фото
const popupFigure = popupImage.querySelector(".popup__figure");
const popupImageBig = popupFigure.querySelector(".popup__figure-image");
const popupFigcaption = popupFigure.querySelector(".popup__figure-figcaption");
const buttonCloseImage = popupFigure.querySelector(".figure-close");
//

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
function createCard(item) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const cardTitle = cardElement.querySelector(".element__name");
  const deleteElementButton = cardElement.querySelector(
    ".element__delete-button"
  );
  const likeElementButton = cardElement.querySelector(".element__like-button");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  deleteElementButton.addEventListener("click", (evt) =>
    evt.target.closest(".element").remove()
  );
  likeElementButton.addEventListener("click", (evt) =>
    evt.target.classList.toggle("element__like-button_active")
  );
  cardImage.addEventListener("click", (evt) => {
    popupImageBig.src = evt.target.src;
    popupImageBig.alt = evt.target.alt;
    popupFigcaption.textContent = evt.target.alt;
    openPopup(popupImage);
  });
  return cardElement;
}

const renderElement = (element) => {
  const cardElement = createCard(element);
  elementsContainer.append(cardElement);
};

// Блок работы с модальным окном профиля
/**
 * openPopup - открытие модального окна
 * closePopup - закрытие модального окна
 */
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Блок работы с профилем
/**
 * editProfileButton - Открыли модальное окно редактирование профиля,
 получили информацию об имени и профессии
 * closeProfilePopupButton - закрыли модальное окно без редактирования
 * popupProfile - Изменили информацию об имени и профессии
 */
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileInfoName.textContent;
  jobInput.value = profileInfoAbout.textContent;
  openPopup(popupProfile);
});
closeProfilePopupButton.addEventListener("click", () =>
  closePopup(popupProfile)
);

popupProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileInfoName.textContent = nameInput.value;
  profileInfoAbout.textContent = jobInput.value;
  closePopup(popupProfile);
});

// Блок работы с карточками
/**
 * addProfileButton - Открыли модальное окно добавления карточки
 * popupCardCloseButton - Закрыли модальное окно без добавления карточки
 * const addNewCard - Ф-ция добавления новой карточки в начало имеющихся карточек, 
   используется объект newCard в который добавляются значение name, link полученные из полей формы.
 * popupCard - Добавили новую карточку
 */

const addNewCard = (evt) => {
  evt.preventDefault();
  const newCard = { name: inputTitle.value, link: inputLink.value };
  elementsContainer.prepend(createCard(newCard));
  closePopup(popupCard);

  inputTitle.value = "";
  inputLink.value = "";
};

addProfileButton.addEventListener("click", () => openPopup(popupCard));

popupCardCloseButton.addEventListener("click", () => closePopup(popupCard));

popupCard.addEventListener("submit", addNewCard);

// Закрытие модального окна увеличенного фото

buttonCloseImage.addEventListener("click", () => closePopup(popupImage));

// Рендер карточек
initialCards.forEach(renderElement);

// TODO: ...
