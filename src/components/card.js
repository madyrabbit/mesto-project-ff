// Создание карточки
export function createCard(deleteLike, addLike, openModalImg, openDeleteModalCard, cardData, userId){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageImg = cardElement.querySelector('.card__image');
  const cardImageText = cardElement.querySelector('.card__title'); 
  const cardLikeVolume = cardElement.querySelector('.card__like-volume');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  const likeCardButton = cardElement.querySelector('.card__like-button');

  const cardId = cardData._id;

  cardImageImg.src = cardData.link;
  cardImageImg.alt = cardData.name;
  cardImageText.textContent = cardData.name;

  if (cardData.owner._id === userId) {
    deleteButton.addEventListener('click', () => openDeleteModalCard({cardId, cardElement}));
  } else {
    deleteButton.remove();
  }

  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) { 
    likeCardButton.classList.add('card__like-button_is-active') 
  } 
  cardLikeVolume.textContent = cardData.likes.length;

  likeCardButton.addEventListener('click', () => toggleLikeCard(deleteLike, addLike, cardData._id, likeCardButton, cardLikeVolume)); 

  cardImageImg.addEventListener('click', () => openModalImg(cardData));
  
  return cardElement
}

// Удаление карточки
export function removeCard(card) { 
  card.cardElement.remove(); 
} 

// Лайк карточки
export function toggleLikeCard(deleteLike, addLike, cardId, likeCardElement, cardLikeVolume) {
  const cardLike = likeCardElement.classList.contains('card__like-button_is-active');

  if (cardLike) {
    deleteLike(cardId).then((res) => {
      likeCardElement.classList.remove('card__like-button_is-active');
      cardLikeVolume.textContent = res.likes.length;
    })
    .catch((error) => console.error('Ошибка лайка:', error));
  } else {
    addLike(cardId).then((res) => {
      likeCardElement.classList.add('card__like-button_is-active');
      cardLikeVolume.textContent = res.likes.length;
    })
    .catch((error) => console.error('Ошибка лайка:', error));
  }
}