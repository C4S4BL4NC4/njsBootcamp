const server = require('http');
const fs = require('fs');
const superagent = require('superagent');

function readFileProm(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('File Not Found!');
      resolve(data);
    });
  });
}

function writeFileProm(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Can't Write File!");
      resolve('Success');
    });
  });
}

const getDogPic = async () => {
  try {
    const dogBreed = await readFileProm(`${__dirname}/dog.txt`);
    console.log(`Breed: ${dogBreed}`);

    const dogResponse = await superagent.get(
      `https://dog.ceo/api/breed/${dogBreed}/images/random`
    );

    await writeFileProm('dog-img.txt', '' + dogResponse.body.message);
  } catch (err) {
    console.log(`💥 ${err} 💥`);
    throw err;
  }
  return 'DOGGO'; // To get this string you need to make an iife
};

(async () => {
  try {
    console.log(`1: Will get Dog Pics`);
    const x = await getDogPic();
    console.log(`2: Done getting pics`);
    console.log(x);
  } catch (err) {
    console.log(err, '💥');
  }
})();

/*
readFileProm(`${__dirname}/dog.txt`)
  .then((data) => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((data) => {
    return writeFileProm('dog-img.txt', '' + data.body.message);
    // fs.writeFile('dog-img.txt', res.body.message, (err) => {
    //   if (err) return console.log('Random Dog Image Saved to File!');
    // });
  })
  .then(() => console.log('Dog Image Saved!'))
  .catch((err) => console.log(err));
*/
