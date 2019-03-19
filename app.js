require('dotenv').config();
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const dictionaryRoutes = require('./routes/dictionaryRoutes');
const anagramRoutes = require('./routes/anagramRoutes');

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

app.listen(3001, () => console.log('App listening on port 3001'));