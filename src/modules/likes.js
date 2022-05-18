import { getShows, like } from './api_handler.js';
import popup from './comments.js';

const shows = document.querySelector('.shows');
const pops = document.querySelector('.popups');
const modal = document.querySelector('.modal');

const drawFilm = async (id, likes) => {
  const show = await getShows(id);
  const data = {
    item_id: id,
  };
  const node = `
  <li class="show" id="li-${show.id}">
    <img src="${show.image.medium}" alt="#">
    <h2>${show.name}</h2>
    <i class="material-icons like-btn">favorite</i>
    <span>${likes}</span>
      <button class="comment-btn" type="button">Comments</button>
      <button class="reserv-btn" type="button">Reservations</button>
    </li>`;
  const child = document.createRange().createContextualFragment(node);
  shows.appendChild(child);

  shows.querySelector(`#li-${show.id} .comment-btn`).onclick = (e) => {
    popup(id);
    pops.classList.toggle('display', (e !== 'popups'));
    modal.classList.toggle('overlay', (e !== 'modal'));
  };

  shows.querySelector(`#li-${show.id} .like-btn`).onclick = (e) => {
    e.composedPath()[0].classList.toggle('liked');
    if (e.composedPath()[0].classList.contains('liked')) {
      like(data);
      e.composedPath()[1].querySelector('span').innerHTML = parseInt(e.composedPath()[1].querySelector('span').innerHTML, 10) + 1;
    }
  };
};

export default drawFilm;
