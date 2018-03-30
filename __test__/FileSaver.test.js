const FileSaver = require('../FileSaver')();

test('FileSaver can be imported properly', () => {
  expect(typeof FileSaver).toBe('object');
  expect(typeof FileSaver.saveImage).toBe('function');
});
