export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEscape);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEscape);
}

function closeModalEscape(event) {
  if(event.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup)
  }
}

export function closeModalClickOverlay(event) {
  if(event.target.classList.contains('popup_is-opened')) {
    closeModal(event.target);
  }
}