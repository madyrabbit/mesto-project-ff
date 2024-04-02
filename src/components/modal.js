export function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

export function closeModal(popup) {
  const closePopupButton = popup.querySelector('.popup__close');
  closePopupButton.addEventListener('click', () => {
    popup.classList.remove('popup_is-opened');
  })

  document.addEventListener('click', (event) => {
    const popups = document.querySelectorAll('.popup')
    if (Array.from(popups).includes(event.target)) {
      popup.classList.remove('popup_is-opened');
    }
  })

  document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape') {
      popup.classList.remove('popup_is-opened');
    }
  })
}

export function openModalImg(cardData) {
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption'); 

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openModal(popupTypeImage);
  closeModal(popupTypeImage)
}




