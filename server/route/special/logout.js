const router = require('express').Router();
const logout = require('../../controller/special/logout');

router.route('/logout')
      .post(logout);

module.exports = router;
