import '../pages/index.css'
import {initialCards} from '../components/cards.js';
import {createCard} from '../components/card.js';
import {openModal, closeModal, openModalImg, closeModalClickOverlay} from '../components/modal.js';

const editProfileForm = document.forms['edit-profile'];
const placesList = document.querySelector('.places__list');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardUrl = document.querySelector('.popup__input_type_url');
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const defaultNameInput = document.querySelector('.profile__title');
const defaultJobInput = document.querySelector('.profile__description');

function renderCards(cards) {
  cards.forEach(cardData => {
    const card = createCard(cardData, openModalImg);
    placesList.prepend(card);
  });
}

function renderNewPlaceCard() { 
  const newPlaceForms = document.forms['new-place']; 
  newPlaceForms.addEventListener('submit', createNewPlaceCard); 
}

function createNewPlaceCard(evt) {
  evt.preventDefault();

  const cardData = {
    name: cardName.value,
    link: cardUrl.value,
  }

  addNewPlaceCard(cardData);

  cardName.value = '';
  cardUrl.value = '';
  closeModal(popupNewCard)
}

function addNewPlaceCard(cardData) {
  const card = createCard(cardData, openModalImg);
  placesList.prepend(card);
}

function closeModalForms(popup) {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    const closeButtonq = popup.querySelector('.popup__close')
    closeButtonq.addEventListener('click', () => closeModal(popup));
    popup.addEventListener('click', closeModalClickOverlay);
  });
}

function fillInProfileFormInputs() {
  nameInput.value = defaultNameInput.textContent;
  jobInput.value = defaultJobInput.textContent;
}

function submitEditProfileForm(evt) {
  evt.preventDefault();

  const valueFieldsNameInput = nameInput.value;
  const valueFieldsJobInput = jobInput.value;
  
  const fieldElementName = defaultNameInput;
  const fieldElementJobInput = defaultJobInput;

  fieldElementName.textContent = valueFieldsNameInput;
  fieldElementJobInput.textContent = valueFieldsJobInput;

  closeModal(popupTypeEdit);
}

profileAddButton.addEventListener('click', () => openModal(popupNewCard));
profileEditButton.addEventListener('click', () => openModal(popupTypeEdit));
editProfileForm.addEventListener('submit', submitEditProfileForm);

renderCards(initialCards);
renderNewPlaceCard();
closeModalForms(popupNewCard);
closeModalForms(popupTypeEdit);
fillInProfileFormInputs();