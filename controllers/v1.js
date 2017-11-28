/*jslint node: true */
"use strict";

var express = require('express'),
    router = express.Router({ mergeParams: true }),
    messages = require('../configs/messages'),
    APIHelper = require('../helpers/api.js'),
    apiHelper = new APIHelper();

/**
 * Test API KEY
 */
router.route('/auth/test')
    .get(function (req, res) {
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        var message = "Hello organization " + res.locals.companyId + " hitting DemoApp from " + ip;
        apiHelper.returnData(res, message, "message");
    });

module.exports = router;