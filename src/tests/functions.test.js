import { counter, counterComm } from '../modules/tools.js';

const node = `<h2 class="films-title">Shows/Films (${0})</h2>
<h3 class="comments-title">Comments (${0})</h3>`;
document.body.innerHTML = node;

test('uses jest-dom', () => {
  const counter1 = (int) => {
    counter(int);
    const a = document.querySelector('.films-title').innerHTML;
    return a;
  };

  expect(counter1(1)).toBe('Shows/Films (1)');
});

test('Test comment counter', () => {
  const counter2 = (int) => {
    counterComm(int);
    const b = document.querySelector('.comments-title').innerHTML;
    return b;
  };

  expect(counter2(1)).toBe('Comments (1)');
});