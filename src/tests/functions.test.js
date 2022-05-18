import counter from '../modules/tools.js';

const node = `<h2 class="films-title">Shows/Films (${0})</h2>`;
document.body.innerHTML = node;

test('uses jest-dom', () => {
  const counter1 = (int) => {
    counter(int);
    const a = document.querySelector('.films-title').innerHTML;
    return a;
  };

  expect(counter1(1)).toBe('Shows/Films (1)');
});