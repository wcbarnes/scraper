/*

  ********** FUNCTIONAL CORE **********

  1. Load Html from a webpage
    A. HTMLLoader.js
      a. Given a url load HTML for that page and return a DOM tree
  2. Find all instances of a class
    A. NodeFinder.js
      a. given a DOM tree and a classname return a list of all occurences of that class
  3. Find information wanted from an array of Nodes
    A. InformationAggregator.js
      a. Given a list of Nodes and what information is wanted return an array of that information from the nodes
  3. Save images
    A. FileSaver.js
      a. a uri get the image and  save that image to disk
        i. Will take in href, a folder path, and a filename and will save the file and return a promise that will download and save the image

  Can easily add new functions to any file to expand functionality then add them to the shell

  **************************************

  ********** IMPERATIVE SHELL **********

  Use imported functional core components to create the desired interaction

  **************************************
*/

const axios = require('axios');
const cheerio = require('cheerio');
const promisify = require('util').promisify;
const fs = require('fs');
const path = require('path');

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

const HTMLLoader = require('./HTMLLoader')(axios);
const NodeFinder = require('./NodeFinder')(cheerio);
const InformationAggregator = require('./InformationAggregator')();
const FileSaver = require('./FileSaver')(axios, writeFile);

const URI = 'https://coinmarketcap.com';
const CLASS_NAME_FOR_COIN_NAMES = 'a.currency-name-container';
const CLASS_NAME_FOR_IMAGES = 'img.sparkline';
const FOLDER_NAME = 'coins';
const NUMBER_OF_PAGES = 2;

function getMultiplePages(numberOfPages) {
  for (let i = 1; i <= numberOfPages; ++i) {
    const htmlPromise = HTMLLoader.loadDomTree(`${URI}/${i}`);

    let textNodes,
      imageNodes,
      textInformation,
      imageInformation;

    htmlPromise
      .then((response) => {
        textNodes = NodeFinder.findAllByClass(response.data, CLASS_NAME_FOR_COIN_NAMES);
        imageNodes = NodeFinder.findAllByClass(response.data, CLASS_NAME_FOR_IMAGES);

        textInformation = InformationAggregator.getText(textNodes);
        imageInformation = InformationAggregator.getHref(imageNodes);

        return createFolder(FOLDER_NAME).catch((err) => {
          if (err.code === 'EEXIST') return;
          throw err;
        });
      })
      .then(() => {
        const promises = textInformation.map((e, i) => {
          return FileSaver.saveImage(imageInformation[i], FOLDER_NAME, e, 'png')
            .then(() => console.log(`${e}.png has been saved`))
        });

        return Promise.all(promises);
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

getMultiplePages(NUMBER_OF_PAGES);

function createFolder(folderName) {
  return mkdir(path.join(`${__dirname}/${folderName}`));
}
