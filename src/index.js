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

let count = 0;
const render = async () => {
  const shows = await getShows();
  const likes = await getLikes();
  document.querySelector('.Headline-wrapper').style.backgroundImage = `url('${shows[0].image.original}')`;
  document.querySelector('.Headline-title h2').innerHTML = shows[0].name;
  const likeContainer = [];
  likes.forEach((item) => {
    likeContainer[item.item_id] = item.likes;
  });

  shows.forEach((element) => {
    count += 1;
    drawFilm(element, likeContainer[element.id] || 0);
    counter(count);
  });
};
render();