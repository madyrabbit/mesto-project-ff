export function createCard(cardData, openModalImg){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageImg = cardElement.querySelector('.card__image');
  const cardImageText = cardElement.querySelector('.card__title'); 

  cardImageImg.src = cardData.link;
  cardImageImg.alt = cardData.name;
  cardImageText.textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => removeCard(cardElement)); 

  const likeCardButton = cardElement.querySelector('.card__like-button');
  likeCardButton.addEventListener('click', () => toggleLikeCard(likeCardButton)); 

  cardImageImg.addEventListener('click', () => openModalImg(cardData));

  return cardElement
}

function removeCard(card) {
  card.remove();
}

function toggleLikeCard(likeCardElement) {
  likeCardElement.classList.toggle('card__like-button_is-active')
}
