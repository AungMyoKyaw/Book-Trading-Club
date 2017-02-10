const router = require('express').Router();
const request = require('../controller/requestController');

router.route('/request/:bookID')
      .post(request.requestBook);

module.exports = router;
