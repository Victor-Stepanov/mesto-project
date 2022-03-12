import { log, config } from "./const.js"

// Проверяем статус запроса
const checkStatus = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
}
// 3.Получаем инфу о пользователи
export const getInfoAboutUser = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers
	})
		.then(res => checkStatus(res))
		.catch(err => log(err))
}

//4.Отправляем get запрос на получение карточек
export const getInitialCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers
	})
		.then(res => checkStatus(res))
		.catch((err) => log("Что-то пошло не так", err))
}
//6. Добавление новой карточки
export const sendCardFromServer = (card) => {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: card.name,
			link: card.link
		})

	})
		.then(res => checkStatus(res))
		.catch(err => log("Ошибка", err))

}

//5. Редактирование профиля
export const updateProfileInfo = (name, about) => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			about: about
		})
	})
		.then(res => checkStatus(res))
		.catch(err => log("Что-то пошло не так", err))

};

//10. Обновление аватара пользователя
export const updateProfilePhoto = (avatar) => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({ avatar: avatar })
	})
		.then(res => checkStatus(res))
		.catch(err => log("Что-то пошло не так", err))

};
//8. Удаление карточки
export const deleteCard = (cardId) => {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	})
		.then((res) => checkStatus(res))
		.catch((err) => log("Что-то пошло не так", err))

}
//9. Постановка лайка
export const addLikeCard = (cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "PUT",
		headers: config.headers,
	})
		.then((res) => checkStatus(res))
		.catch((err) => log("Ошибка", err))

}
//9. Снятие лайка
export const removeLikeCard = (cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	})
		.then((res) => checkStatus(res))
		.catch((err) => log("Что-то пошло не так", err))
}