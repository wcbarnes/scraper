const CreateHTMLLoader = (axios) => {
  return {
    loadDomTree: (URI) => axios.get(URI)
  }
}

module.exports = CreateHTMLLoader;
