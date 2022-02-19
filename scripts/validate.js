const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input-error',
	errorClass: 'popup__error_visible'
};

const showInputError = (inputElement, errorElement, errorMessage, config) => {
  inputElement.classList.add(`.${inputElement.name}-error`);
  errorElement.textContent = errorMessage;
}
const hideInputError = (inputElement, errorElement, config) => {
  inputElement.classList.remove(`.${inputElement.name}-error`);
  errorElement.textContent = '';
}
const checkInputValidity = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(config.inputErrorClass);
  if (inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, config);
  } {
    showInputError(inputElement, errorElement, inputElement.validationMessage, config);
  }
  
};

const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
}
const hasInvalidInput = (inputList) => inputList.some(inputElement => !inputElement.validity.valid);
const toggleButtonState = (formElement, inputList, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  }
  {
    enableButton(buttonElement, config);
    }
};





const setEventListeners = (formElement, config) => {
	const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
	inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(formElement, inputList, config);
      
			
    });
    toggleButtonState(formElement, inputList, config);

	})
}
// Ф-ция выбирает все формы
const enableValidation = (config) => {
	const forms = Array.from(document.querySelectorAll(config.formSelector));

  // Убираем дефолт для формы
	forms.forEach(formElement => {
		formElement.addEventListener('submit', evt => {
      evt.preventDefault();
  
			
		})
    setEventListeners(formElement, config);
	});
}


enableValidation(validationConfig);