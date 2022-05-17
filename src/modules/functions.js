import { getShows } from './api_handler.js';

const shows = document.querySelector('.shows');
const pops = document.querySelector('.popups');
const modal = document.querySelector('.modal')

const popup = async (id) => {
  const testt = await getShows(id);

  const popCont = document.querySelector('#popCont');
  if (popCont) { pops.removeChild(popCont); }

  const node = `<div id="popCont">
    <div class="pop-header">
      <img class="film-img" src=${testt.image.medium} alt="episode">
      <i class="close-icon material-symbols-outlined">close</i>
    </div>
    <h2 class="pop-h2">${testt.name}</h2>
    <ul class="film-features">
      <li>${testt.averageRuntime}</li>
      <li>${testt.genres}</li>
      <li>${testt.language}</li>
      <li>${testt.premiered}</li>
    </ul>
    <p class="film-description">${testt.summary}</p>
    <h3>Comments</h3>
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

  const closePopup = () => {
    if (pops.classList.contains('display')) {
      pops.classList.remove('display');
      modal.classList.remove('overlay');
    }
  };
  document.querySelector('.close-icon').addEventListener('click', closePopup);
};

const test = async (id) => {
  const testt = await getShows(id);
  // console.log(testt);
  const node = `<li class="show" id="li-${testt.id}">
    <img src=${testt.image.medium} alt="#">
    <h2>${testt.name}</h2>
    <i class=material-symbols-outlined>favorite</i>
    <button class="comment-btn" type="button">Comments</button>
    <button class="reserv-btn" type="button">Reservations</button>
  </li>`;
  const child = document.createRange().createContextualFragment(node);
  shows.appendChild(child);

  const commentBtn = (e) => {
    popup(id);
    pops.classList.toggle('display', (e !== 'popups'));
    modal.classList.toggle('overlay', (e !== 'modal'));
  };

  const commBtn = shows.querySelector(`#li-${testt.id} .comment-btn`);
  commBtn.addEventListener('click', commentBtn);
};

for (let i = 1; i < 15; i += 1) {
  test(i);
}

// Comments

const addComment = async (user, comment) => {
  const newComment = { user, comment };
  const response = await sendCommentApi(id, newComment);
  return response === 'Comment created correctly';
};

const getComments = async () => { getCommentsApi(id) };

const uiDisplayComment = async (ulElement, comment) => {
  const insideUl = `<li>${comment.user} : ${comment.comment}</li>`;
  ulElement.innerHTML += insideUl;
}

const uiDisplayComments = async () => {
  const ulElement = document.querySelector('.film-comments');
  ulElement.innerHTML = '';
  const list = await getComments();
  list.forEach((comment) => uiDisplayComment(ulElement, comment))
}

const uiAddComment = async (e) => {
  // e.preventDefault();
  let user = document.querySelector('.user-name').value;
  user = user.charAt().toUpperCase() + user.slice(1).toLowerCase();
  const comment = document.querySelector('.user-comment').value;
  const form = document.querySelector('.film-form');
  const focus = document.querySelector('.user-name');

  if (user !== null && score !== null && user.trim() !== '' && score.trim() !== '') {
    addComment(user, parseInt(comment, 10)).then(() => {
      uiDisplayComments();
    });
    form.reset();
  }
  focus.focus();
}

const submitBtn = async () => {
  document.querySelector('.submit-btn').addEventListener('click', uiAddComment);
}

console.log(submitBtn);