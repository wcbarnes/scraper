const CreateInformationAggregator = () => {
  return {
    getText: (nodeList) => {
      const nodeText = [];
      nodeList.forEach(function (node, index) {
        if (nodeList[index].children[0]) nodeText.push(nodeList[index].children[0].data)
      });
      return nodeText;
    },
    getHref: (nodeList) => {
      const hrefs = [];
      nodeList.forEach(function (node, index) {
        if (nodeList[index].attribs) hrefs.push(nodeList[index].attribs.src);
      });
      return hrefs;
    }
  }
}

module.exports = CreateInformationAggregator;
