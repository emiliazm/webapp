export const counter = (int, node) => {
  document.querySelector(`.${node}`).innerHTML = `${node}(${int})`;
};

export const counterComm = (int) => {
  document.querySelector('.comments-title').innerHTML = `Comments (${int})`;
};