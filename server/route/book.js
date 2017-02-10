const router = require('express').Router();
const book = require('../controller/bookController');

router.route('/book/search')
      .get(book.search);

router.route('/book')
      .get(book.getAllBook);

router.route('/book/user')
      .get(book.getUserBook)
      .post(book.addUserBook);

router.route('/book/user/:userBookId')
      .put(book.increaseUserBookCount)
      .delete(book.removeUserBook);

module.exports = router;
