import { popupCard, popupProfile, popupImage } from "./ variables.js";


// Блок работы с модальным окном профиля
/**
 * openPopup - открытие модального окна
 * closePopup - закрытие модального окна
 */
 export function openPopup(popup) {
	popup.classList.add("popup_opened");
  }
  
  export function closePopup(popup) {
	popup.classList.remove("popup_opened");
  }
  
