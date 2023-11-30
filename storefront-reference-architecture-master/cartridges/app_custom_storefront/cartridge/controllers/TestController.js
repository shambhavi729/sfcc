'use strict';

var server = require('server');

server.get('Showplace', function (req, res, next) {
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var SystemObjectMgr = require('dw/object/SystemObjectMgr');
    var Transaction = require('dw/system/Transaction');
    
   var CustomerMgr = require('dw/customer/CustomerMgr');

    Transaction.wrap(function () {
        

        var profile = CustomerMgr.getProfile();

        var place = profile.custom.place;
        profile.custom.place = 'New York';
        profile.custom.save();

        res.print(place);
    });

    next();
});

module.exports = server.exports();
