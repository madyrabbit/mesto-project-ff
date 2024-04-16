import { openDeleteModalCard } from '../scripts/index.js';

export function createCard(openModalImg, cardData, onLike, cardIds, userId){
  // console.log(cardData._id);
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageImg = cardElement.querySelector('.card__image');
  const cardImageText = cardElement.querySelector('.card__title'); 
  const cardLikeVolume = cardElement.querySelector('.card__like-volume');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  let cardId = cardData._id;

  cardElement.id = cardData._id;
  cardImageImg.src = cardData.link;
  cardImageImg.alt = cardData.name;
  cardImageText.textContent = cardData.name;
  cardLikeVolume.textContent = onLike.length;

  if (cardIds === userId) {
    deleteButton.addEventListener('click', () => openDeleteModalCard(cardId));
  } else {
    deleteButton.remove();
  }

  const likeCardButton = cardElement.querySelector('.card__like-button');
  likeCardButton.addEventListener('click', () => toggleLikeCard(likeCardButton)); 

  cardImageImg.addEventListener('click', () => openModalImg(cardData));
  
  return cardElement
}

function toggleLikeCard(likeCardElement) {
  likeCardElement.classList.toggle('card__like-button_is-active')
}