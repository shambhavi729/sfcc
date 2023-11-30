'use strict';

var server = require('server');

server.get('Testshow', function (req, res, next) {
    res.print('hello world');
    // res.json({
    //     a:111
    // })
    
    res.render('error/notFound');
    next();
});


module.exports = server.exports();
