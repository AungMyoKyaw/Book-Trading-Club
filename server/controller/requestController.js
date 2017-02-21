const Request = require('../model/request');
const UserBook = require('../model/userBook');

function requestBook(req,res){
  let requesterID = req.user._id;
  let ownerID = req.headers.ownerid;
  let bookID = req.params.bookID;

  let newRequest = new Request({
    requesterID : requesterID,
    ownerID : ownerID,
    bookID : bookID
  });

  Request.findOne({
    requesterID : requesterID,
    ownerID : ownerID,
    bookID : bookID,
    approved : false
  })
  .then(request=>{
    if(request){
      res.status(202).json({message:'acccepted'});
    } else {
      if(requesterID==ownerID){
        res.status(202).json({message:'acccepted'});
      } else {
        return newRequest.save();
      }
    }
  })
  .then(newrequest=>{
    res.status(200).json(newrequest);
  })
  .catch(err=>{
    res.status(500).json({err:err.message});
  })
}

function getRequestedBookList(req,res){
  let userID = req.user._id;
  let offset = req.query.offset || 0;
  let limit = req.query.limit || 10;

  let numberOfBook,pageCount,currentPage;

  Request.find({
    ownerID : userID,
    approved : false
  })
  .count()
  .then(count=>{
    numberOfBook = count;
    pageCount = Math.ceil(numberOfBook/limit);
    currentPage = (offset/limit)+1;
    return Request.find({
              ownerID : userID,
              approved : false
            })
            .populate('bookID')
            .skip(Number(offset))
            .limit(Number(limit))
            .lean()
  })
  .then(requestedBooks=>{
    res.status(200).json({
      numberOfBook :numberOfBook,
      pageCount :pageCount,
      currentPage :currentPage,
      books: requestedBooks
    });
  })
  .catch(err=>{
    res.status(500).json({err:err.message});
  })
}

function offeredBookList(req,res){
  let userID = req.user._id;
  let offset = req.query.offset || 0;
  let limit = req.query.limit || 10;

  let numberOfBook,pageCount,currentPage;

  Request.count({
    requesterID : userID,
    approved : false
  })
  .then(count=>{
    numberOfBook = count;
    pageCount = Math.ceil(numberOfBook/limit);
    currentPage = (offset/limit)+1;
    return Request.find({
              requesterID : userID,
              approved : false
            })
            .populate('bookID')
            .skip(Number(offset))
            .limit(Number(limit))
            .lean()
  })
  .then(offeredBooks=>{
    res.status(200).json({
      numberOfBook :numberOfBook,
      pageCount :pageCount,
      currentPage :currentPage,
      books: offeredBooks
    });
  })
  .catch(err=>{
    res.status(500).json({err:err.message});
  });
}

function approveTrade(req,res){
  let requestId = req.params.requestID;
  let newUserBook;

  Request.findOneAndUpdate({_id:requestId},{approved:true},{new:true})
    .then(request=>{
      newUserBook = new UserBook({
        userId : request.requesterID,
        bookId : request.bookID,
        isOwner : false
      });
      return UserBook.find({
        userId : request.requesterID,
        bookId : request.bookID,
        isOwner : false
      })
      .count()
    })
    .then(count=>{
      if(!count){
        return newUserBook.save();
      } else {
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

function rejectTrade(req,res){
  let requestId = req.params.requestID;
  Request.findByIdAndRemove(requestId,(err,data)=>{
    if(!err){
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
}

module.exports = {
  requestBook,
  getRequestedBookList,
  offeredBookList,
  approveTrade,
  rejectTrade
}
