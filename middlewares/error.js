const winston = require('winston');

module.exports = function(err, req, res, next){
    console.log(err) 
    winston.log({
        level: 'error',
        message: err.message,
        stack: err.stack
        });
    res.status(400).send({error: err.message, success: false});
}