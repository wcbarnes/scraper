const cheerio = require('cheerio');

const InformationAggregator = require('../InformationAggregator')();

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

const cheerioDom = cheerio.load(fakeDom);

const helloNodes = cheerioDom('.hello');

const length = helloNodes.length;
const arrayOfHelloNodes = Array.from({ length });
helloNodes.each((index, node) => {
  arrayOfHelloNodes[index] = node;
});

test('InformationAggregator can be imported properly', () => {
  expect(typeof InformationAggregator).toBe('object');
  expect(typeof InformationAggregator.getText).toBe('function');
});

test('getText will extract the correct amount of information', () => {
  const information = InformationAggregator.getText(arrayOfHelloNodes);
  expect(information.length).toBe(3);
});

test('getInformation will extract the correct information', () => {
  const information = InformationAggregator.getText(arrayOfHelloNodes);

  information.forEach((value, i) => {
    expect(value).toBe(String(i));
  });
});
