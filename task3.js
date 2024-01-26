const fs = require('fs');
const csvtojson = require('csvtojson');
const { pipeline } = require('stream');

const csvFilePath = `./csvdirectory/task2-data.csv`;

pipeline(
  fs.createReadStream(csvFilePath),
  csvtojson(),
  fs.createWriteStream('./output.txt'),
  error => {
    if (error) {
      console.log(error);
    }
  }
);
