
import {
  getRandomInteger,
  createRandomId
} from './util.js';
const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const names = [
  'Артём',
  'Ирина',
  'Дмитрий',
  'Екатерина',
  'Алексей',
  'Мария',
  'Иван'
];
const descr = [
  'Утренний кофе с видом на город.',
  'Портрет любимого питомца.',
  'Культурное событие в центре города.',
  'Летнее утро в цветущем саду.',
  'Архитектурные детали красивого здания.',
  'Кадр уличного искусства в старом районе.'
];
export const createComments = () => ({
  id: createRandomId(1, 750),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.jpg`,
  message: comments[getRandomInteger(0, comments.length - 1)],
  name: names[getRandomInteger(0, names.length - 1)],
});
function createPhoto () {
  const comm = [];
  for (let i = 0; i <= getRandomInteger(0, 30); i++) {
    comm.push(createComments());
  }
  return {
    id: createRandomId(1, 25),
    url: `photos/${getRandomInteger(1, 25)}.jpg`,
    description: descr[getRandomInteger(0, descr.length - 1)],
    likes: createRandomId(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComments)
  };
}
export function createArrayOfPhotos () {
  const photoArray = [];
  for (let i = 0; i <= 25; i++) {
    photoArray.push(createPhoto());
  }
}
