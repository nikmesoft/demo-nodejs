"use strict";

var express = require('express'),
    router = express.Router();

router.use('/v1', require('./v1.js'));

module.exports = router;