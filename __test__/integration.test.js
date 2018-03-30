const sinon = require('sinon');
const cheerio = require('cheerio');
const CreateHTMLLoader = require('../HTMLLoader');
const CreateInformationAggregator = require('../InformationAggregator');
const CreateNodeFinder = require('../NodeFinder');

const html = {
  body: `
  <body>
    <div>
      <h1>Example Domain</h1>
      <p class=hello>0</p>
      <p class=hello>1</p>
      <p class=hello>2</p>
      <p class=goodbye>3</p>
    </div>
  </body>
  `
};

const className = '.hello';

const axios = {
  get: sinon.stub().returns(Promise.resolve(html))
}

test('can scrape information from a given URI', () => {
  const HTMLLoader = CreateHTMLLoader(axios);
  const InformationAggregator = CreateInformationAggregator();
  const NodeFinder = CreateNodeFinder(cheerio);

  return HTMLLoader.loadDomTree('example.com').then(data => {
    const nodes = NodeFinder.findAllByClass(data.body, className);
    const textInformation = InformationAggregator.getText(nodes);
    expect(textInformation.length).toBe(3);
    for (let i = 0; i < textInformation.length; ++i) {
      expect(textInformation[i]).toBe(String(i));
    }
  });
});
