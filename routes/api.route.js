var express = require('express')
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');

var UserController = require('../controllers/user.controller');

var router = express.Router()
var users = require('./api/user.route')
var User = require('../models/user.model')
var appos = require('./api/appointment.route')

router.post('/signin', function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), config.secret, {expiresIn: 604800});
            var decoded = jwtDecode(token);
            console.log('Decoded:');
            console.log(decoded);

            // return the information including token as JSON
            res.json({success: true, role: user.toJSON().role, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });

router.use('/users', users);
router.use('/appo', appos);


module.exports = router;