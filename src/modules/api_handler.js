export const getShows = async (id) => {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`)
    .then((response) => response.json())
    .then((data) => data);
  return response;
};

// '2lNkwmsdhFTsRqAGHt5J'
const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const likesURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/2lNkwmsdhFTsRqAGHt5J/likes/';

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

export const like = async (data) => {
  await fetch(likesURL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getLikes = async () => {
  const call = await fetch(likesURL);
  let response;
  try {
    response = await call.json().then((data) => data);
  } catch (e) {
    response = [];
  }
  return response;
};

// comments

export const sendCommentApi = async (appId, body) => fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/2lNkwmsdhFTsRqAGHt5J/comments', {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.text());

export const getCommentsApi = async (appId, itemId) => fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/2lNkwmsdhFTsRqAGHt5J/comments?item_id=${itemId}`)
  .then((response) => response.json());
