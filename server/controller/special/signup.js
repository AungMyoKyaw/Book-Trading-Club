function signup(req,res){
  console.log(req.user);
  res.sendStatus(200);
}

module.exports = signup;
