const popupTypeImage = document.querySelector('.popup_type_image'); 
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption'); 

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEscape)
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEscape);
}

function closeModalEscape(event) {
  if(event.key === 'Escape') {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {closeModal(popup)});
  }
}

export function closeModalClickOverlay(event) {
  if(event.target.classList.contains('popup_is-opened')) {
    closeModal(event.target);
  }
}

export function openModalImg(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openModal(popupTypeImage);
}




