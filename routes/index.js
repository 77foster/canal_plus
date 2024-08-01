var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/float', function(req, res, next) {
  res.render('float');
});

router.get('/rapports', function(req, res, next) {
  res.render('rapports');
});


module.exports = router;