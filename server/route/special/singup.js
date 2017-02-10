const router = require('express').Router();
const passport = require('passport');
const signup = require('../../controller/special/signup');

router.route('/signup')
      .post(passport.authenticate('signup'),signup);

module.exports = router;
