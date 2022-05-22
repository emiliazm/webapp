import './styles.css';
import './modules/canvas_animation.js';
import { getShows, getLikes } from './modules/api_handler.js';
import drawFilm from './modules/likes.js';
import './modules/filter.js';
import { counter } from './modules/tools.js';
import './assets/background.gif';
import './assets/github.png';
import './assets/twitter.png';
import './assets/linkedin.png';
import './assets/portfolio.png';
import './assets/logo-white.png';

const genresWrapper = document.body.querySelector('.genreWrapper');
const genres = JSON.parse(localStorage.getItem('Filter')) || ['Drama', 'Comedy', 'Action', 'Crime'];

const render = async () => {
  const shows = await getShows();
  const likes = await getLikes();

  for (let i = 0; i < genres.length; i += 1) {
    let count = 0;
    const node = `
      <h2 class="${genres[i]}">${genres[i]}</h2>
      <div class="genre">
        <ul class="film-list" id="${genres[i]}"></ul>
      </div>`;
    const child = document.createRange().createContextualFragment(node);
    genresWrapper.appendChild(child);

    const genresContainer = document.getElementById(`${genres[i]}`);
    console.log(genresContainer);
    shows.forEach((show) => {
      if (show.genres.includes(`${genres[i]}`)) {
        likes.forEach((like) => {
          if (like.item_id === show.id) {
            drawFilm(show, like.likes, genresContainer);
            count += 1;
            counter(count, genres[i]);
          }
        });
      }
    });
    document.querySelector('.headline-wrapper').style.backgroundImage = `url('${shows[0].image.original}')`;
  }
};
render();

document.querySelector('.headline').style.backgroundImage = 'url("./background.gif")';
