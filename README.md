### Node-Anagram Assignment

Estimated effort: 3 to 6 hours

#### Description

The node-anagram API provides endpoints to work with Anagrams.

> An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

For example, the word 'mary' is an anagram of 'army'.

#### Folder Structure

The folder structure has been created to make the code as modular as possible.
Here is a brief description of how the folder has been organised:
middlewares - meant for all the middlewares. In this case, just contains the error middleware
routes - contains the routes
tests - all the test specs
.env - environment vars
.gitignore - standard gitignore file
app.js - all middleware configuration + server
error.log - logs the errors
utils.js - contains the anagram function


#### Time/Space Complexity of Anagram Algorithm
The run time complexity of the algorithm is O(nlogn) and space complexity is O(1). Alternative was to use a character map,
which would have reduced the run time complexity to n, but would have increased the space complexity to n as well. Thus,
I went with the first solution.

#### Bonus points have been tackled

* Created a new endpoint called find-longest. 
* Added support for multiple dictionaries (english remains default if not specified, and have added support for French).
* Added support to list, add and remove words from the supported dictionaries. (Dictionary Routes)
* Add support for phrases, not just single words. Ie: 'rail safety' -> ['fairy tales'].

#### How to run

`cd node-anagram`

`nvm use`

`npm install`

`npm start`

#### How to test
`npm run test`
