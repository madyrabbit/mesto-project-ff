import '../pages/index.css'
import { createCard, removeCard } from '../components/card.js';
import { openModal, closeModal, closeModalClickOverlay } from '../components/modal.js';
import { enableValidation, disableValidation } from '../components/validation.js';
import { getUserInfo, getCardList, sendNewCardServer, sendUserProfile, deleteCard, changeAvatar, addLike, deleteLike } from '../components/api.js';

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
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

const profileImage = document.querySelector('.profile__image');
const defaultNameInput = document.querySelector('.profile__title');
const defaultJobInput = document.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];
const newPlaceForms = document.forms['new-place'];
const newuserAvatarForms = document.forms['user-avatar'];
const popupWindowButtonEdit = newuserAvatarForms.querySelector('.popup__button');


const newPlaceFormsButtonEdit = newPlaceForms.querySelector('.popup__button');

const popupDel = document.querySelector('.popup_delete');
const popupDelButtonEdit = popupDel.querySelector('.popup__button');

const popupTypeUpdateYourAvatar = document.querySelector('.popup_type_update_user_avatar');
const buttonSavinguserAvatar = popupTypeUpdateYourAvatar.querySelector('.popup__button');
const userAvatar = popupTypeUpdateYourAvatar.querySelector('.popup__update_user_avatar');

let userId = null;

const parametersValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-active'
}; 

Promise.all([getCardList(), getUserInfo()])
  .then(([cards, userData]) => {
    userId = userData._id;
    defaultNameInput.textContent = userData.name;
    defaultJobInput.textContent = userData.about;
    profileImage.style.backgroundImage = ('url(' + userData.avatar + ')');
    cards.reverse().forEach((data) => {
      const cardElement = createCard(
        deleteLike, 
        addLike,
        openModalImg,
        openDeleteModalCard, 
        data,
        userId
      );
      placesList.prepend(cardElement);
    });
  })
  .catch((err) => console.log(err));

// Открытие модального окна с редоктированием профиля
const openEditProfile = () => {
  nameInput.value = defaultNameInput.textContent;
  jobInput.value = defaultJobInput.textContent;
  openModal(popupTypeEdit);
  disableValidation(formElement ,parametersValidation);
};

// Создание новой карточки
function createNewPlaceCard(evt) {
  evt.preventDefault();
  disableValidation(newPlaceForms, parametersValidation);

  const nameCard = cardName.value;
  const linkCard = cardUrl.value;

  loadingDataSaving(newPlaceFormsButtonEdit, true);

  sendNewCardServer(nameCard, linkCard).then((card) => {
    const newCardElement = createCard(
      deleteLike, 
      addLike,
      openModalImg,
      openDeleteModalCard, 
      card,
      userId
    )
    placesList.prepend(newCardElement);

    closeModal(popupNewCard);
    disableValidation(formElement ,parametersValidation);
  })
    .catch((error) => {
      console.log('Возникла ошибка при отправке данных новой карточки на сервер', error);
    })
    .finally(() => loadingDataSaving(newPlaceFormsButtonEdit, false));
}

// Открытие модального окна с редоктированием профиля
const creatingNewCardModal = () => {
  cardName.value = '';
  cardUrl.value = '';
  openModal(popupNewCard);
  disableValidation(newPlaceForms ,parametersValidation);
};

// Открытие модального окна с карточкой
function openModalImg(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openModal(popupTypeImage);
}

// Закрытие popup по клику на крестик
function setEventListenersForClosingPopups() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    const buttonClosePopup = popup.querySelector('.popup__close')
    buttonClosePopup.addEventListener('click', () => closeModal(popup));
    popup.addEventListener('click', closeModalClickOverlay);
  });
}

// Редактирование информации профеля и закрытие модального окна
function submitEditProfileForm(evt) {
  evt.preventDefault();

  const valueFieldsNameInput = nameInput.value;
  const valueFieldsJobInput = jobInput.value;

  loadingDataSaving(popupWindowButtonEdit, true);

  sendUserProfile(valueFieldsNameInput, valueFieldsJobInput).then((res) => {
    defaultNameInput.textContent = res.name;
    defaultJobInput.textContent = res.about;

    closeModal(popupTypeEdit);
    disableValidation(editProfileForm, parametersValidation);
    
  })
    .catch((error) => console.log(error)) 
    .finally(() => loadingDataSaving(popupWindowButtonEdit, false))
}

// Обновления фота профиля
function updateAvatar(evt) {
  const linkAvatar = userAvatar.value;
  evt.preventDefault();

  loadingDataSaving(buttonSavinguserAvatar, true);

  changeAvatar(linkAvatar).then((res) => {
      profileImage.style.backgroundImage = ('url(' + res.avatar + ')');
      userAvatar.value = '';
      closeModal(popupTypeUpdateYourAvatar);
    })
    .catch((error) => console.log(error))
    .finally(() => loadingDataSaving(buttonSavinguserAvatar, false))
};

const openEditAvatat = () => {
  userAvatar.value = '';
  openModal(popupTypeUpdateYourAvatar);
  disableValidation(newuserAvatarForms ,parametersValidation);
}

// Карточка которую хотим удалить
let card = {};

// Открытие модального окна с карточкой
export function openDeleteModalCard({ cardId, cardElement }) {
  card.cardId = cardId;
  card.cardElement = cardElement;
  openModal(popupDel);
};

// Удаление карточки
function confirmDeleteCard() {
  deleteCard(card.cardId).then(() => {
    removeCard(card);
    closeModal(popupDel);
    card = {};
  });
};

// Изменения текста кнопки сохранения профиля
const loadingDataSaving = (button, loading) => {
  if (loading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
};

// Кнопеп созданиия новой карточки
profileAddButton.addEventListener('click', creatingNewCardModal);

// Кнопка редактирования профиля
profileEditButton.addEventListener('click', openEditProfile);

// Кнопка созраниние новой карточки
newPlaceForms.addEventListener('submit', createNewPlaceCard);

// Открытие модального окна сохранения профиля
editProfileForm.addEventListener('submit', submitEditProfileForm);

// Открытие модального окна с изменением картинки профиля
profileImage.addEventListener('click', openEditAvatat);

// Закрытие модального окна с изменением картинки профиля
buttonSavinguserAvatar.addEventListener('click', updateAvatar);

// Установка слушателя на кнопку удаление карточки
popupDelButtonEdit.addEventListener('click', () => confirmDeleteCard());

setEventListenersForClosingPopups();

enableValidation(parametersValidation);

