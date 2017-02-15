function isAuth(req,res){
  if(req.isAuthenticated()){
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
}

module.exports = isAuth
