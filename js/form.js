import { isKeyEsc } from './util.js';
import { pristine } from './pristine.js';
import { reset } from './effects.js';
import { sendData } from './api.js';
import { formSuccess, formFail } from './submit_form.js';
const files = ['gif', 'jpg', 'jpeg', 'png'];
const loadForm = document.querySelector('.img-upload__form');
const loadOverlay = document.querySelector('.img-upload__overlay');
const loadFile = document.querySelector('#upload-file');
const imgPrew = document.querySelector('.img-upload__preview img');
const mainImg = document.querySelector('.img-upload__preview img');
const effects = document.querySelectorAll('.effects__preview');
const closeBtn = document.querySelector('#upload-cancel');
const bigBtn = document.querySelector('.scale__control--bigger');
const smallBtn = document.querySelector('.scale__control--smaller');
const scaleControl = document.querySelector('.scale__control--value');

const Zoom = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
};
function zoomChanging(element = 1) {
  let size = parseInt(scaleControl.value, 10) + (Zoom.STEP * element);
  if (size < Zoom.MIN) {
    size = Zoom.MIN;
    return;
  }
  if (size > Zoom.MAX) {
    size = Zoom.MAX;
    return;
  }
  scaleControl.value = `${size}%`;
  imgPrew.style.transform = `scale(${size / 100})`;
}
function smallBtnClick() {
  zoomChanging(-1);
}
function bigBtnClick() {
  zoomChanging(1);
}
function Buttons() {
  smallBtn.addEventListener('click', smallBtnClick);
  bigBtn.addEventListener('click', bigBtnClick);
}
function formSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(formSuccess, formFail, 'POST', formData);
}
export const openForm = () => {
  closeBtn.addEventListener('click', closeFormBtn);
  document.addEventListener('keydown', escFormClose);
  loadFile.addEventListener('change', loadFormChange);
  scaleControl.value = '100%';
  loadForm.addEventListener('submit', formSubmit);
};
export const closeForm = () => {
  loadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  removeEvents();
  loadForm.reset();
  pristine.reset();
  scaleControl.value = '100%';
  imgPrew.style.transform = 'scale(100%)';
  reset();
};
function closeFormBtn(evt) {
  evt.preventDefault();
  closeForm();
}
function escFormClose(evt) {
  if (isKeyEsc(evt) &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description') &&
    !document.querySelector('body').querySelector('.error')) {
    evt.preventDefault();
    closeForm();
  }
}
function removeEvents() {
  closeBtn.removeEventListener('click', closeFormBtn);
  document.removeEventListener('keydown', escFormClose);
  loadForm.removeEventListener('submit', formSubmit);
  smallBtn.removeEventListener('click', smallBtnClick);
  bigBtn.removeEventListener('click', bigBtnClick);
}
function applyFilters() {
  const file = loadFile.files[0];
  const fileName = file.name.toLowerCase();
  if (files.some((it) => fileName.endsWith(it))) {
    mainImg.src = URL.createObjectURL(file);
    effects.forEach((effect) => {
      effect.style.backgroundImage = `url('${mainImg.src}')`;
    });
  }
}
function loadFormChange() {
  document.querySelector('body').classList.add('modal-open');
  loadOverlay.classList.remove('hidden');
  openForm();
  applyFilters();
  Buttons();
}
