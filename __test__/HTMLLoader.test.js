const CreateHTMLLoader = require('../HTMLLoader');
const sinon = require('sinon');

const html = {
  body: `
  <body>
    <div>
      <p>hello</p>
    </div>
  </body>
  `
};

const axios = {
  get: sinon.stub().returns(Promise.resolve(html))
}

test('CreateHTMLLoader can be imported properly', () => {
  expect(typeof CreateHTMLLoader).toBe('function');
  expect(typeof CreateHTMLLoader().loadDomTree).toBe('function');
});

test('CreateHTMLLoader returns a promise', () => {
  const HTMLLoader = CreateHTMLLoader(axios);
  expect(typeof HTMLLoader.loadDomTree('example.com').then).toBe('function')
});

test('CreateHTMLLoader returns a promise that resolves to be a dom tree', () => {
  const HTMLLoader = CreateHTMLLoader(axios);
  return HTMLLoader.loadDomTree('example.com').then(data => expect(data).toBe(html));
});
