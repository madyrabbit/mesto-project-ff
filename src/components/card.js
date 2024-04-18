import { openDeleteModalCard, toggleLikeCard } from '../scripts/index.js';

export function createCard(openModalImg, cardData, cardIds, userId){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageImg = cardElement.querySelector('.card__image');
  const cardImageText = cardElement.querySelector('.card__title'); 
  const cardLikeVolume = cardElement.querySelector('.card__like-volume');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  const likeCardButton = cardElement.querySelector('.card__like-button');

  const cardId = cardData._id;

  cardElement.id = cardData._id;
  cardImageImg.src = cardData.link;
  cardImageImg.alt = cardData.name;
  cardImageText.textContent = cardData.name;

  if (cardIds === userId) {
    deleteButton.addEventListener('click', () => openDeleteModalCard({cardId, cardElement}));
  } else {
    deleteButton.remove();
  }

  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) { 
    likeCardButton.classList.add('card__like-button_is-active') 
  } 
  cardLikeVolume.textContent = cardData.likes.length;

  likeCardButton.addEventListener('click', () => toggleLikeCard(cardId, likeCardButton, cardLikeVolume)); 

  cardImageImg.addEventListener('click', () => openModalImg(cardData));
  
  return cardElement
}