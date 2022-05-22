import { like } from './api_handler.js';
import popup from './comments.js';

const pops = document.querySelector('.popups');
const modal = document.querySelector('.modal');

const drawFilm = async (film, likes, nodee) => {
  console.log('ss');

  const node = `
  <li class="film" id="li-${film.id}">
    <a href="${film.url}"><img src="${film.image.medium}" class="img" alt="#"></a>
    <p>${film.name}</p>
    <div class="film-nav">
      <i class="material-icons comment-btn">comment</i>
      <div class="like-wrapper">
        <i class="material-icons like-btn">favorite</i>
        <span>${likes}</span>
      </div>
    </div>
  </li>`;
  const child = document.createRange().createContextualFragment(node);
  nodee.appendChild(child);

  nodee.querySelector(`#li-${film.id} .comment-btn`).onclick = (e) => {
    popup(film);
    pops.classList.toggle('display', (e !== 'popups'));
    modal.classList.toggle('overlay', (e !== 'modal'));
  };

  nodee.querySelector(`#li-${film.id} .like-btn`).onclick = (e) => {
    e.composedPath()[0].classList.toggle('liked');
    if (e.composedPath()[0].classList.contains('liked')) {
      like({ item_id: film.id });
      e.composedPath()[1].querySelector('span').innerHTML = parseInt(e.composedPath()[1].querySelector('span').innerHTML, 10) + 1;
    }
  };
};

export default drawFilm;
