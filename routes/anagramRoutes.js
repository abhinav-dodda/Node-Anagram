require('dotenv').config();
const { Router } = require('express');
const { isAnagram, cleanString } = require('../utils');
const router = Router();
/**
 * @api {get} /find Find Anagrams
 * @apiName FindAnagrams
 * @apiDescription This endpoint will find all anagrams in the english dictionary based on the string sent
 * @apiGroup Anagram
 *
 * @apiParam (query) {String} word
 *
 * @apiExample {curl} Example usage:
 *   curl -X GET -H "Content-Type: application/json" http://localhost:3001/find?word=test
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *      "word1",
 *      "word2",
 *      "word3"
 *   ]
 */
router.get('/find', (req, res) => {
    const { word } = req.query;
    if(!word) throw new Error('Please provide a valid word');
    res.status(200).send(wordList.filter(wordInList => isAnagram(word, wordInList) && wordInList !== word));
  });
  
  /**
   * @api {get} /compare Compare Anagrams
   * @apiName CompareAnagrams
   * @apiDescription This endpoint will receive two words, and compare them to see if they are anagrams
   * @apiGroup Anagram
   *
   * @apiParam (query) {String} word1
   * @apiParam (query) {String} word2
   *
   * @apiExample {curl} Example usage:
   *   curl -X GET -H "Content-Type: application/json" http://localhost:3001/compare?word1=test&word2=tset
   *http://localhost:3001/compare?word1=test
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 200 OK
   *   false
   */
router.get('/compare', (req, res) => {
    const { word1, word2 } = req.query;
    if(!word1) throw new Error('Please provide a valid first word');
    if(!word2) throw new Error('Please provide a valid second word');
    res.status(200).send(isAnagram(word1, word2));
});

  
  /**
   * @api {get} /find-longest Find the longest anagram in the dictionary
   * @apiName FindLongestAnagrams
   * @apiDescription This endpoint will find the longest anagrams in the dictionary
   * @apiGroup Anagram
   *
   *
   * @apiExample {curl} Example usage:
   *   curl -X GET -H "Content-Type:application/json" http://localhost:3001/find-longest
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 200 OK
   *   [
   *     [longest-anagram-word-1, longest-anagram-word-2]
   *   ]
   */

router.get('/find-longest', (req, res) => {
    // const length = wordList.length
    let maxLength = 0;
    for (let i=0; i < wordList.length; i++){
        const currentWordlength = wordList[i].length;
        if(currentWordlength > maxLength){
            maxLength = currentWordlength;
        }
    }
    
    let currentLengthChecker = maxLength;
    let anagramsMap = {};
    while(currentLengthChecker > 0){
        let currentWordList = wordList.filter(word => word.length === currentLengthChecker);
        for(let word of currentWordList){
            const cleanWord = cleanString(word);
            if(!anagramsMap[cleanWord]){
                anagramsMap[cleanWord] = [];
            }
            anagramsMap[cleanWord].push(word);
        }
            if(Object.entries(anagramsMap).length !== 0 && anagramsMap.constructor === Object){
                const anagrams = Object.values(anagramsMap).filter(anagram => anagram.length > 1);
                if(anagrams.length > 0){
                return res.status(200).send(Object.values(anagrams));
                }
            }
            currentLengthChecker--;   
    }

    if(currentLengthChecker === 0 && (Object.entries(anagramsMap).length === 0 && anagramsMap.constructor === Object)){
        throw new Error('No anagrams found');
    }
});

module.exports = router;