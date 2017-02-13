const Request = require('../model/request');

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
    approved : false
  })
  .then(request=>{
    if(request){
      res.sendStatus(202);
    } else {
      if(requesterID==ownerID){
        res.sendStatus(202);
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

module.exports = {
  requestBook
}
