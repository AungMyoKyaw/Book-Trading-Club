const router = require('express').Router();
const test = require('../controller/test');

router.route('/test')
      .get(test);

module.exports = router;
