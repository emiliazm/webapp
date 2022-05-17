const shows = document.querySelector('.shows');
const pops = document.querySelector('.popups');

const getShows = async (id) => {
  const item = fetch(`https://api.tvmaze.com/shows/${id}`);
  return (await item).json();
};

const popup = async (id) => {
  const testt = await getShows(id);

  const popCont = document.querySelector('#popCont');
  if (popCont) { pops.removeChild(popCont); }

  const node = `<div id="popCont">
    <i class="close-icon material-symbols-outlined">close</i>
    <img class="film-img" src="${testt.image.medium}" alt="episode">
    <h2>"${testt.name}"</h2>
    <ul>
      <li>"${testt.averageRuntime}"</li>
      <li>"${testt.genres}"</li>
      <li>"${testt.language}"</li>
      <li>"${testt.premiered}"</li>
    </ul>
    <p class="film-description">"${testt.summary}"</p>
    <h3>Comments</h3>
    <ul class="film-comments"></ul>
    <h3>Add a comment</h3>
    <form class="film-form">
      <input type="text" placeholder="Your name" required>
      <textarea name="ta-comment" id="ta-comment" placeholder="Your insights" required></textarea>
      <button type="submit">Comment</button>
    </form>
  </div>`;
  const child = document.createRange().createContextualFragment(node);
  pops.appendChild(child);

  const closePopup = () => {
    if (pops.classList.contains('display')) {
      pops.classList.remove('display');
    }
  };
  document.querySelector('.close-icon').addEventListener('click', closePopup);
};

const test = async (id) => {
  const testt = await getShows(id);
  // console.log(testt);
  const node = `<li class="show" id="li-${testt.id}">
    <img src="${testt.image.medium}" alt="#">
    <h2>"${testt.name}"</h2>
    <i class="material-symbols-outlined">favorite</i>
    <button class="comment-btn" type="button">Comments</button>
    <button class="reserv-btn" type="button">Reservations</button>
  </li>`;
  const child = document.createRange().createContextualFragment(node);
  shows.appendChild(child);

  const commentBtn = (e) => {
    popup(id);
    pops.classList.toggle('display', (e !== 'popups'));
  };

  const commBtn = shows.querySelector(`#li-${testt.id} .comment-btn`);
  commBtn.addEventListener('click', commentBtn);
};

for (let i = 1; i < 15; i += 1) {
  test(i);
}
