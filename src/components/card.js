// карточки
import { elementsContainer, cardTemplate } from './const.js'
import {openImage} from './modal.js'

//Todo разбить на мелкие функции

export function createCard(item) {
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
	cardImage.addEventListener("click", openImage);
	return cardElement;
}
  

export const renderElement = (element) => {
  const cardElement = createCard(element);
  elementsContainer.append(cardElement);
};

