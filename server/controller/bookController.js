const books = require('google-books-search');

const Book = require('../model/book');
const UserBook = require('../model/userBook');

function search(req,res){
  let searchKeyWord = req.query.keyword;
  let field = req.query.field || 'title';
  let offset = req.query.offset || 0;
  let limit = req.query.limit || 24;

  let options = {
    key: process.env.API_KEY,
    field: field,
    offset: offset,
    limit: limit,
    type:'books',
    order:'relevance',
    lang:'en'
  }

  books.search(searchKeyWord,options,(err,result)=>{
    if(!err){
      res.json(result);
    } else {
      res.status(500).json({err:err.message});
    }
  });
}

function addUserBook(req,res){
  let userID = req.user._id;
  let newBook = new Book(req.body);
  let newBookId;
  Book.findOne({id:req.body.id})
      .then(book=>{
        if(book){//if the book is alerady in database
          return book;
        } else {//create new book
          return newBook.save();
        }
      })
    .then(newbook=>{
      newBookId = newbook._id;
      return UserBook.findOne({bookId:newBookId,userId:userID});
    })
    .then(userbook=>{
      if(!userbook){
        let newUserBook = new UserBook({
          userId:userID,
          bookId:newBookId
        });
        return newUserBook.save();
      } else {
        // req.body.count ? userbook.count+=req.body.count : userbook.count++;
        // return userbook.save();
        res.sendStatus(202);
      }
    })
    .then(newUserBook=>{
      res.status(200).json(newUserBook);
    })
    .catch(err=>{
      res.status(500).json({err:err.message});
    });
}

function removeUserBook(req,res){
  let userBookId = req.params.userBookId;
  let bookId;
  UserBook.findById(userBookId)
    .then(userbook=>{
      bookId = userbook.bookId;
      return UserBook.count({bookId:userbook.bookId});
    })
    .then(count=>{
      if(count>=1){
        return Book.remove({_id:bookId});
      } else {
        return true;
      }
    })
    .then((data)=>{
      return UserBook.remove({_id:userBookId});
    })
    .then(success=>{
      res.status(200).json({message:'success'});
    })
    .catch(err=>{
      res.json({err:err.message});
    })
}

function increaseUserBookCount(req,res){
  let count = req.body.count;
  let userBookId = req.params.userBookId;
  UserBook.findById(userBookId)
    .then(userbook=>{
      if(userbook){
        count ? userbook.count+=count : userbook.count++;
        return userbook.save();
      } else {
        res.sendStatus(204);
      }
    })
    .then(userbook=>{
      res.json(userbook);
    })
    .catch(err=>{
      res.status(500).json({err:err.message});
    })
}

function getUserBook(req,res){
  let userID = req.user._id;
  let offset = req.query.offset || 0;
  let limit = req.query.limit || 10;

  let searchQuery = {'userId':userID};

  req.query.owner ? searchQuery.isOwner = false : searchQuery.isOwner=true;

  let count = 0;
  let pageCount = 0;

  UserBook.find(searchQuery)
    .count()
    .exec()
    .then(userBookCount=>{
      count = userBookCount;
      pageCount = Math.ceil(count/limit);
      return UserBook.find(searchQuery)
      .populate('bookId')
      .sort({_id:-1})
      .skip(Number(offset))
      .limit(Number(limit))
      .lean()
    })
    .then(userbook=>{
      res.status(200).json({
        numberOfBook:count,
        pageCount:pageCount,
        currentPage : offset/limit+1,
        userbooks:userbook
      })
    })
    .catch(err=>{
      res.json({err:err.message});
    });
}

function getAllBook(req,res){
  let limit = req.query.limit || 10;
  let offset = req.query.offset || 0;

  let count = 0;
  let pageCount = 0;

  Book.find()
      .count()
      .then(bookCount=>{
        numberOfBook = bookCount;
        pageCount = Math.ceil(bookCount/limit);
        return Book.find()
          .skip(Number(offset))
          .limit(Number(limit))
          .sort({'_id':-1})
          .lean();
      })
      .then(bookList=>{
        res.json({
          numberOfBook : numberOfBook,
          pageCount : pageCount,
          currentPage : offset/limit+1,
          books:bookList
        })
      });
}

function getBookOwner(req,res){
  let bookId = req.params.bookId;
  UserBook.find({bookId:bookId})
    .populate('userId','username')
    .select('userId _id')
    .lean()
    .then(owners=>{
      res.json(owners);
    })
    .catch(err=>{
      res.json({err:err.message});
    });
}

module.exports = {
  search,
  getAllBook,
  getUserBook,
  addUserBook,
  increaseUserBookCount,
  removeUserBook,
  getBookOwner
}

//field List
// - title
// - author
// - publisher
// - subject
// - isbn
