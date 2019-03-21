var express = require('express');
var router = express.Router();
var debug = require('debug')('debug-log-demo:route-index');

/* GET home page. */
router.get('/', function(req, res, next) {
  debug("In index.js")
  res.render('index', { title: 'Express' });
});

module.exports = router;
