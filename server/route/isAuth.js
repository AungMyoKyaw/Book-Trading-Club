const router = require('express').Router();
const isAuth = require('../controller/isAuthController');

router.route('/auth')
      .get(isAuth)

module.exports = router;
