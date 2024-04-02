import {initialCards} from '../components/cards.js';

// Функция для создания новой карточки на основе данных карточки
function createCard(cardData, deleteCardCallback){
  // Получаем доступ к содержимому шаблона карточки в HTML по его идентификатору и создаем копию элемента карточки для заполнения данными
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link; // Установка ссылки на изображение
  cardElement.querySelector('.card__image').alt = cardData.name; // Установка альтернативного текста изображения
  cardElement.querySelector('.card__title').textContent = cardData.name; // Установка названия места

  // Добавляем обработчик события клика на кнопку удаления карточки, чтобы при клике карточка удалялась
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    deleteCardCallback(cardElement); // Вызов функции-колбэка для удаления карточки
  });

  return cardElement; // Возвращаем готовую карточку для дальнейшего использования
}

// Функция для добавления карточки в контейнер на странице
function renderCard(cardData, container){
  const card = createCard(cardData, function(cardElement) {
    cardElement.remove();
  }); // Создаем карточку с передачей колбэка для удаления
  container.appendChild(card); // Добавляем карточку в контейнер
}



// Выводим карточки на страницу
const placesList = document.querySelector('.places__list'); // Находим контейнер для карточек
initialCards.forEach((cardData) => {
  renderCard(cardData, placesList); // Для каждой карточки из начального списка создаем и выводим карточку на страницу
});

// const popupBg = document.querySelector('.popup');
// let popup = document.querySelector('.popup__content');
// let openPopupButtons = document.querySelectorAll('.open-popup'); 

const popupAll = document.querySelectorAll('.popup')
const popupElement = Array.from(popupAll)
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const cardImageAll = document.querySelectorAll('.card__image');
const cardImageArray = Array.from(cardImageAll);
const arrayImgAll = Object.values(initialCards);
const arrayImgLink = arrayImgAll.map(card => card.link);
const arrayImgName = arrayImgAll.map(card => card.name);



function openPopupEditProfile(element, popup) {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    popup.classList.add('popup_is-opened');
  })
}

function openPopupImg(array) {
  array.forEach((element, index) => {
    element.addEventListener('click', () => {
      popupTypeImage.classList.add('popup_is-opened');
      popupTypeImage.querySelector('.popup__image').src = arrayImgLink[index];
      popupTypeImage.querySelector('.popup__caption').textContent = arrayImgName[index];
    });
  });
}

function closePopupInput(popup) {
  const closePopupButton = popup.querySelector('.popup__close');
  closePopupButton.addEventListener('click', () => {
    popup.classList.remove('popup_is-opened');
  })

  document.addEventListener('click', (event) => {
    if (popupElement.includes(event.target)) {
      popup.classList.remove('popup_is-opened');
    }
  })

  document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape') {
      popup.classList.remove('popup_is-opened');
    }
  })
}

openPopupInput(profileEditButton, popupTypeEdit);
openPopupInput(profileAddButton, popupNewCard);
openPopupImg(cardImageArray)
closePopupInput(popupTypeEdit);
closePopupInput(popupNewCard);
closePopupInput(popupTypeImage);




const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileInfo = document.querySelector('.profile__info');




function clearFormValues() {
  nameInput.value = profileInfo.querySelector('.profile__title').textContent
  jobInput.value = profileInfo.querySelector('.profile__description').textContent
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileInfo.querySelector('.profile__title').textContent = nameInput.value;
  profileInfo.querySelector('.profile__description').textContent = jobInput.value;
}

function editingProfile() {
  formElement.addEventListener('submit', handleFormSubmit);
  popupTypeEdit.querySelector('.popup__close').addEventListener('click', clearFormValues);
}


const formElementCard = document.querySelector('.new-place');



function cardFormSubmit(evt) {
  evt.preventDefault();

  const nameInputCard = formElementCard.querySelector('.popup__input_type_card-name');
  const urlInputCard = formElementCard.querySelector('.popup__input_type_url');
  const cardData = {
    name: nameInputCard.value,
    link: urlInputCard.value,
  }
  const nameCard = nameInputCard.value;
  const urlCard = urlInputCard.value;
  console.log(nameCard, urlCard)
  
}

formElementCard.addEventListener('submit', cardFormSubmit);

// function addNewPlace(evt) {
//   const nameCardValue = newPlace.querySelector('.popup__input_type_card-name').value;
//   const typeUrlValue = newPlace.querySelector('.popup__input_type_url').value;
//   evt.preventDefault();
//   initialCards.push({ name: nameCardValue, link: typeUrlValue });
// }

editingProfile();

import '../pages/index.css'

