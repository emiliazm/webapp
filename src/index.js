import './styles.css';
import './modules/canvas_animation.js';
import { getShows, getLikes } from './modules/api_handler.js';
import drawFilm from './modules/likes.js';
import { counter } from './modules/tools.js';
import './assets/background.gif';
import './assets/github.png';
import './assets/twitter.png';
import './assets/linkedin.png';
import './assets/portfolio.png';
import './assets/logo-white.png';

document.querySelector('.Headline').style.backgroundImage = 'url("./background.gif")';
const render = async () => {
  const headline = await getShows(1);
  const likes = await getLikes();

  const likeContainer = [];
  likes.forEach((item) => {
    likeContainer[item.item_id] = item.likes;
  });

  for (let i = 1; i < 15; i += 1) {
    drawFilm(i, likeContainer[i] || 0);
    counter(i);
  }
  document.querySelector('.Headline-wrapper').style.backgroundImage = `url('${headline.image.original}')`;
  document.querySelector('.Headline-title h2').innerHTML = headline.name;
};
render();