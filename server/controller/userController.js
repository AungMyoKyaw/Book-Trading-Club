const User = require('../model/user');

function userInfo(req,res){
  let userId = req.user._id;
  User.findById(userId)
      .select('username city state')
      .then(user=>{
        if(user){
          res.status(200).json(user);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(err=>{
        res.status(500).json({"err":err.message});
      })
}

function updateInfo(req,res){
  let userId = req.user._id;
  let update = {}
  Object.keys(req.body).forEach(key=>{
    req.body[key]!=='' ? update[key]=req.body[key] : '';
  })
  User.findOneAndUpdate({_id:userId},update,{new:true})
      .then(user=>{
        res.json(user);
      })
      .catch(err=>{
        res.status(500).json({"err":err.message});
      });
}

function changePassword(req,res){
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;
  let userId = req.user._id;

  User.findById(userId)
    .then(user=>{
      if(user.validPassword(oldPassword)){
        return user;
      } else {
        throw {status:401,message:'Wrong Password'}
      }
    })
    .then(userValid=>{
      userValid.password = userValid.generateHash(newPassword);
      return userValid.save();
    })
    .then(userNew=>{
      res.json(userNew);
    })
    .catch(err=>{
      if(err.status){
        res.status(err.status).json({err:err.message});
      } else {
        res.status(500).json({err:err.message});
      }
    });
}

module.exports = {
  userInfo,
  updateInfo,
  changePassword
}
