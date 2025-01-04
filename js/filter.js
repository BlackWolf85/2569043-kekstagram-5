
import {debounce, shuffle} from './util.js';
import {createPhoto, removePhoto} from './photos.js';
import {photos} from './main.js';
const imgFilterElement = document.querySelector('.img-filters__form');
let activeFilter = document.querySelector('img-filters__button--active');
const maxPhotoNum = 10;
const mainFilters = {
  'filter-default': () => photos.slice(),
  'filter-random': () => shuffle(photos.slice()).slice(0, maxPhotoNum),
  'filter-discussed': () => photos.slice().sort((first, second) => second.comments.length - first.comments.length),
};
const apply = (id) =>{
  removePhoto();
  createPhoto(mainFilters[id]());
};
const toogleBtn = (evt) => {
  activeFilter.classList.remove('img-filters__button--active');
  activeFilter = evt.target;
  activeFilter.classList.add('img-filters__button--active');
};
const filterClick = debounce((evt) => {
  evt.preventDefault();
  if(evt.target.type === 'button'){
    apply(evt.target.id);
    toogleBtn(evt);
  }
});
export const initFilters = () => {
  imgFilterElement.addEventListener('click', filterClick);
};
