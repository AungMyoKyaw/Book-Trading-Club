const router = require('express').Router();
const passport = require('passport');
const login = require('../../controller/special/login');

router.route('/login')
  .post(passport.authenticate('login'),login);

module.exports = router;
