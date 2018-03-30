const CreateNodeFinder = (cheerio) => {
  return {
    findAllByClass: (DOMTree, className) => {
      const $ = cheerio.load(DOMTree);

      // Converting the cheerio serially keyed object into an actual array
      // Neccesary to keep the correct order when iterating
      const length = $(className).length;
      const array = Array.from({ length });
      $(className).each((index, node) => {
        array[index] = node;
      });

      return array;
    }
  }
}

module.exports = CreateNodeFinder;
