"use strict";

var express = require('express');
var router = express.Router();

router.use('/', require('./home.js'));
router.use('/api', require('./api.js'));

module.exports = router;