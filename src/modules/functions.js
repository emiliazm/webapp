import {
  getShows,
  like,
  getLikes,
  sendCommentApi,
  getCommentsApi,
} from './api_handler.js';

const shows = document.querySelector('.shows');
const pops = document.querySelector('.popups');
const modal = document.querySelector('.modal');

const popup = async (id) => {
  const testt = await getShows(id);

  // Comments

  const appId = '2lNkwmsdhFTsRqAGHt5J';
  const addComment = async (itemId, username, comment) => {
    const newComment = { item_id: itemId, username, comment };
    const response = await sendCommentApi(appId, newComment);
    return response === 'Comment created correctly';
  };

  const uiDisplayComment = async (ulElement, comment) => {
    const insideUl = `<li>${comment.creation_date} ${comment.username} : ${comment.comment}</li>`;
    ulElement.innerHTML += insideUl;
  };

  const uiDisplayComments = async (appId, itemId) => {
    const ulElement = document.querySelector('.film-comments');
    ulElement.innerHTML = '';
    const list = await getCommentsApi(appId, itemId);
    list.forEach((comment) => uiDisplayComment(ulElement, comment));
  };

  const uiAddComment = async (e) => {
    e.preventDefault();
    const commentBtn = e.target;
    const liElement = commentBtn.parentNode.parentNode;
    const itemId = liElement.dataset.id;
    let username = document.querySelector('.user-name').value;
    username = username.charAt().toUpperCase() + username.slice(1).toLowerCase();
    const comment = document.querySelector('.user-comment').value;
    const form = document.querySelector('.film-form');
    const focus = document.querySelector('.user-name');

    if (username !== null && comment !== null && username.trim() !== '' && comment.trim() !== '') {
      addComment(itemId, username, comment).then(() => {
        uiDisplayComments(appId, itemId);
      });
      form.reset();
    }
    focus.focus();
  };

  const popCont = document.querySelector('#popCont');
  if (popCont) { pops.removeChild(popCont); }

  const node = `<div id="popCont" data-id="${testt.id}" style="background-image: url('${testt.image.original}');">
    <i class="close-icon material-symbols-outlined">close</i>
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
      <input class="user-name" type="text" placeholder="Your name" required>
      <textarea class="user-comment" name="ta-comment" id="ta-comment" placeholder="Your insights" required></textarea>
      <button class="submit-btn" type="button">Comment</button>
    </form>
  </div>`;
  const child = document.createRange().createContextualFragment(node);
  pops.appendChild(child);

  document.querySelector('.close-icon').onclick = () => {
    if (pops.classList.contains('display')) {
      pops.classList.remove('display');
      modal.classList.remove('overlay');
    }
  };
  document.querySelector('.submit-btn').addEventListener('click', uiAddComment);
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
    modal.classList.toggle('overlay', (e !== 'modal'));
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
