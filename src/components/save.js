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
const { log } = console;
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
  document.addEventListener("keydown", closePopupfromEsc);
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  document.removeEventListener("keydown", closePopupfromEsc);
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

// TODO: Сделать валидацию форм

function closePopupfromEsc(evt) {
  if (evt.key === "Escape") {
    const form = document.querySelectorAll(".popup");
    form.forEach((item) => {
      closePopup(item);
    });
  }
}

function closePopupfromOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}


document.addEventListener("click", closePopupfromOverlay);

// Блок с валидацие форм

const validationConfig = {
  formSelector: ".popup__form", // форма
  inputSelector: ".popup__input", // инпуты
  submitButtonSelector: ".popup__button", // кнопка
  inactiveButtonClass: "popup__button_disabled", // не актив кнопка
  inputErrorClass: "popup__input_type_error", // добавляем красную полоску
  errorClass: "popup__input-error_active", //
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add(config.inputErrorClass); // add red line
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove(config.inputErrorClass); // add red line
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

function cleanInput(popup) {
  const input = popup.querySelector('.popup__input_type_error');
  const error = popup.querySelector('.popup__input-error_active');
  input.forEach(element => element.classList.remove('.popup__input_type_error'));
  error.forEach(element => element.classList.remove('.popup__input-error_active'));


};

const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
};

// Ф-ция возвращает true если элемент не валид
const hasInvalidInput = (inputList) =>
  inputList.some((inputElement) => !inputElement.validity.valid);


const toggleButtonState = (formElement, inputList, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  hasInvalidInput(inputList) ? disableButton(buttonElement, config) : enableButton(buttonElement, config);
 
};

const setEventListeners = (formElement, config) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      isValid(formElement, inputElement, config);
      toggleButtonState(formElement, inputList, config);
    });
  });
};

const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, config);
  });
};

// Вызовем функцию
enableValidation(validationConfig);
