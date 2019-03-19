require('dotenv').config();
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const winston = require('winston');

const error = require('./middlewares/error');
const dictionaryRoutes = require('./routes/dictionaryRoutes');
const anagramRoutes = require('./routes/anagramRoutes');


winston.add(new winston.transports.File({ filename: 'error.log' }));

process.on('uncaughtException', (err) => {
  winston.error(err.stack, err);
});

process.on('unhandledRejection', (err) => {
  throw err;
});

let wordListPath, wordList;

  /** 
   * set environment variable in .env file.
   * You can choose French (fr)
   * Default is English
   * Set the symbols only in the .env file
   * If you add any other file, please check the npm registry to see if the appropriate dictionary package exists
   * If so, install the package and add it
   * */ 
switch(process.env.DICT){
  case 'fr':
    wordListPath = require('french-wordlist');
    break;
  default:
    wordListPath = require('word-list');
}

wordList = fs.readFileSync(wordListPath, 'utf8').split('\n');

if (wordList){
  global.wordList = wordList;
} else {
  console.log('Please set the dictionary environment')
}


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/dict', dictionaryRoutes);
app.use('/', anagramRoutes);

// error handling
app.use(error);
if(process.env.NODE_ENV !== 'test'){
  app.listen(3001, () => console.log('App listening on port 3001'));
}

module.exports = app;