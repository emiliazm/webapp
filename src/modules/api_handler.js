const shows = document.querySelector('.shows');

const getShows = async (id) => {
  const item = fetch(`https://api.tvmaze.com/shows/${id}`);
  return (await item).json();
};

const test = async (id) => {
  const testt = await getShows(id);
  // console.log(testt.image);
  const node = `
      <li class="show">
        <img src="${testt.image.medium}" alt="#">
      </li>`;
  const child = document.createRange().createContextualFragment(node);
  shows.appendChild(child);
};

for (let i = 1; i < 15; i += 1) {
  test(i);
}
