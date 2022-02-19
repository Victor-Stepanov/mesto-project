import { popupImage, popupFigure, popupImageBig, popupFigcaption, cardTemplate, elementsContainer } from './ variables.js'
import { openPopup } from './utils.js';

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

 
  
export { initialCards, createCard, renderElement };
 