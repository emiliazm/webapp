import './styles.css';
import './modules/canvas_animation.js';
import { getShows, getLikes } from './modules/api_handler.js';
import drawFilm from './modules/likes.js';
import { counter } from './modules/tools.js';

const render = async () => {
  const testt = await getShows(7);
  const likes = await getLikes() || [];
  for (let i = 1; i < 15; i += 1) {
    likes.forEach((item) => {
      if (i === item.item_id) {
        drawFilm(i, item.likes || 0);
        counter(i);
      }
    });
  }
  document.querySelector('.Headline').style.backgroundImage = `url('${testt.image.original}')`;
};
render();