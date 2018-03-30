const cheerio = require('cheerio');
const NodeFinder = require('../NodeFinder')(cheerio);

const fakeDom = `
<body>
  <div>
    <h1>Example Domain</h1>
    <p class=hello>0</p>
    <p class=hello>1</p>
    <p class=hello>2</p>
    <p class=goodbye>3</p>
  </div>
</body>
`;

const className = '.hello';

test('NodeFinder can be imported properly', () => {
  expect(typeof NodeFinder).toBe('object');
  expect(typeof NodeFinder.findAllByClass).toBe('function');
});

test('NodeFinder.findAllByClass can find all instances of a class', () => {
  const helloNodes = NodeFinder.findAllByClass(fakeDom, className);

  expect(helloNodes.length).toBe(3);
});

test('NodeFinder.findAllByClass keeps the correct information about each node', () => {
  const helloNodes = NodeFinder.findAllByClass(fakeDom, className);

  for (let i = 0; i < helloNodes.length; ++i) {
    expect(helloNodes[i].children[0].data).toBe(String(i));
  }
});
