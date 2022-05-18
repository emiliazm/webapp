import { getShows, like, getLikes } from './api_handler.js';

const shows = document.querySelector('.shows');
const pops = document.querySelector('.popups');

const popup = async (id) => {
  const testt = await getShows(id);

  const popCont = document.querySelector('#popCont');
  if (popCont) { pops.removeChild(popCont); }

  const node = `<div id="popCont" style="background-image: url('${testt.image.original}');">
    <i class="close-icon material-icons">close</i>
    <div class="container">
     <h2>${testt.name}</h2>
      <ul>
        <li>${testt.averageRuntime}min</li>
        <li>${testt.genres}</li>
        <li>${testt.language}</li>
        <li>${testt.premiered}</li>
      </ul>
      <p class="film-description">${testt.summary}</p>
    </div>
    <h3 class="comments-title">Comments</h3>
    <ul class="film-comments"></ul>
    <h3>Add a comment</h3>
    <form class="film-form">
      <ul>
        <li>
          <input type="text" placeholder="Your name" required>
        </li>
        <li>
          <textarea name="ta-comment" id="ta-comment" placeholder="Your insights"></textarea>
        </li>
        <li>
          <button type="submit">Comment</button>
        </li>
      </ul>
    </form>
  </div>`;
  const child = document.createRange().createContextualFragment(node);
  pops.appendChild(child);

  document.querySelector('.close-icon').onclick = () => {
    if (pops.classList.contains('display')) {
      pops.classList.remove('display');
    }
  };
};

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
  };

  shows.querySelector(`#li-${show.id} .like-btn`).onclick = (e) => {
    like(data);
    e.path[0].classList.toggle('liked');
  };
};

const render = async () => {
  const testt = await getShows(7);
  document.querySelector('.Headline').style.backgroundImage = `url('${testt.image.original}')`;

  const likes = await getLikes();
  for (let i = 1; i < 15; i += 1) {
    likes.forEach((item) => {
      if (i === item.item_id) {
        drawFilm(i, item.likes);
      }
    });
  }
};
render();
