const { Router } = require('express');
const router = Router();

  /**
   * @api {get} /list
   * @apiName ListWords
   * @apiDescription This endpoint will list all the words in the dictionary
   * @apiGroup Dictionary
   *
   * @apiExample {curl} Example usage:
   *   curl -X GET -H "Content-Type: application/json" http://localhost:3001/dict/list
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 200 OK
   *   Array of all words in the dictionary
   */
router.get('/list', (req, res) => {
    if(!wordList) throw new Error('Dictionary is not defined!');
    return res.status(200).send(wordList);
});


 /**
   * @api {post} /dict/add
   * @apiName AddWords
   * @apiDescription This endpoint add words to the dictionary and store in memory (without affecting the actual npm package)
   * @apiGroup Dictionary
   *
   * @apiExample {curl} Example usage:
   *   curl -X GET -H "Content-Type: application/json" http://localhost:3001/dict/add
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 200 OK
   *   Proper Message about word addition
   */
router.post('/add', (req, res) => {
    if (!req.body) throw new Error('Please add new words to be added');

   // check if words already exist in the dictionary
    const addWords = req.body.filter(word => !wordList.includes(word));
    const alreadyExist = req.body.filter(word => !addWords.includes(word)); 

    // add words 
    wordList.push(...addWords);
    wordList = wordList.sort();

    if (addWords.length > 0 && alreadyExist.length > 0){
        return res.status(200)
                    .send(`The word(s) ${alreadyExist.join(', ')} already exist in the dictionary. 
                           Thus, only the word(s) ${addWords.join(', ')} have been added`
                         );
    } else if (addWords.length > 0 && alreadyExist.length === 0){
        return res.status(200)
                    .send(`The word(s) ${addWords.join(', ')} have been added`
                         );
    } else {
        throw new Error(`The word(s) already exist in the dictionary`);
    }
  
});


 /**
   * @api {post} /dict/remove
   * @apiName RemoveWords
   * @apiDescription This endpoint will remove words from the dictionary
   * @apiGroup Dictionary
   *
   * @apiExample {curl} Example usage:
   *   curl -X GET -H "Content-Type: application/json" http://localhost:3001/dict/remove
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 200 OK
   *   Proper message about removal
   */
router.post('/remove', (req, res) => {
    if (!req.body) throw new Error('Please add new words to be deleted');
    // check if words already exist in the dictionary
    const removeWords = req.body.filter(word => wordList.includes(word));
    const doesNotExist = req.body.filter(word => !removeWords.includes(word)); 

    // add words 
    wordList = wordList.filter(word => !removeWords.includes(word));

    if (removeWords.length > 0 && doesNotExist.length > 0){
        return res.status(200)
                    .send(`The word(s) ${doesNotExist.join(', ')} do(es) not exist in the dictionary. 
                           Thus, only the word(s) ${addWords.join(', ')} have been removed.`
                         );
    } else if (removeWords.length > 0 && doesNotExist.length === 0){
        return res.status(200)
                    .send(`The word(s) ${removeWords.join(', ')} have been removed.`
                         );
    } else {
        throw new Error(`The word(s) do(es) not exist in the dictionary.`);
    }
});

module.exports = router;