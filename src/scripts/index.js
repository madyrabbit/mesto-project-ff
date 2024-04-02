import {initialCards} from '../components/cards.js';
import {renderCards, renderNewPlaceCard, closeNewPlaceForms} from '../components/card.js';
import {openModal, closeModal} from '../components/modal.js';

renderCards(initialCards);
renderNewPlaceCard();


function targetModel(popup, eventButton) {
  eventButton.addEventListener('click', () => {
    openModal(popup);
    closeModal(popup);
  });
}

const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
targetModel(popupNewCard, profileAddButton);

const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
targetModel(popupTypeEdit, profileEditButton);




const editProfileForm = document.forms['edit-profile'];
const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');


function defaultProfileForm() {
  const defaultNameInput = document.querySelector('.profile__title');
  const defaultJobInput = document.querySelector('.profile__description');

  nameInput.placeholder = defaultNameInput.textContent;
  jobInput.placeholder = defaultJobInput.textContent;
}
defaultProfileForm();

function clearFormValues() {
  nameInput.value = document.querySelector('.profile__title').textContent
  jobInput.value = document.querySelector('.profile__description').textContent
}

function recordProfileForm(evt) {
  evt.preventDefault();

  const valueFieldsNameInput = nameInput.value;
  const valueFieldsJobInput = jobInput.value;
  
  const fieldElementName = document.querySelector('.profile__title');
  const fieldElementJobInput = document.querySelector('.profile__description');

  fieldElementName.textContent = valueFieldsNameInput;
  fieldElementJobInput.textContent = valueFieldsJobInput;

  closeNewPlaceForms();
}

editProfileForm.addEventListener('submit', recordProfileForm);
popupTypeEdit.querySelector('.popup__close').addEventListener('click', clearFormValues);





import '../pages/index.css'