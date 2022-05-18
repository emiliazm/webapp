import {
  getShows,
  sendCommentApi,
  getCommentsApi,
} from './api_handler.js';

const pops = () => document.querySelector('.popups');
const modal = () => document.querySelector('.modal');

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

const popup = async (id) => {
  const show = await getShows(id);

  const popCont = document.querySelector('#popCont');
  if (popCont) { pops().removeChild(popCont); }

  const node = `<div id="popCont" data-id="${show.id}" style="background-image: url('${show.image.original}');">  
  <i class="close-icon material-symbols-outlined">close</i>
    <div class="container">
      <h2>${show.name}</h2>
       <ul>
         <li>${show.averageRuntime}min</li>
         <li>${show.genres}</li>
         <li>${show.language}</li>
         <li>${show.premiered}</li>
       </ul>
       <p class="film-description">${show.summary}</p>
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
  pops().appendChild(child);

  document.querySelector('.close-icon').onclick = () => {
    if (pops().classList.contains('display')) {
      pops().classList.remove('display');
      modal().classList.remove('overlay');
    }
  };
  document.querySelector('.submit-btn').addEventListener('click', uiAddComment);

  const ulElement = document.querySelector('.film-comments');
  if (ulElement !== '') {
    const divElement = ulElement.parentNode;
    const itemId = divElement.dataset.id;
    uiDisplayComments(ulElement, itemId);
  }
};

export default popup;
