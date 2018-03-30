const CreateFileSaver = (axios, writeFile) => {
  return {
    saveImage: (imageUri, folder, filename, extention) => {
      return axios.request({
        responseType: 'arraybuffer',
        url: imageUri,
        method: 'get',
        headers: {
          'Content-Type': 'image/png',
        },
      })
        .then(function (response) {
          return writeFile(`./${folder}/${filename}.${extention}`, response.data);
        });
    }
  };
}

module.exports = CreateFileSaver;
