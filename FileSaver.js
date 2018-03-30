const CreateFileSaver = (axios, writeFile) => {
  return {
    saveImage: (imageUri, folder, filename, extention) => {
      return axios.get(imageUri)
        .then(function (response) {
          return writeFile(`./${folder}/${filename}.${extention}`, response.data, 'base64');
        });
    }
  };
}

module.exports = CreateFileSaver;
