// карточки
import { elementsContainer, cardTemplate, log } from './const.js'
import { openImage } from './modal.js'
import { deleteCard, removeLikeCard, addLikeCard } from './api.js'


export function createCard(element, userID) {
	const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
	const cardImage = cardElement.querySelector(".element__image");
	const cardTitle = cardElement.querySelector(".element__name");
	const deleteElementButton = cardElement.querySelector(
		".element__delete-button"
	);
	const likeElementButton = cardElement.querySelector(".element__like-button");
	const likeCounter = cardElement.querySelector(".element__like-counter")
	// Присваеваем значения с сервера
	const cardID = element._id;
	cardImage.src = element.link;
	cardImage.alt = element.name;
	cardTitle.textContent = element.name;
	likeCounter.textContent = element.likes.length; // длинна массива likes

	
	//Корзина появляется только для карточек владельца
	if (element.owner._id !== userID) {
		deleteElementButton.remove();
	}
	//У карточек, которые лайкнул пользователь, будет активен лайк
	element.likes.forEach((idx) => {
		if (idx._id === userID) {
			likeElementButton.classList.add("element__like-button_active")
		}

	});

	//Удаляем карточку по ее ID 
	deleteElementButton.addEventListener("click", (evt) => {
		deleteCard(cardID)
			.then((res) => {
				cardElement.remove()
			})
			.catch((err) => log("Что-то пошло не так", err))
	}
	);
	//Проверяем есть ли у карточки лайк, если есть то удаляем, если нет добавляем
	// Так же увеличиваем/уменьшаем кол-во лайков 
	likeElementButton.addEventListener("click", (evt) => {
		if (evt.target.classList.contains("element__like-button_active")) {
			removeLikeCard(cardID)
				.then((res) => {
					likeElementButton.classList.remove("element__like-button_active")
					likeCounter.textContent = res.likes.length;
				})
				.catch((err) => log("Ошибка", err))
		} {
			addLikeCard(cardID)
				.then((res) => {
					likeElementButton.classList.add("element__like-button_active")
					likeCounter.textContent = res.likes.length;
					log(likeCounter.textContent)
				})
				.catch((err) => log("Ошибка", err))
		}
	}
	);
	cardImage.addEventListener("click", openImage);
	return cardElement;
}


export const renderElement = (element, userID) => {
	const cardElement = createCard(element, userID);
	elementsContainer.append(cardElement);
}


