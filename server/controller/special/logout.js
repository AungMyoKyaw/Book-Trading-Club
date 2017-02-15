function logOut(req,res){
  req.logout();
  res.sendStatus(200);
};

module.exports = logOut;
