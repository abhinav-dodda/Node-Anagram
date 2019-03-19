const { Router } = require('express');
const router = Router();

router.get('/list', (req, res) => {
    if(!wordList) return res.status(400).send('Dictionary is not defined!');
    return res.status(200).send(wordList);
});

router.post('/add', (req, res) => {
    if (!req.body) return res.status(400).send('Please add new words to be added');

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
        return res.status(200)
        .send(`The word(s) already exist in the dictionary`
             );
    }
  
});

router.post('/remove', (req, res) => {
    if (!req.body) return res.status(400).send('Please add new words to be deleted');
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
        return res.status(200)
        .send(`The word(s) do(es) not exist in the dictionary.`
             );
    }
});

module.exports = router;