export const showInputError = (formElement, inputElement, errorMessage, config) => {
	const errorElement = formElement.querySelector(
		`.${inputElement.name}-input-error`
	);
	inputElement.classList.add(config.inputErrorClass); // add red line
	errorElement.textContent = errorMessage;
	errorElement.classList.add(config.errorClass);
};

export const hideInputError = (formElement, inputElement, config) => {
	const errorElement = formElement.querySelector(
		`.${inputElement.name}-input-error`
	);
	inputElement.classList.remove(config.inputErrorClass); // add red line
	errorElement.classList.remove(config.errorClass);
	errorElement.textContent = "";
};

export const isValid = (formElement, inputElement, config) => {
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

export function cleanInputErrors() {
	

};

export const disableButton = (buttonElement, config) => {
	buttonElement.classList.add(config.inactiveButtonClass);
	buttonElement.disabled = true;
};

export const enableButton = (buttonElement, config) => {
	buttonElement.classList.remove(config.inactiveButtonClass);
	buttonElement.disabled = false;
};

// Ф-ция возвращает true если элемент не валид
export const hasInvalidInput = (inputList) =>
	inputList.some((inputElement) => !inputElement.validity.valid);


export const toggleButtonState = (formElement, inputList, config) => {
	const buttonElement = formElement.querySelector(config.submitButtonSelector);
	hasInvalidInput(inputList) ? disableButton(buttonElement, config) : enableButton(buttonElement, config);

};

export const setEventListeners = (formElement, config) => {
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

export const enableValidation = (config) => {
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