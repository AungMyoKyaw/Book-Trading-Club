const router = require('express').Router();
const request = require('../controller/requestController');

router.route('/request/:bookID')
      .post(request.requestBook);

router.route('/requested/book')//owner
      .get(request.getRequestedBookList);

router.route('/offered/book')//requester
      .get(request.offeredBookList);

router.route('/approve/book/:requestID')
      .put(request.approveTrade)
      .delete(request.rejectTrade);

module.exports = router;
