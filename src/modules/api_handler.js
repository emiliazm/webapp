const getShows = async (id) => {
  const item = fetch(`https://api.tvmaze.com/shows/${id}`);
  return (await item).json();
};

// OMQRn6dO0Lpv7mbZqxZI

const createID = async () => {
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((response) => response.text())
    .then((data) => console.log(data));
};

const like = async (data) => {
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OMQRn6dO0Lpv7mbZqxZI/likes/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => console.log(response));
};

const data = {
  item_id: 1,
};

// like(data);

const getLikes = async () => {
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OMQRn6dO0Lpv7mbZqxZI/likes')
    .then((response) => response.text())
    .then((data) => console.log(data));
};
// getLikes();
export { getShows, like };

// comments
const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
// const appId = '2lNkwmsdhFTsRqAGHt5J';
export const newId = async (body) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => json.result)
  .catch((error) => { throw error; });

export const sendCommentApi = async (appId, body) => fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/2lNkwmsdhFTsRqAGHt5J/comments', {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.text())
  .then((response) => console.log('hola', response));

export const getCommentsApi = async (appId, itemId) => fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/2lNkwmsdhFTsRqAGHt5J/comments?item_id=${itemId}`)
  .then((response) => response.json());
