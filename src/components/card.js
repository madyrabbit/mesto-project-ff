import {openModalImg} from '../components/modal.js';

export function renderCards(array) {
  const placesList = document.querySelector('.places__list');
  array.forEach(cardData => {
    const card = createCard(cardData);
    placesList.prepend(card);
  });
}

export function renderNewPlaceCard() {
  const newPlaceForms = document.forms['new-place'];
  newPlaceForms.addEventListener('submit', createNewPlaceCard);
}

function createCard(cardData){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  const cardImageImg = cardElement.querySelector('.card__image');
  const cardImageText = cardElement.querySelector('.card__title'); 

  cardImageImg.src = cardData.link;
  cardImageImg.alt = cardData.name;
  cardImageText.textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => cardElement.remove()); 

  const likeCardButton = cardElement.querySelector('.card__like-button');
  likeCardButton.addEventListener('click', () => toggleLikeCard(likeCardButton)); 

  cardImageImg.addEventListener('click', () => openModalImg(cardData));

  return cardElement
}

function toggleLikeCard(likeCardElement) {
  likeCardElement.classList.toggle('card__like-button_is-active')
}

function createNewPlaceCard(evt) {
  evt.preventDefault();

  const cardName = document.querySelector('.popup__input_type_card-name');
  const cardUrl = document.querySelector('.popup__input_type_url');

  const cardData = {
    name: cardName.value,
    link: cardUrl.value,
  }

  addNewPlaceCard(cardData);

  cardName.value = '';
  cardUrl.value = '';
  closeNewPlaceForms();
}


function addNewPlaceCard(cardData) {
  const card = createCard(cardData);
  document.querySelector('.places__list').prepend(card);
}

export function closeNewPlaceForms() {
  const popups = document.querySelectorAll('.popup')
  popups.forEach(popup => popup.classList.remove('popup_is-opened'));
}
