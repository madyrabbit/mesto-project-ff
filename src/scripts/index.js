import '../pages/index.css'
import { createCard } from '../components/card.js';
import { openModal, closeModal, closeModalClickOverlay } from '../components/modal.js';
import { enableValidation } from '../components/validation.js';
import { getUserInfo, getCardList, sendNewCardServer, sendUserProfile, deleteCard } from '../components/api.js';

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

let userId = null;
let cardIds = null;
let onLike = null;

Promise.all([getCardList(), getUserInfo()])
  .then(([cards, userData]) => {
    userId = userData._id;
    cards.reverse().forEach((data) => {
      cardIds = data.owner._id;
      onLike = data.likes;
      const cardElement = createCard(
        openModalImg, 
        data, 
        onLike, 
        cardIds, 
        userId
        );
      placesList.prepend(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Кнопка созраниние новой карточки
function setAddCardFormSubmitListener() {
  newPlaceForms.addEventListener('submit', createNewPlaceCard);
}

// Создание новой карточки
function createNewPlaceCard(evt) {
  evt.preventDefault();

  const cardData = {
    name: cardName.value,
    link: cardUrl.value,
  }
  
  onLike = '';

  addNewPlaceCard(cardData, onLike);
  sendNewCardServer(cardData);

  cardName.value = '';
  cardUrl.value = '';

  closeModal(popupNewCard)
}

// Добавление карточки в список
function addNewPlaceCard(cardData) {
  const cardElement = createCard(
    openModalImg, 
    cardData, 
    onLike, 
    cardIds, 
    userId
    );
  placesList.prepend(cardElement);
}

// Открытие модального окна с карточкой
function openModalImg(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openModal(popupTypeImage);
}

// Закрытие popup по клику на рестик
function setEventListenersForClosingPopups() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    const buttonClosePopup = popup.querySelector('.popup__close')
    buttonClosePopup.addEventListener('click', () => closeModal(popup));
    popup.addEventListener('click', closeModalClickOverlay);
  });
}


// Отправить форму редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();

  const valueFieldsNameInput = nameInput.value;
  const valueFieldsJobInput = jobInput.value;

  defaultNameInput.textContent = valueFieldsNameInput;
  defaultJobInput.textContent = valueFieldsJobInput;

  sendUserProfile(valueFieldsNameInput, valueFieldsJobInput)
  closeModal(popupTypeEdit);
}

profileAddButton.addEventListener('click', () => {
  openModal(popupNewCard);
  enableValidation();
});

profileEditButton.addEventListener('click', () => {
  openModal(popupTypeEdit);
  enableValidation();
});

editProfileForm.addEventListener('submit', submitEditProfileForm);

setAddCardFormSubmitListener();
setEventListenersForClosingPopups();

// Заполнение формы профиля
function fillInProfileFormInputs(NameInput, JobInput) {
  nameInput.value = NameInput;
  jobInput.value = JobInput;
}
fillInProfileFormInputs();

Promise.all([getUserInfo()])
.then(([userData]) => {
  const userName = defaultNameInput.textContent = userData.name;
  const userAbout = defaultJobInput.textContent = userData.about;
  profileImage.style.backgroundImage = ('url(' + userData.avatar + ')');
  fillInProfileFormInputs(userName, userAbout);
});

const popupDel = document.querySelector('.popup_delete');
const popupDeleteButton = popupDel.querySelector('.popup__button');

export function openDeleteModalCard(cardId) {
  openModal(popupDel);
  popupDeleteButton.addEventListener("click", () => {
    confirmDeleteCard(cardId);
  });
};

function confirmDeleteCard(cardId) {
  deleteMyCard(cardId);
  closeModal(popupDel);
};

function deleteMyCard(cardId) {
  console.log(document.getElementById(cardId));
  console.log(cardId);
  deleteCard(cardId);
  document.getElementById(cardId).remove()
};























// Кнопка созраниние новой карточки
// function setAddCardFormSubmitListener() {
//   newPlaceForms.addEventListener('submit', createNewPlaceCard);
// }


// const d ='popup__button';
// Кнопка созраниние новой карточки
// const popupDel = document.querySelector('.popup_delete');
// const popupDeleteButton = popupDel.querySelector('.popup__button');
// function delCard() {
//   popupDeleteButton.addEventListener('click', cc);
// }
// delCard();
// // Появление дефолтной карточки на страници
// function renderCards(cards) {
//   cards.forEach(cardData => {
//     const card = createCard(cardData, openModalImg);
//     placesList.prepend(card);
//   });
// }popup_delete



// // Заполнение профиля пользователя
// function fillProfile() {
//   fetch('https://nomoreparties.co/v1/wff-cohort-11/users/me', {
//     headers: {
//       authorization: '931f9416-6641-4dfc-be73-22f2347fb5c6'
//     }
//   })
//     .then(res => res.json())
//     .then(data => {
//       defaultNameInput.textContent = data.name;
//       defaultJobInput.textContent = data.about;
//       fillInProfileFormInputs(data.name, data.about)
//       profileImage.style.backgroundImage = ('url(' + data.avatar + ')');
//       userId = data._id;
//       getCardsIdServer(data._id)
//     })
// }
// fillProfile();



// getCardsIdServer(userId).then(data => {
//   data.reverse().forEach(data => {
//     cardId = data.owner._id
//     card = createCard(data, openModalImg, userId, cardId);
//     placesList.prepend(card);
//   });
// })






// function loadCards(cardData) {
//   return new Promise((resolve, reject) => {
//     resolve ('cardData');
//   })
// }

// const getCardsIdServer = () => {
//   fetch('https://nomoreparties.co/v1/wff-cohort-11/cards', {
//     headers: {
//       authorization: '931f9416-6641-4dfc-be73-22f2347fb5c6'
//     }
//   })
//   .then(res => res.json())
//   .then(data => {
//     const cardsId = [];

//     data.forEach(data => {
//       cardsId.push(data.likes);
//       console.log(data.likes);
//     });
//     loadCards(cardsId)
//   })
// }

// const promises = [getCardsIdServer];

// Promise.all(promises)
//   .then(results => {
//     console.log(results)
//   });












// const getCardsIdServer = new Promise((resolve, reject) => {
//   fetch('https://nomoreparties.co/v1/wff-cohort-11/cards', {
//     headers: {
//       authorization: '931f9416-6641-4dfc-be73-22f2347fb5c6'
//     }
//   })
//   .then(res => res.json())
//   .then(data => {
//     const cardsId = [];

//     data.forEach(data => {
//       cardsId.push(data._id);
//     });
//   })
//   .catch(() => console.error('что-то пошло не так'));
// })

// const getCardsLikeServer = new Promise((resolve, reject) => {
//   fetch('https://nomoreparties.co/v1/wff-cohort-11/cards', {
//     headers: {
//       authorization: '931f9416-6641-4dfc-be73-22f2347fb5c6'
//     }
//   })
//   .then(res => res.json())
//   .then(data => {
//     const cardsLikes = [];

//     data.forEach(data => {
//       cardsLikes.push(data.likes);
//     });
//   })
//   .catch(() => console.error('что-то пошло не так'));
// })

// const promises = [getCardsIdServer, getCardsLikeServer];

// Promise.all(promises)
//   .then(results => {
//     console.log(results)
//   });

// // Получить карточки с серера
// const getCardsServer = new Promise((resolve, reject) => {
//     fetch('https://nomoreparties.co/v1/wff-cohort-11/cards', {
//       headers: {
//         authorization: '931f9416-6641-4dfc-be73-22f2347fb5c6'
//       }
//     })
//     .then(res => res.json())
//     .then(data => {
//       renderCards(data.reverse());
//       // console.log(data);
//     })
//     .catch(() => console.error('что-то пошло не так'));
//   })

// // Отправить новую карточку на сервер
// function sendNewCardServer(cardData) {
//   fetch('https://nomoreparties.co/v1/wff-cohort-11/cards', {
//     method: 'POST',
//     headers: {
//       authorization: '931f9416-6641-4dfc-be73-22f2347fb5c6',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: cardData.name,
//       link: cardData.link,
//     })
//   }); 
// };
