import {
  getShows,
  sendCommentApi,
  getCommentsApi,
} from './api_handler.js';
import { counterComm } from './tools.js';

const pops = () => document.querySelector('.popups');
const modal = () => document.querySelector('.modal');

const appId = '2lNkwmsdhFTsRqAGHt5J';
const addComment = async (itemId, username, comment) => {
  const newComment = { item_id: itemId, username, comment };
  const response = await sendCommentApi(appId, newComment);
  return response === 'Comment created correctly';
};

const commentCounter = async () => {
  const commentList = document.querySelector('.film-comments');
  const count = commentList.children.length;
  return count;
};

const uiDisplayComment = async (ulElement, comment) => {
  const insideUl = `<li>${comment.creation_date} &nbsp ${comment.username} : ${comment.comment}</li>`;
  ulElement.innerHTML += insideUl;
};

const uiDisplayComments = async (appId, itemId) => {
  const ulElement = document.querySelector('.film-comments');
  ulElement.innerHTML = '';
  const list = await getCommentsApi(appId, itemId);
  list.forEach((comment) => uiDisplayComment(ulElement, comment));
  const count = await commentCounter();
  counterComm(count);
};

const uiLoadComments = async () => {
  const ulElement = document.querySelector('.film-comments');
  const divElement = ulElement.parentNode;
  const itemId = divElement.dataset.id;
  if (ulElement !== '') {
    await uiDisplayComments(ulElement, itemId);
  }
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

// <img class="film-img" src="${show.image.medium}" alt="episode">
const popup = async (id) => {
  const show = await getShows(id);

  const popCont = document.querySelector('#popCont');
  if (popCont) { pops().removeChild(popCont); }

  const node = `<div id="popCont" data-id="${show.id}">
    <div class="head" style="background-image: url('${show.image.original}');">
      <i class="close-icon material-symbols-outlined">close</i>
    </div>
    <div class="container">
      <h2>${show.name}</h2>
       <ul>
         <li><b>Avarege Runtime</b>: ${show.averageRuntime}min</li>
         <li><b>Genres</b> : ${show.genres}</li>
         <li><b>Language</b>: ${show.language}</li>
         <li><b>Premiered</b>: ${show.premiered}</li>
       </ul>
       <p class="film-description">${show.summary}</p>
    </div>
    <h3 class="comments-title"></h3>
    <ul class="film-comments"></ul>
    <h3>Add a comment</h3>
    <form class="film-form">
      <input class="user-name font" type="text" placeholder="Your name" maxlength="20" required>
      <textarea class="user-comment font" name="ta-comment" id="ta-comment" placeholder="Your insights" maxlength="150" required></textarea>
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

  await uiLoadComments();
};

export default popup;
