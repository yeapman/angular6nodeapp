var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
   secret: 'MY_SECRET',
   userProperty: 'payload'
});
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.send('are you kidding me?')
});
router.get('/profile', auth, ctrlProfile.profileRead);

app.use(function(err, req, res, next) {
   if (err.name === 'UnauthorizedError') {
       res.status(401);
       res.json({"message": err.name + ": " + err.message});
   }
});
module.exports = router;
