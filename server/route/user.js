const router = require('express').Router();
const user = require('../controller/userController');

router.route('/user')
      .get(user.userInfo)
      .put(user.updateInfo);

module.exports  = router;
