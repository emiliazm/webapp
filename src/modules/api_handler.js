export const getShows = async (id) => {
  const item = fetch(`https://api.tvmaze.com/shows/${id}`);
  return (await item).json();
};

// ZM5SRiezCaF5it5BhnA3
// '2lNkwmsdhFTsRqAGHt5J'
const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
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
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OMQRn6dO0Lpv7mbZqxZI/likes/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getLikes = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OMQRn6dO0Lpv7mbZqxZI/likes');
  return response.json().then((data) => data);
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
