export const counter = (int) => {
  document.querySelector('.films-title').innerHTML = `Shows/Films (${int})`;
};

export const counterComm = (int) => {
  document.querySelector('.comments-title').innerHTML = `Comments (${int})`;
};