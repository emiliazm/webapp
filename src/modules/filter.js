const filter = document.body.querySelector('.genreFilter');
const buttonFilter = document.body.querySelector('.genreSearch');
const genres = JSON.parse(localStorage.getItem('Filter')) || ['Drama', 'Comedy', 'Action'];
const form = document.forms.filter;
const length = 12;

const filter1 = () => {
  for (let i = 0; i < length; i += 1) {
    if (genres.includes(`${form.children[i].children[0].innerHTML}`)) {
      form.children[i].children[1].checked = true;
    }
  }
};
filter1();

buttonFilter.onclick = () => {
  if (filter.style.display === 'block') {
    filter.style.display = 'none';
  } else {
    filter.style.display = 'block';
  }
};

form.onsubmit = () => {
  const data = [];
  let index = 0;
  for (let i = 0; i < length; i += 1) {
    if (form.children[i].children[1].checked) {
      data[index] = `${form.children[i].children[0].innerHTML}`;
      index += 1;
    }
  }
  localStorage.setItem('Filter', JSON.stringify(data));
};
