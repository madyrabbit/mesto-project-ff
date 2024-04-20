// Проверка правильности
export function enableValidation(parametersValidation) {
  const formList = Array.from(document.querySelectorAll(parametersValidation.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(
      formElement, 
      parametersValidation.inputSelector, 
      parametersValidation.submitButtonSelector, 
      parametersValidation.inactiveButtonClass, 
      parametersValidation.inputErrorClass, 
      parametersValidation.errorClass);
  });
};

// Неверный ввод
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Состояние кнопки переключения
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

//
const setEventListeners = (
    formElement, 
    inputElement, 
    submitButtonSelector, 
    inactiveButtonClass, 
    inputErrorClass, 
    errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputElement));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// Проверка правильности введенных данных
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// Показать ошибку ввода
const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Убрать ошибку ввода
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Очистка ошибок валидации формы
export const disableValidation = (formElement, parametersValidation) => {

  const inputList = Array.from(formElement.querySelectorAll(parametersValidation.inputSelector));
  const buttonElement = formElement.querySelector(parametersValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, parametersValidation.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, parametersValidation.inputErrorClass, parametersValidation.errorClass);
    inputElement.setCustomValidity("");
  });
  
};