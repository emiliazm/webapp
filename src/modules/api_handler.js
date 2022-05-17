const getShows = async (id) => {
  const item = fetch(`https://api.tvmaze.com/shows/${id}`);
  return (await item).json();
};

// ZM5SRiezCaF5it5BhnA3

// const createID = async () => {
//   await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//   }).then((response) => response.text())
//     .then((data) => console.log(data));
// };

const like = async (data) => {
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OMQRn6dO0Lpv7mbZqxZI/likes/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const getLikes = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OMQRn6dO0Lpv7mbZqxZI/likes');
  return response.json().then((data) => data);
};

export { getShows, like, getLikes };
